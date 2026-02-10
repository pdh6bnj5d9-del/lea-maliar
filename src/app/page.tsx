import { getLocale } from "next-intl/server";
import { getContent, parseListItems, parseSkillSections } from "@/lib/content";
import { ClientPage } from "./client-page";

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

export const dynamic = "force-dynamic";

export default async function Home() {
  const locale = await getLocale();

  const hero = getContent("hero.md");
  const about = getContent("about.md", locale);
  const softSkills = getContent("soft-skills.md", locale);
  const experience = getContent("experience.md", locale);
  const education = getContent("education.md", locale);
  const skills = getContent("skills.md");
  const interests = getContent("interests.md", locale);
  const engagement = getContent("engagement.md", locale);
  const contact = getContent("contact.md");

  return (
    <ClientPage
      heroData={{
        name: hero.frontmatter.name,
        subtitle: hero.frontmatter.subtitle,
        tagline: hero.frontmatter.tagline,
        email: hero.frontmatter.email,
        whatsapp: hero.frontmatter.whatsapp,
        cvFile: hero.frontmatter.cvFile,
      }}
      aboutData={{
        bio: about.content.trim(),
        softSkills: parseListItems<SoftSkill>(softSkills.content),
      }}
      experienceData={{
        experiences: parseListItems<Experience>(experience.content),
      }}
      educationData={{
        education: parseListItems<Education>(education.content),
      }}
      skillsData={{
        sections: parseSkillSections(skills.content),
      }}
      interestsData={{
        interests: parseListItems<Interest>(interests.content),
      }}
      engagementData={{
        engagements: parseListItems<Engagement>(engagement.content),
      }}
      contactData={{
        email: contact.frontmatter.email,
        whatsapp: contact.frontmatter.whatsapp,
        whatsappDisplay: contact.frontmatter.whatsappDisplay,
        cvFile: contact.frontmatter.cvFile,
      }}
      footerData={{
        email: contact.frontmatter.email,
        whatsapp: contact.frontmatter.whatsapp,
      }}
    />
  );
}
