"use client";

import { Layers, Compass, Users, Sparkles, Search, Crown, Ear, Mountain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MotionWrapper } from "@/components/motion-wrapper";
import { useTranslations } from "next-intl";

interface SoftSkill { name: string; icon: string; description: string; }
interface AboutData { bio: string; softSkills: SoftSkill[]; }

const iconMap: Record<string, React.ElementType> = { Layers, Compass, Users, Sparkles, Search, Crown, Ear, Mountain };

export function AboutSection({ data }: { data: AboutData }) {
  const t = useTranslations("about");

  return (
    <section id="about" className="bg-white dark:bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionWrapper>
          <p className="mb-2 font-mono text-sm tracking-widest text-sky uppercase">{t("label")}</p>
          <h2 className="mb-12 font-serif text-4xl font-bold text-navy dark:text-foreground md:text-5xl">{t("title")}</h2>
        </MotionWrapper>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <MotionWrapper direction="left">
            <div className="space-y-4">
              {data.bio.split("\n\n").map((paragraph, i) => (
                <p key={i} className="font-sans text-base leading-relaxed text-navy/80 dark:text-foreground/80 md:text-lg">{paragraph}</p>
              ))}
            </div>
          </MotionWrapper>

          <div className="grid grid-cols-2 gap-4">
            {data.softSkills.map((skill, i) => {
              const Icon = iconMap[skill.icon] || Sparkles;
              return (
                <MotionWrapper key={skill.name} delay={i * 0.08} direction="right">
                  <Card className="group border-border/50 bg-secondary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky/10 hover:border-sky/30">
                    <CardContent className="p-4">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-sky/10 text-sky transition-colors group-hover:bg-sky/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-1 font-sans text-sm font-semibold text-navy dark:text-foreground">{skill.name}</h3>
                      <p className="font-mono text-xs text-navy/60 dark:text-muted-foreground">{skill.description}</p>
                    </CardContent>
                  </Card>
                </MotionWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
