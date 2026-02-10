"use client";

import { Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface FooterData { email: string; whatsapp: string; }

export function FooterSection({ data }: { data: FooterData }) {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");

  const footerLinks = [
    { label: navT("home"), href: "#hero" },
    { label: navT("about"), href: "#about" },
    { label: navT("experience"), href: "#experience" },
    { label: navT("contact"), href: "#contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-navy dark:bg-[#060e1a] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-mono text-xs text-white/50">
            &copy; {new Date().getFullYear()} Lea Maliar. {t("rights")}
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="font-mono text-xs text-white/50 transition-colors hover:text-sky">{link.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href={`mailto:${data.email}`} className="text-white/50 transition-colors hover:text-sky" aria-label="Email"><Mail className="h-4 w-4" /></a>
            <a href={`https://wa.me/${data.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-white/50 transition-colors hover:text-sky" aria-label="WhatsApp"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
