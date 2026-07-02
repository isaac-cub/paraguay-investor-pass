// Tina-backed loaders for the editable page body. These wrap the generated
// GraphQL client in `requestWithMetadata()` so `tinaField()` has the metadata
// it needs for click-to-edit + live preview. Falls back to the plain-JSON
// reader (src/lib/content.ts) when the Tina client is unreachable OR returns
// empty data (e.g. the Cloud schema hasn't been re-indexed yet), so the site
// always renders — just without click-to-edit metadata until Cloud is fresh.
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';
import { getPage as fsGetPage, getSettings as fsGetSettings } from './content';

export async function getPageData(slug: string) {
  const relativePath = `${slug}.json`;
  // Local preview: force the repo JSON (bypass stale Tina Cloud). Production
  // deploys reindex Cloud from the repo, so this equals the post-deploy render.
  if (process.env.TINA_LOCAL_FS === '1') {
    const json = await fsGetPage(slug);
    return { data: { pages: json }, query: '', variables: { relativePath }, id: '' };
  }
  try {
    const res = await requestWithMetadata(
      client.queries.pages({ relativePath }),
      { priority: 'primary' },
    );
    if (res?.data?.pages) return res;
  } catch {
    // fall through to filesystem
  }
  const json = await fsGetPage(slug);
  return { data: { pages: json }, query: '', variables: { relativePath }, id: '' };
}

export async function getSettingsData() {
  const relativePath = 'index.json';
  try {
    const res = await requestWithMetadata(client.queries.settings({ relativePath }));
    if (res?.data?.settings) return res;
  } catch {
    // fall through to filesystem
  }
  const json = await fsGetSettings();
  return { data: { settings: json }, query: '', variables: { relativePath }, id: '' };
}
