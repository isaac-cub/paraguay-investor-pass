import { defineConfig } from 'tinacms';

// Tina Cloud creds (set as env vars in Vercel for production browser editing).
// Local `tinacms dev` works WITHOUT these.
const branch = process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'master';

// ---- Reusable field fragments (factories → fresh objects per use) -------------
const ta = { component: 'textarea' } as const;
const bandField = () => ({ type: 'string', name: 'band', label: 'Background band', options: ['cream', 'paper', 'navy'] });

const ctaFields = () => [
  { type: 'string', name: 'label', label: 'Label' },
  { type: 'string', name: 'href', label: 'Link' },
  { type: 'string', name: 'variant', label: 'Style', options: ['gold', 'ghost'] },
];
const tableFields = () => [
  { type: 'string', name: 'label', label: 'Label' },
  { type: 'string', name: 'value', label: 'Value' },
];
const paragraphField = () => ({
  type: 'object', name: 'paragraphs', label: 'Paragraphs', list: true,
  ui: { itemProps: (i: any) => ({ label: (i?.text || 'Paragraph').slice(0, 60) }) },
  fields: [{ type: 'string', name: 'text', label: 'Text (basic HTML allowed)', ui: ta }],
});
const noticeField = (name: string, label: string) => ({
  type: 'object', name, label,
  fields: [
    { type: 'string', name: 'title', label: 'Title' },
    { type: 'string', name: 'body', label: 'Body', ui: ta },
  ],
});

// ---- Block templates ----------------------------------------------------------
const blockTemplates = [
  {
    name: 'hero', label: 'Hero',
    fields: [
      { type: 'string', name: 'crumb', label: 'Breadcrumb label (optional)' },
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'h1', label: 'H1 heading', required: true },
      { type: 'string', name: 'lead', label: 'Lead paragraph', ui: ta },
      { type: 'object', name: 'ctas', label: 'Buttons', list: true, ui: { itemProps: (i: any) => ({ label: i?.label }) }, fields: ctaFields() },
      { type: 'object', name: 'stats', label: 'Stat boxes', list: true, ui: { itemProps: (i: any) => ({ label: i?.value }) }, fields: [
        { type: 'string', name: 'value', label: 'Value' },
        { type: 'string', name: 'label', label: 'Label' },
      ] },
    ],
  },
  {
    name: 'split', label: 'Split (text + table/notice)',
    fields: [
      bandField(),
      { type: 'boolean', name: 'reverse', label: 'Reverse (aside on left)' },
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'heading', label: 'Heading' },
      { type: 'string', name: 'headingMax', label: 'Heading max-width (e.g. 18ch)' },
      paragraphField(),
      { type: 'object', name: 'lawcite', label: 'Law citation (optional)', fields: [
        { type: 'string', name: 'label', label: 'Label' },
        { type: 'string', name: 'body', label: 'Body', ui: ta },
      ] },
      noticeField('notice', 'Notice in text column (optional)'),
      { type: 'object', name: 'asideTable', label: 'Aside spec table', list: true, ui: { itemProps: (i: any) => ({ label: i?.label }) }, fields: tableFields() },
      noticeField('asideNotice', 'Aside notice (optional)'),
      { type: 'boolean', name: 'asideNoticeFirst', label: 'Aside notice before table' },
    ],
  },
  {
    name: 'cardGrid', label: 'Card grid',
    fields: [
      bandField(),
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'heading', label: 'Heading' },
      { type: 'string', name: 'headingMax', label: 'Heading max-width' },
      { type: 'string', name: 'lead', label: 'Lead (optional)', ui: ta },
      { type: 'string', name: 'leadMax', label: 'Lead max-width' },
      { type: 'boolean', name: 'center', label: 'Centered' },
      { type: 'object', name: 'cards', label: 'Cards', list: true, ui: { itemProps: (i: any) => ({ label: i?.title }) }, fields: [
        { type: 'string', name: 'num', label: 'Number (optional)' },
        { type: 'string', name: 'title', label: 'Title' },
        { type: 'string', name: 'text', label: 'Text', ui: ta },
      ] },
      { type: 'string', name: 'pull', label: 'Pull quote footer (optional, HTML)' },
    ],
  },
  {
    name: 'factRow', label: 'Fact row (navy band)',
    fields: [
      bandField(),
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'heading', label: 'Heading' },
      { type: 'string', name: 'headingMax', label: 'Heading max-width' },
      { type: 'string', name: 'lead', label: 'Lead', ui: ta },
      { type: 'string', name: 'leadMax', label: 'Lead max-width' },
      { type: 'object', name: 'facts', label: 'Facts', list: true, ui: { itemProps: (i: any) => ({ label: i?.value }) }, fields: [
        { type: 'string', name: 'value', label: 'Value' },
        { type: 'string', name: 'label', label: 'Label' },
      ] },
    ],
  },
  {
    name: 'ladder', label: 'Routes ladder',
    fields: [
      bandField(),
      { type: 'string', name: 'id', label: 'Anchor id (e.g. routes)' },
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'heading', label: 'Heading' },
      { type: 'string', name: 'headingMax', label: 'Heading max-width' },
      { type: 'string', name: 'lead', label: 'Lead', ui: ta },
      { type: 'string', name: 'leadMax', label: 'Lead max-width' },
      { type: 'object', name: 'rungs', label: 'Routes', list: true, ui: { itemProps: (i: any) => ({ label: i?.title }) }, fields: [
        { type: 'string', name: 'fig', label: 'Figure (e.g. $200K)' },
        { type: 'string', name: 'title', label: 'Title' },
        { type: 'string', name: 'text', label: 'Text' },
        { type: 'string', name: 'href', label: 'Link' },
      ] },
      { type: 'string', name: 'note', label: 'Footnote (optional)', ui: ta },
      { type: 'object', name: 'cta', label: 'Button (optional)', fields: [
        { type: 'string', name: 'label', label: 'Label' },
        { type: 'string', name: 'href', label: 'Link' },
      ] },
    ],
  },
  {
    name: 'projects', label: 'Project cards',
    fields: [
      bandField(),
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'heading', label: 'Heading' },
      { type: 'string', name: 'headingMax', label: 'Heading max-width' },
      { type: 'string', name: 'lead', label: 'Lead (optional)', ui: ta },
      { type: 'string', name: 'leadMax', label: 'Lead max-width' },
      { type: 'object', name: 'items', label: 'Cards', list: true, ui: { itemProps: (i: any) => ({ label: i?.name }) }, fields: [
        { type: 'string', name: 'developer', label: 'Developer / kicker' },
        { type: 'string', name: 'location', label: 'Location / tag' },
        { type: 'string', name: 'name', label: 'Name / title' },
        { type: 'string', name: 'description', label: 'Description', ui: ta },
        { type: 'image', name: 'image', label: 'Photo (optional)' },
        { type: 'string', name: 'footMain', label: 'Footer main (e.g. 172 m)' },
        { type: 'string', name: 'footSub', label: 'Footer sub' },
        { type: 'string', name: 'ctaLabel', label: 'Footer button label (instead of footer text)' },
        { type: 'string', name: 'ctaHref', label: 'Footer button link' },
        { type: 'string', name: 'variant', label: 'Variant', options: ['default', 'navy'] },
      ] },
      { type: 'string', name: 'disclaimer', label: 'Disclaimer (optional)', ui: ta },
    ],
  },
  {
    name: 'steps', label: 'Process steps',
    fields: [
      bandField(),
      { type: 'boolean', name: 'reverse', label: 'Steps on left (default on)' },
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'heading', label: 'Heading' },
      { type: 'string', name: 'headingMax', label: 'Heading max-width' },
      paragraphField(),
      noticeField('notice', 'Notice (optional)'),
      { type: 'object', name: 'items', label: 'Steps', list: true, ui: { itemProps: (i: any) => ({ label: i?.title }) }, fields: [
        { type: 'string', name: 'title', label: 'Title' },
        { type: 'string', name: 'text', label: 'Text', ui: ta },
      ] },
    ],
  },
  {
    name: 'faq', label: 'FAQ (renders the page FAQs below)',
    fields: [
      bandField(),
      { type: 'string', name: 'id', label: 'Anchor id (e.g. faq)' },
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'heading', label: 'Heading' },
      { type: 'boolean', name: 'wrapProse', label: 'Compact (route-page) layout' },
    ],
  },
  {
    name: 'ctaBand', label: 'CTA band (navy)',
    fields: [
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'pull', label: 'Pull quote (HTML, use <span class="gold">…</span>)' },
      { type: 'string', name: 'lead', label: 'Lead (optional)', ui: ta },
      { type: 'object', name: 'ctas', label: 'Buttons', list: true, ui: { itemProps: (i: any) => ({ label: i?.label }) }, fields: ctaFields() },
    ],
  },
  {
    name: 'form', label: 'Contact form section',
    fields: [
      bandField(),
      { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
      { type: 'string', name: 'heading', label: 'Heading' },
      paragraphField(),
      noticeField('notice', 'Notice (optional)'),
      { type: 'object', name: 'table', label: 'Spec table (optional)', list: true, ui: { itemProps: (i: any) => ({ label: i?.label }) }, fields: tableFields() },
    ],
  },
];

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
      mediaRoot: 'uploads',
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
          { type: 'string', name: 'seoDescription', label: 'Meta description', ui: ta },
          { type: 'image', name: 'ogImage', label: 'Social share image' },
          {
            type: 'object',
            name: 'faqs',
            label: 'FAQs',
            list: true,
            ui: { itemProps: (item: any) => ({ label: item?.question || 'FAQ' }) },
            fields: [
              { type: 'string', name: 'question', label: 'Question' },
              { type: 'string', name: 'answer', label: 'Answer', ui: ta },
            ],
          },
          {
            type: 'object',
            name: 'blocks',
            label: 'Page sections',
            list: true,
            templates: blockTemplates as any,
          },
          // Legacy hero fields — still read by pages not yet migrated to blocks.
          { type: 'string', name: 'h1', label: 'H1 (legacy)' },
          { type: 'string', name: 'heroEyebrow', label: 'Hero eyebrow (legacy)' },
          { type: 'string', name: 'heroLead', label: 'Hero lead (legacy)', ui: ta },
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
          { type: 'string', name: 'tagline', label: 'Tagline (footer)', ui: ta },
          { type: 'string', name: 'formspreeId', label: 'Formspree form id' },
          { type: 'string', name: 'footerDisclaimer', label: 'Footer disclaimer', ui: ta },
          { type: 'image', name: 'defaultOgImage', label: 'Default social share image' },
        ],
      },
    ],
  },
});
