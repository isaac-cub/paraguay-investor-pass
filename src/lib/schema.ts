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

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
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
