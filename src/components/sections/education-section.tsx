"use client";

import { GraduationCap, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useTranslations } from "next-intl";

interface Education { degree: string; school: string; year: string; specialization: string; highlight: boolean; }

export function EducationSection({ education }: { education: Education[] }) {
  const t = useTranslations("education");

  return (
    <section id="education" className="bg-white dark:bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <p className="mb-2 font-mono text-sm tracking-widest text-sky uppercase">{t("label")}</p>
          <h2 className="mb-16 font-serif text-4xl font-bold text-navy dark:text-foreground md:text-5xl">{t("title")}</h2>
        </MotionWrapper>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, i) => (
            <MotionWrapper key={edu.degree} delay={i * 0.1}>
              <Card className={`group relative overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${edu.highlight ? "border-sky/40 hover:shadow-sky/15" : "border-border/50 hover:shadow-sky/10"}`}>
                {edu.highlight && <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-sky to-gold" />}
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky/10 text-sky"><GraduationCap className="h-6 w-6" /></div>
                    <span className="font-mono text-sm text-navy/50 dark:text-muted-foreground">{edu.year}</span>
                  </div>
                  <h3 className="mb-1 font-serif text-lg font-bold text-navy dark:text-foreground">{edu.degree}</h3>
                  <p className="mb-3 font-sans text-sm font-medium text-sky">{edu.school}</p>
                  {edu.specialization && (
                    <Badge variant="secondary" className="bg-gold/10 text-gold font-mono text-xs border-gold/20">
                      <Award className="mr-1 h-3 w-3" />{edu.specialization}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
