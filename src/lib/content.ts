import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

const reader = createReader(process.cwd(), config);

export type Faq = { question: string; answer: string };

export async function getSettings() {
  try {
    return await reader.singletons.settings.read();
  } catch {
    return null;
  }
}

export async function getPage(slug: string) {
  try {
    return await reader.collections.pages.read(slug);
  } catch {
    return null;
  }
}

// Pick a CMS value if present and non-empty, else the in-code fallback.
export function pick<T>(cmsValue: T | null | undefined, fallback: T): T {
  if (cmsValue === null || cmsValue === undefined) return fallback;
  if (typeof cmsValue === 'string' && cmsValue.trim() === '') return fallback;
  if (Array.isArray(cmsValue) && cmsValue.length === 0) return fallback;
  return cmsValue;
}
