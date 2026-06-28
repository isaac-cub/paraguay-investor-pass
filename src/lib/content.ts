import fs from 'node:fs';
import path from 'node:path';

// Content is plain JSON in src/content (edited by the CMS, committed to Git).
// Reading is decoupled from any CMS runtime so the site always builds.
const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, 'src/content/pages');
const SETTINGS_FILE = path.join(ROOT, 'src/content/settings/index.json');

export type Faq = { question: string; answer: string };

function readJson<T>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return null;
  }
}

export async function getSettings() {
  return readJson<Record<string, any>>(SETTINGS_FILE);
}

export async function getPage(slug: string) {
  return readJson<Record<string, any>>(path.join(PAGES_DIR, `${slug}.json`));
}

// Pick a CMS value if present and non-empty, else the in-code fallback.
export function pick<T>(cmsValue: T | null | undefined, fallback: T): T {
  if (cmsValue === null || cmsValue === undefined) return fallback;
  if (typeof cmsValue === 'string' && cmsValue.trim() === '') return fallback;
  if (Array.isArray(cmsValue) && cmsValue.length === 0) return fallback;
  return cmsValue;
}
