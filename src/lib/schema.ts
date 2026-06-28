const SITE = 'https://paraguayinvestorpass.com';

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: new URL(it.path, SITE).href,
    })),
  };
}

type Faq = { q?: string; a?: string; question?: string; answer?: string };
export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question ?? f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.answer ?? f.a },
    })),
  };
}

export function service(opts: { name: string; description: string; price: number; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    provider: { '@type': 'Organization', name: 'Lincoln Global Partners' },
    areaServed: { '@type': 'Country', name: 'Paraguay' },
    description: opts.description,
    url: new URL(opts.path, SITE).href,
    offers: {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: 'USD',
      description: `Minimum qualifying investment from USD ${opts.price.toLocaleString('en-US')}.`,
    },
  };
}
