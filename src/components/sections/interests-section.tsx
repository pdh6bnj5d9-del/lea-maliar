"use client";

import { Palette, Mountain, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useTranslations } from "next-intl";

interface Interest { category: string; icon: string; items: string[]; description: string; }
const iconMap: Record<string, React.ElementType> = { Palette, Mountain, Sparkles };

export function InterestsSection({ interests }: { interests: Interest[] }) {
  const t = useTranslations("interests");

  return (
    <section className="bg-white dark:bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <p className="mb-2 font-mono text-sm tracking-widest text-sky uppercase">{t("label")}</p>
          <h2 className="mb-16 font-serif text-4xl font-bold text-navy dark:text-foreground md:text-5xl">{t("title")}</h2>
        </MotionWrapper>

        <div className="grid gap-6 md:grid-cols-3">
          {interests.map((interest, i) => {
            const Icon = iconMap[interest.icon] || Sparkles;
            return (
              <MotionWrapper key={interest.category} delay={i * 0.12}>
                <Card className="group h-full border-border/50 bg-gradient-to-br from-white to-secondary/30 dark:from-card dark:to-muted/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky/10">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky/10 text-sky transition-colors group-hover:bg-sky/20"><Icon className="h-6 w-6" /></div>
                    <h3 className="mb-3 font-serif text-lg font-bold text-navy dark:text-foreground">{interest.category}</h3>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {interest.items.map((item) => (<Badge key={item} variant="secondary" className="bg-sky/10 text-navy/70 dark:text-foreground/70 font-mono text-xs">{item}</Badge>))}
                    </div>
                    <p className="font-sans text-sm text-navy/60 dark:text-muted-foreground">{interest.description}</p>
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
