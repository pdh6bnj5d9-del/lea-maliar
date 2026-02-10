"use client";

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { InterestsSection } from "@/components/sections/interests-section";
import { EngagementSection } from "@/components/sections/engagement-section";
import { SpaceInvaders } from "@/components/game/space-invaders";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";

interface SoftSkill {
  name: string;
  icon: string;
  description: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  accomplishments: string[];
  tags: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
  specialization: string;
  highlight: boolean;
}

interface Interest {
  category: string;
  icon: string;
  items: string[];
  description: string;
}

interface Engagement {
  title: string;
  icon: string;
  subtitle: string;
  description: string;
}

interface SkillSection {
  title: string;
  skills: string[];
}

interface ClientPageProps {
  heroData: {
    name: string;
    subtitle: string;
    tagline: string;
    email: string;
    whatsapp: string;
    cvFile: string;
  };
  aboutData: {
    bio: string;
    softSkills: SoftSkill[];
  };
  experienceData: {
    experiences: Experience[];
  };
  educationData: {
    education: Education[];
  };
  skillsData: {
    sections: SkillSection[];
  };
  interestsData: {
    interests: Interest[];
  };
  engagementData: {
    engagements: Engagement[];
  };
  contactData: {
    email: string;
    whatsapp: string;
    whatsappDisplay: string;
    cvFile: string;
  };
  footerData: {
    email: string;
    whatsapp: string;
  };
}

export function ClientPage({
  heroData,
  aboutData,
  experienceData,
  educationData,
  skillsData,
  interestsData,
  engagementData,
  contactData,
  footerData,
}: ClientPageProps) {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection data={heroData} />
        <AboutSection data={aboutData} />
        <ExperienceSection experiences={experienceData.experiences} />
        <EducationSection education={educationData.education} />
        <SkillsSection sections={skillsData.sections} />
        <InterestsSection interests={interestsData.interests} />
        <EngagementSection engagements={engagementData.engagements} />
        <SpaceInvaders />
        <ContactSection data={contactData} />
      </main>
      <FooterSection data={footerData} />
    </>
  );
}
