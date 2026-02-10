"use client";

import { Mail, MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useTranslations } from "next-intl";

interface ContactData { email: string; whatsapp: string; whatsappDisplay: string; cvFile: string; }

export function ContactSection({ data }: { data: ContactData }) {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="bg-navy dark:bg-[#060e1a] py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <MotionWrapper>
          <p className="mb-2 font-mono text-sm tracking-widest text-sky uppercase">{t("label")}</p>
          <h2 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">{t("title")}</h2>
          <p className="mx-auto mb-12 max-w-md font-sans text-lg text-sky-light/80">{t("description")}</p>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group min-w-[200px] bg-gold text-navy font-semibold hover:bg-gold/90 transition-all hover:scale-105">
              <a href={`mailto:${data.email}`}>
                <Mail className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                {data.email}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="group min-w-[200px] border-sky text-sky bg-transparent hover:bg-sky/10 transition-all hover:scale-105">
              <a href={`https://wa.me/${data.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                {data.whatsappDisplay}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="group min-w-[200px] border-white/30 text-white bg-transparent hover:bg-white/10 transition-all hover:scale-105">
              <a href={data.cvFile} download="CV-Lea-Maliar.pdf">
                <FileText className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                {t("downloadCv")}
              </a>
            </Button>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
