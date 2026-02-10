"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useTranslations } from "next-intl";

interface Entity { x: number; y: number; w: number; h: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; }

const PLAYER_W = 30, PLAYER_H = 24, BULLET_W = 4, BULLET_H = 12;
const ENEMY_W = 24, ENEMY_H = 24, ENEMY_SPEED = 1.2, BULLET_SPEED = 7, SPAWN_INTERVAL = 1200;
const SKY = "#8ecae6", GOLD = "#FFB703";

export function SpaceInvaders() {
  const t = useTranslations("game");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [showEmail, setShowEmail] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const stateRef = useRef({
    player: { x: 0, y: 0, w: PLAYER_W, h: PLAYER_H },
    bullets: [] as Entity[], enemies: [] as Entity[], particles: [] as Particle[],
    score: 0, mouseX: 0, lastSpawn: 0, animId: 0, emailShown: false,
  });

  const spawnParticles = useCallback((x: number, y: number, color: string) => {
    const s = stateRef.current;
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const speed = 1.5 + Math.random() * 2;
      s.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 30, maxLife: 30, color });
    }
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true); setScore(0); setShowEmail(false);
    const s = stateRef.current;
    s.score = 0; s.bullets = []; s.enemies = []; s.particles = []; s.emailShown = false;
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;

    const s = stateRef.current;
    s.player.x = canvas.width / 2 - PLAYER_W / 2;
    s.player.y = canvas.height - 50;

    const onMouseMove = (e: MouseEvent) => { s.mouseX = e.clientX - canvas.getBoundingClientRect().left; };
    const onTouchMove = (e: TouchEvent) => { s.mouseX = e.touches[0].clientX - canvas.getBoundingClientRect().left; };
    const onShoot = () => { s.bullets.push({ x: s.player.x + s.player.w / 2 - BULLET_W / 2, y: s.player.y - BULLET_H, w: BULLET_W, h: BULLET_H }); };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onShoot);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchstart", onShoot);

    const drawTriangle = (x: number, y: number, w: number, h: number) => {
      ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fill();
    };

    const loop = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(142, 202, 230, 0.15)";
      for (let i = 0; i < 50; i++) {
        ctx.fillRect((i * 137.5) % canvas.width, (i * 97.3 + time * 0.01) % canvas.height, 1.5, 1.5);
      }

      const targetX = s.mouseX - s.player.w / 2;
      s.player.x += (targetX - s.player.x) * 0.15;
      s.player.x = Math.max(0, Math.min(canvas.width - s.player.w, s.player.x));

      ctx.fillStyle = SKY; ctx.shadowColor = SKY; ctx.shadowBlur = 12;
      drawTriangle(s.player.x, s.player.y, s.player.w, s.player.h);
      ctx.shadowBlur = 0;

      if (time - s.lastSpawn > SPAWN_INTERVAL) {
        s.enemies.push({ x: Math.random() * (canvas.width - ENEMY_W), y: -ENEMY_H, w: ENEMY_W, h: ENEMY_H });
        s.lastSpawn = time;
      }

      s.bullets = s.bullets.filter((b) => b.y > -BULLET_H);
      for (const b of s.bullets) { b.y -= BULLET_SPEED; ctx.fillStyle = SKY; ctx.shadowColor = SKY; ctx.shadowBlur = 6; ctx.fillRect(b.x, b.y, b.w, b.h); ctx.shadowBlur = 0; }

      s.enemies = s.enemies.filter((e) => e.y < canvas.height + ENEMY_H);
      for (const e of s.enemies) { e.y += ENEMY_SPEED; ctx.fillStyle = "rgba(255, 255, 255, 0.85)"; ctx.fillRect(e.x, e.y, e.w, e.h); }

      for (let bi = s.bullets.length - 1; bi >= 0; bi--) {
        for (let ei = s.enemies.length - 1; ei >= 0; ei--) {
          const b = s.bullets[bi], e = s.enemies[ei];
          if (b && e && b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
            spawnParticles(e.x + e.w / 2, e.y + e.h / 2, GOLD);
            s.bullets.splice(bi, 1); s.enemies.splice(ei, 1); s.score++; setScore(s.score);
            if (s.score >= 2 && !s.emailShown) { s.emailShown = true; setShowEmail(true); }
            break;
          }
        }
      }

      s.particles = s.particles.filter((p) => p.life > 0);
      for (const p of s.particles) {
        p.x += p.vx; p.y += p.vy; p.life--;
        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color === GOLD ? `rgba(255, 183, 3, ${alpha})` : `rgba(142, 202, 230, ${alpha})`;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      }

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"; ctx.font = '14px "Inter", sans-serif';
      ctx.fillText(`${t("score")}: ${s.score}`, 16, 28);
      s.animId = requestAnimationFrame(loop);
    };

    s.animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(s.animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onShoot);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchstart", onShoot);
    };
  }, [gameStarted, spawnParticles, t]);

  return (
    <section className="bg-navy dark:bg-[#060e1a] py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <p className="mb-2 text-center font-mono text-sm tracking-widest text-sky uppercase">{t("label")}</p>
          <h2 className="mb-4 text-center font-serif text-4xl font-bold text-white md:text-5xl">{t("title")}</h2>
          <p className="mx-auto mb-8 max-w-lg text-center font-sans text-sm text-sky-light/70">{t("subtitle")}</p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-xl border border-sky/20">
            {!gameStarted && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                <p className="mb-6 text-center font-sans text-sm text-white/70">{t("instructions")}</p>
                <button onClick={startGame} className="rounded-lg bg-gold px-8 py-3 font-sans font-semibold text-navy transition-all hover:scale-105 hover:bg-gold/90">{t("play")}</button>
              </div>
            )}
            <canvas ref={canvasRef} className="h-[400px] w-full cursor-crosshair bg-black" />
            {gameStarted && (
              <div className="absolute top-4 right-4 rounded-md bg-black/50 px-3 py-1 font-mono text-sm text-white backdrop-blur-sm">{t("score")}: {score}</div>
            )}
            <AnimatePresence>
              {showEmail && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                  <motion.div animate={{ boxShadow: ["0 0 20px rgba(142, 202, 230, 0.3)", "0 0 40px rgba(142, 202, 230, 0.6)", "0 0 20px rgba(142, 202, 230, 0.3)"] }} transition={{ duration: 2, repeat: Infinity }} className="rounded-xl border border-sky/40 bg-navy/90 px-8 py-6 text-center backdrop-blur-md">
                    <p className="mb-2 font-mono text-xs text-sky uppercase tracking-widest">{t("bonusUnlocked")}</p>
                    <a href="mailto:lea.maliar.pro@gmail.com" className="font-sans text-lg font-semibold text-gold transition-colors hover:text-gold/80">lea.maliar.pro@gmail.com</a>
                    <p className="mt-3 font-sans text-xs text-white/50">{t("clickToEmail")}</p>
                    <button onClick={() => setShowEmail(false)} className="mt-4 font-mono text-xs text-sky/50 hover:text-sky transition-colors">{t("continuePlay")}</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
