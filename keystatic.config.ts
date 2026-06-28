import { config, fields, singleton, collection } from '@keystatic/core';

// Storage: local in dev (edits write to ./src/content on disk),
// GitHub mode in production (browser editing → commits to the repo).
// On first prod visit to /keystatic, Keystatic walks you through creating the
// GitHub App and gives you the env vars to add in Vercel.
const storage =
  process.env.NODE_ENV === 'production'
    ? ({ kind: 'github', repo: 'isaac-cub/paraguay-investor-pass' } as const)
    : ({ kind: 'local' } as const);

export default config({
  storage,
  ui: {
    brand: { name: 'Paraguay Investor Pass' },
  },
  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/content/settings/index',
      format: { data: 'json' },
      schema: {
        brandName: fields.text({ label: 'Brand name', defaultValue: 'Paraguay Investor Pass' }),
        brandSmall: fields.text({ label: 'Brand sub-label', defaultValue: 'Investor Pass' }),
        tagline: fields.text({ label: 'Tagline (footer)', multiline: true }),
        formspreeId: fields.text({ label: 'Formspree form ID', description: 'The id in https://formspree.io/f/<id>' }),
        footerDisclaimer: fields.text({ label: 'Footer disclaimer', multiline: true }),
        defaultOgImage: fields.image({
          label: 'Default social share image',
          directory: 'public/og',
          publicPath: '/og/',
        }),
      },
    }),
  },
  collections: {
    pages: collection({
      label: 'Pages',
      slugField: 'slug',
      path: 'src/content/pages/*',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug (page id)' } }),
        seoTitle: fields.text({ label: 'SEO <title>', validation: { length: { max: 70 } } }),
        seoDescription: fields.text({ label: 'Meta description', multiline: true, validation: { length: { max: 165 } } }),
        h1: fields.text({ label: 'H1 heading' }),
        heroEyebrow: fields.text({ label: 'Hero eyebrow' }),
        heroLead: fields.text({ label: 'Hero lead', multiline: true }),
        ogImage: fields.image({ label: 'Social share image', directory: 'public/og', publicPath: '/og/' }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'FAQs', itemLabel: (props) => props.fields.question.value || 'FAQ' }
        ),
      },
    }),
  },
});
