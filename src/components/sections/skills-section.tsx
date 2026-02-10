"use client";

import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useTranslations } from "next-intl";

interface SkillSection { title: string; skills: string[]; }

export function SkillsSection({ sections }: { sections: SkillSection[] }) {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="bg-secondary/30 dark:bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <p className="mb-2 font-mono text-sm tracking-widest text-sky uppercase">{t("label")}</p>
          <h2 className="mb-16 font-serif text-4xl font-bold text-navy dark:text-foreground md:text-5xl">{t("title")}</h2>
        </MotionWrapper>

        <div className="grid gap-12 md:grid-cols-2">
          {sections.map((section, i) => (
            <MotionWrapper key={section.title} delay={i * 0.15} direction={i === 0 ? "left" : "right"}>
              <div>
                <h3 className="mb-6 font-serif text-xl font-bold text-navy dark:text-foreground">{section.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {section.skills.map((skill, j) => (
                    <Badge key={skill} variant="secondary" className="cursor-default bg-white dark:bg-card px-4 py-2 font-sans text-sm text-navy/80 dark:text-foreground/80 shadow-sm border border-sky/20 transition-all duration-200 hover:scale-105 hover:bg-sky/10 hover:text-navy dark:hover:text-foreground hover:border-sky/40 hover:shadow-md" style={{ transitionDelay: `${j * 30}ms` }}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
