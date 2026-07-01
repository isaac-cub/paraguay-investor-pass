import type { IslandRegistry } from '@tinacms/astro/experimental';
import PageBody from '../components/islands/PageBody.astro';
import { getPageData, getSettingsData } from './data';

// Single editable region: the page body. The bridge re-fetches this on each
// keystroke while editing, re-rendering PageBody with the draft content.
export const islands: IslandRegistry = {
  page: {
    fetch: async (_request, params) => {
      const slug = params.get('slug') ?? 'home';
      const [page, settings] = await Promise.all([getPageData(slug), getSettingsData()]);
      return { page, settings };
    },
    component: PageBody,
    wrapper: { tag: 'main' },
    propsFromData: (data) => {
      const { page, settings } = data as any;
      return {
        page: page.data.pages,
        formspreeId: settings.data.settings?.formspreeId ?? 'YOUR_FORM_ID',
      };
    },
  },
};
