"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface HeroData {
  name: string;
  subtitle: string;
  tagline: string;
  email: string;
  whatsapp: string;
  cvFile: string;
}

export function HeroSection({ data }: { data: HeroData }) {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy dark:bg-[#060e1a]"
    >
      <div className="absolute inset-0">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 h-64 w-64 rounded-full bg-sky/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-10 bottom-20 h-80 w-80 rounded-full bg-gold/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-sky/3 blur-2xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 font-mono text-sm tracking-widest text-sky uppercase"
        >
          {t("label")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 font-serif text-5xl font-bold text-white md:text-7xl lg:text-8xl"
        >
          {data.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mb-4 max-w-2xl font-sans text-lg text-sky-light md:text-xl"
        >
          {data.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mb-10 max-w-xl font-mono text-sm text-white/60 italic"
        >
          {data.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="group bg-gold text-navy font-semibold hover:bg-gold/90 transition-all hover:scale-105">
            <a href={`mailto:${data.email}`}>
              <Mail className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              {t("email")}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="group border-sky text-sky bg-transparent hover:bg-sky/10 transition-all hover:scale-105">
            <a href={`https://wa.me/${data.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              {t("whatsapp")}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="group border-white/30 text-white bg-transparent hover:bg-white/10 transition-all hover:scale-105">
            <a href={data.cvFile} download="CV-Lea-Maliar.pdf">
              <FileText className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              {t("cv")}
            </a>
          </Button>
        </motion.div>
      </div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>
      </motion.a>
    </section>
  );
}
