"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useTranslations } from "next-intl";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  accomplishments: string[];
  tags: string[];
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="bg-secondary/30 dark:bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <p className="mb-2 font-mono text-sm tracking-widest text-sky uppercase">{t("label")}</p>
          <h2 className="mb-16 font-serif text-4xl font-bold text-navy dark:text-foreground md:text-5xl">{t("title")}</h2>
        </MotionWrapper>

        <div className="relative">
          <div className="absolute top-0 left-4 hidden h-full w-0.5 bg-sky/20 md:left-1/2 md:block md:-translate-x-0.5" />
          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <MotionWrapper key={exp.company} delay={i * 0.15} direction={isLeft ? "left" : "right"}>
                  <div className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} md:items-start`}>
                    <div className="absolute top-6 left-4 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-sky bg-white dark:bg-background md:left-1/2 md:block" />
                    <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-0" : "md:pl-0"}`}>
                      <Card className="group border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky/10 hover:border-sky/30">
                        <CardContent className="p-6">
                          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="font-serif text-xl font-bold text-navy dark:text-foreground">{exp.role}</h3>
                              <p className="font-sans text-base font-medium text-sky">{exp.company}</p>
                            </div>
                            <span className="font-mono text-xs text-navy/50 dark:text-muted-foreground">{exp.period}</span>
                          </div>
                          <p className="mb-4 font-sans text-sm leading-relaxed text-navy/70 dark:text-foreground/70">{exp.description}</p>
                          <ul className="mb-4 space-y-2">
                            {exp.accomplishments.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 font-sans text-sm text-navy/80 dark:text-foreground/80">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-2">
                            {exp.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-sky/10 text-navy/70 dark:text-foreground/70 font-mono text-xs hover:bg-sky/20">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
