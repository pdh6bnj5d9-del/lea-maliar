import fs from "fs";
import path from "path";
import matter from "gray-matter";
import yaml from "js-yaml";

const contentDirectory = path.join(process.cwd(), "content");

/**
 * Get content from a locale-specific markdown file.
 * Falls back to root content/ if locale file doesn't exist.
 */
export function getContent(filename: string, locale: string = "fr") {
  const localePath = path.join(contentDirectory, locale, filename);
  const fallbackPath = path.join(contentDirectory, filename);

  const filePath = fs.existsSync(localePath) ? localePath : fallbackPath;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return { frontmatter: data, content };
}

/** Parse YAML list items from markdown body */
export function parseListItems<T>(content: string): T[] {
  const trimmed = content.trim();
  if (!trimmed) return [];

  try {
    const parsed = yaml.load(trimmed);
    if (Array.isArray(parsed)) return parsed as T[];
    return [];
  } catch {
    return [];
  }
}

/** Parse skill sections from markdown with ## headers */
export function parseSkillSections(content: string) {
  const sections: { title: string; skills: string[] }[] = [];
  let currentSection: { title: string; skills: string[] } | null = null;

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: trimmed.slice(3), skills: [] };
    } else if (trimmed.startsWith("- ") && currentSection) {
      currentSection.skills.push(trimmed.slice(2));
    }
  }

  if (currentSection) sections.push(currentSection);
  return sections;
}
