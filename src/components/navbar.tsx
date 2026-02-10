"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { setLocale } from "@/app/actions";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const [, startTransition] = useTransition();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { label: t("home"), href: "#hero" },
    { label: t("about"), href: "#about" },
    { label: t("experience"), href: "#experience" },
    { label: t("education"), href: "#education" },
    { label: t("skills"), href: "#skills" },
    { label: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    setMounted(true);
    const sectionIds = ["hero", "about", "experience", "education", "skills", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    startTransition(() => {
      setLocale(next).then(() => window.location.reload());
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg dark:bg-[#0a1628]/95"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            className="font-serif text-xl font-bold text-white transition-opacity hover:opacity-80"
          >
            LM
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-mono text-sm transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-gold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}

            {mounted && (
              <button
                onClick={toggleTheme}
                className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            <button
              onClick={toggleLocale}
              className="flex items-center gap-1 rounded-md px-2 py-1 font-mono text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {locale === "fr" ? "EN" : "FR"}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="rounded-md p-1.5 text-white/70 hover:text-white"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              onClick={toggleLocale}
              className="rounded-md px-1.5 py-1 font-mono text-xs text-white/70 hover:text-white"
              aria-label="Toggle language"
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-navy/95 backdrop-blur-md dark:bg-[#0a1628]/95 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-mono text-sm transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-gold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
