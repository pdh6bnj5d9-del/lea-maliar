"use client";

import { GraduationCap, Heart, Sprout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useTranslations } from "next-intl";

interface Engagement { title: string; icon: string; subtitle: string; description: string; }
const iconMap: Record<string, React.ElementType> = { GraduationCap, Heart, Sprout };

export function EngagementSection({ engagements }: { engagements: Engagement[] }) {
  const t = useTranslations("engagement");

  return (
    <section className="bg-secondary/30 dark:bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <p className="mb-2 font-mono text-sm tracking-widest text-sky uppercase">{t("label")}</p>
          <h2 className="mb-16 font-serif text-4xl font-bold text-navy dark:text-foreground md:text-5xl">{t("title")}</h2>
        </MotionWrapper>

        <div className="grid gap-6 md:grid-cols-3">
          {engagements.map((eng, i) => {
            const Icon = iconMap[eng.icon] || Heart;
            return (
              <MotionWrapper key={eng.title} delay={i * 0.12}>
                <Card className="group h-full border-border/50 bg-gradient-to-br from-white to-secondary/30 dark:from-card dark:to-muted/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky/10">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky/10 text-sky transition-colors group-hover:bg-sky/20"><Icon className="h-6 w-6" /></div>
                    <h3 className="mb-1 font-serif text-lg font-bold text-navy dark:text-foreground">{eng.title}</h3>
                    <p className="mb-3 font-sans text-sm font-medium text-sky">{eng.subtitle}</p>
                    <p className="font-sans text-sm text-navy/60 dark:text-muted-foreground">{eng.description}</p>
                  </CardContent>
                </Card>
              </MotionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
