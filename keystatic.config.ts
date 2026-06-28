import { config, fields, singleton, collection } from '@keystatic/core';

// Storage: local now (edits write to ./src/content on disk).
// Switch to { kind: 'github', repo: 'isaac-cub/paraguay-investor-pass' } for browser editing.
export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Paraguay Investor Pass' },
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site settings',
      path: 'src/content/settings',
      format: { data: 'json' },
      schema: {
        brandName: fields.text({ label: 'Brand name', defaultValue: 'Paraguay Investor Pass' }),
        brandSmall: fields.text({ label: 'Brand sub-label', defaultValue: 'Investor Pass' }),
        tagline: fields.text({ label: 'Tagline', multiline: true }),
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
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Internal title' } }),
        route: fields.text({ label: 'URL path', description: 'e.g. /real-estate/' }),
        seoTitle: fields.text({ label: 'SEO <title>', validation: { length: { max: 70 } } }),
        seoDescription: fields.text({ label: 'Meta description', multiline: true, validation: { length: { max: 165 } } }),
        h1: fields.text({ label: 'H1 heading' }),
        heroEyebrow: fields.text({ label: 'Hero eyebrow' }),
        heroLead: fields.text({ label: 'Hero lead', multiline: true }),
        faqs: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          { label: 'FAQs', itemLabel: (props) => props.fields.question.value || 'FAQ' }
        ),
        body: fields.markdoc({ label: 'Body (optional rich content)' }),
      },
    }),
  },
});
