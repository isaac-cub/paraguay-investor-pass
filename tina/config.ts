import { defineConfig } from 'tinacms';

// Tina Cloud creds (set as env vars in Vercel for production browser editing).
// Local `tinacms dev` works WITHOUT these.
const branch = process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'master';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_PUBLIC_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'og',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'pages',
        label: 'Pages',
        path: 'src/content/pages',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'seoTitle', label: 'SEO title', isTitle: true, required: true },
          { type: 'string', name: 'slug', label: 'Slug (page id)' },
          { type: 'string', name: 'seoDescription', label: 'Meta description', ui: { component: 'textarea' } },
          { type: 'string', name: 'h1', label: 'H1 heading' },
          { type: 'string', name: 'heroEyebrow', label: 'Hero eyebrow' },
          { type: 'string', name: 'heroLead', label: 'Hero lead', ui: { component: 'textarea' } },
          { type: 'image', name: 'ogImage', label: 'Social share image' },
          {
            type: 'object',
            name: 'faqs',
            label: 'FAQs',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.question || 'FAQ' }) },
            fields: [
              { type: 'string', name: 'question', label: 'Question' },
              { type: 'string', name: 'answer', label: 'Answer', ui: { component: 'textarea' } },
            ],
          },
        ],
      },
      {
        name: 'settings',
        label: 'Site settings',
        path: 'src/content/settings',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'brandName', label: 'Brand name', isTitle: true, required: true },
          { type: 'string', name: 'brandSmall', label: 'Brand sub-label' },
          { type: 'string', name: 'tagline', label: 'Tagline (footer)', ui: { component: 'textarea' } },
          { type: 'string', name: 'formspreeId', label: 'Formspree form id' },
          { type: 'string', name: 'footerDisclaimer', label: 'Footer disclaimer', ui: { component: 'textarea' } },
          { type: 'image', name: 'defaultOgImage', label: 'Default social share image' },
        ],
      },
    ],
  },
});
