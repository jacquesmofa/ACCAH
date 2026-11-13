/**
 * Single source of truth for the site's technical SEO layer.
 * Every value here is taken from content that is visible on the site.
 * Nothing is invented: the address and phone come from the client (11 Nov 2026, src/lib/contact.ts);
 * no rating, price or social account is declared, because none exist yet.
 */

export type Lang = 'en' | 'fr';

export type PageKey =
  | 'home'
  | 'about'
  | 'work'
  | 'ark'
  | 'impact'
  | 'partners'
  | 'involved'
  | 'donate'
  | 'news'
  | 'gallery'
  | 'contact'
  | 'privacy'
  | 'access'
  | 'notFound';

export const SITE = {
  name: 'African and Canadian Community Ark of Hope',
  shortName: 'Ark of Hope',
  tagline: 'A Safe Harbour. A Fair Path. A Stronger Future.',
  domain: 'https://accah.org',
  email: 'african.canadian.arkofhope@gmail.com',
  telephone: '+1-438-282-7441',
  brandColor: '#F2B56B',
  themeColor: '#0C1A1C',
  backgroundColor: '#0C1A1C',
  logo: 'https://accah.org/icon-512.png',
  locale: { en: 'en_CA', fr: 'fr_CA' } as Record<Lang, string>,
  /** No social profiles exist on the site yet, so sameAs is intentionally empty. */
  social: [] as string[],
};

export const ROUTE_PATHS: Record<PageKey, string> = {
  home: '/',
  about: '/about',
  work: '/work',
  ark: '/credentials-ark',
  impact: '/impact',
  partners: '/partners',
  involved: '/get-involved',
  donate: '/donate',
  news: '/news',
  gallery: '/gallery',
  contact: '/contact',
  privacy: '/privacy',
  access: '/accessibility',
  notFound: '/404',
};

/** Main menu, in the same order and wording as the visible navigation. */
export const NAV_ITEMS: { path: string; labelKey: string }[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/work', labelKey: 'nav.work' },
  { path: '/credentials-ark', labelKey: 'nav.ark' },
  { path: '/impact', labelKey: 'nav.impact' },
  { path: '/partners', labelKey: 'nav.partners' },
  { path: '/get-involved', labelKey: 'nav.involved' },
  { path: '/news', labelKey: 'nav.news' },
  { path: '/gallery', labelKey: 'nav.gallery' },
  { path: '/contact', labelKey: 'nav.contact' },
  { path: '/donate', labelKey: 'nav.donate' },
];

// Branded 1200 x 630 share cards, one per page (public/social/*.jpg, made from the site's own colours and type).
const card = (key: string) => `https://accah.org/social/${key}.jpg`;
const OG = {
  home: card('home'),
  about: card('about'),
  work: card('work'),
  ark: card('ark'),
  impact: card('impact'),
  partners: card('partners'),
  involved: card('involved'),
  donate: card('donate'),
  news: card('news'),
  gallery: card('home'),
  contact: card('contact'),
  privacy: card('privacy'),
  access: card('access'),
};

export const SQUARE_OG_IMAGE = 'https://accah.org/icon-512.png';

export type PageMeta = {
  title: string;
  description: string;
  image: string;
  /** Only the 404 page is excluded from indexing. */
  noindex?: boolean;
};

const entry = (title: string, description: string, image: string, noindex = false): PageMeta => ({
  title,
  description,
  image,
  ...(noindex ? { noindex } : {}),
});

export const PAGE_META: Record<Lang, Record<PageKey, PageMeta>> = {
  en: {
    home: entry(
      'African and Canadian Community Ark of Hope',
      'A bilingual nonprofit advancing equity, opportunity and belonging for women, newcomers, families, persons with disabilities and underserved communities.',
      OG.home,
    ),
    about: entry(
      'About Us: Mission, Vision and Values | Ark of Hope',
      'Learn about our mission, vision, values and our commitment to bilingual, accessible, community-led change across Canadian communities.',
      OG.about,
    ),
    work: entry(
      'Our Work: Equity and Inclusion Programs | Ark of Hope',
      'Explore our priority areas: women’s equality, newcomer inclusion, youth and family well-being, accessibility and systems change. See how we work.',
      OG.work,
    ),
    ark: entry(
      'The Credentials ARK: Credential Recognition | Ark of Hope',
      'A systemic-change initiative addressing credential recognition, employment and leadership barriers facing newcomer and racialized professional women.',
      OG.ark,
    ),
    impact: entry(
      'Impact and Systems Change: How We Measure It | Ark of Hope',
      'Why systems change matters, the six-step approach behind our work and the indicators we use to measure progress with community partners.',
      OG.impact,
    ),
    partners: entry(
      'Partners: Cross-Sector Collaboration | Ark of Hope',
      'Cross-sector partnership and eight ways to work with African and Canadian Community Ark of Hope, from advisory roles to program delivery.',
      OG.partners,
    ),
    involved: entry(
      'Get Involved: Volunteer and Partner With Us | Ark of Hope',
      'Volunteer, share your experience, build partnerships and help create more equitable community and professional pathways for women and newcomers.',
      OG.involved,
    ),
    donate: entry(
      'Donate: Turn Hope Into Opportunity | Ark of Hope',
      'Turn hope into opportunity with one-time gifts, monthly giving, activity sponsorship and in-kind contributions that support equitable pathways.',
      OG.donate,
    ),
    news: entry(
      'News and Resources: Updates and Learning | Ark of Hope',
      'Organizational updates, community opportunities, learning resources and bilingual publications from African and Canadian Community Ark of Hope.',
      OG.news,
    ),
    gallery: entry(
      'Gallery: Our Community in Pictures | Ark of Hope',
      'Pictures from our programs and community life: mentoring, credential recognition, family support and gatherings across our bilingual community.',
      OG.gallery,
    ),
    contact: entry(
      'Contact Us and Frequently Asked Questions | Ark of Hope',
      'Contact our team, route your inquiry to the right person and read answers to the questions we are asked most often. We reply in English or French.',
      OG.contact,
    ),
    privacy: entry(
      'Privacy: How We Protect Your Information | Ark of Hope',
      'How we collect, use, protect and retain personal information, and how to reach us with a privacy question or request. Plain-language summary.',
      OG.privacy,
    ),
    access: entry(
      'Accessibility Statement and Feedback | Ark of Hope',
      'Our accessibility commitment, how to request information in an alternate format and how to tell us about a barrier you encounter on this site.',
      OG.access,
    ),
    notFound: entry(
      'Page Not Found (404) | Ark of Hope',
      'This page could not be found. Use the menu to reach our home page, our programs, our resources or our contact information.',
      OG.home,
      true,
    ),
  },
  fr: {
    home: entry(
      'Arche de l’espoir des communautés africaines et canadiennes',
      'Un organisme à but non lucratif bilingue qui fait progresser l’équité, les possibilités et l’appartenance pour les femmes, les personnes nouvelles arrivantes, les familles et les communautés mal desservies.',
      OG.home,
    ),
    about: entry(
      'À propos : mission, vision et valeurs | Arche de l’espoir',
      'Découvrez notre mission, notre vision, nos valeurs et notre engagement envers un changement bilingue, accessible et mené par la communauté.',
      OG.about,
    ),
    work: entry(
      'Nos actions : équité et inclusion | Arche de l’espoir',
      'Explorez nos champs d’action : égalité des femmes, inclusion des personnes nouvelles arrivantes, bien-être des jeunes et des familles, accessibilité et changement systémique.',
      OG.work,
    ),
    ark: entry(
      'L’ARK des titres de compétences | Arche de l’espoir',
      'Une initiative de changement systémique qui s’attaque à la reconnaissance des titres de compétences et aux obstacles à l’emploi et au leadership des femmes immigrantes et racisées.',
      OG.ark,
    ),
    impact: entry(
      'Impact et changement systémique | Arche de l’espoir',
      'Pourquoi le changement systémique compte, la démarche en six étapes qui guide notre travail et les indicateurs utilisés pour mesurer les progrès.',
      OG.impact,
    ),
    partners: entry(
      'Partenariats intersectoriels | Arche de l’espoir',
      'Des partenariats intersectoriels et huit façons de collaborer avec l’Arche de l’espoir des communautés africaines et canadiennes, du rôle-conseil à la réalisation de programmes.',
      OG.partners,
    ),
    involved: entry(
      'S’impliquer : bénévolat et partenariats | Arche de l’espoir',
      'Faites du bénévolat, partagez votre expérience, créez des partenariats et aidez à ouvrir des voies plus équitables pour les femmes et les personnes nouvelles arrivantes.',
      OG.involved,
    ),
    donate: entry(
      'Faire un don : de l’espoir à l’occasion | Arche de l’espoir',
      'Transformez l’espoir en possibilités grâce à un don unique, un don mensuel, le parrainage d’une activité ou une contribution en nature.',
      OG.donate,
    ),
    news: entry(
      'Nouvelles et ressources | Arche de l’espoir',
      'Nouvelles de l’organisme, occasions communautaires, ressources d’apprentissage et publications bilingues de l’Arche de l’espoir.',
      OG.news,
    ),
    gallery: entry(
      'Galerie : notre communauté en images | Arche de l’espoir',
      'Images de nos programmes et de la vie communautaire : mentorat, reconnaissance des titres de compétences, soutien aux familles et rencontres.',
      OG.gallery,
    ),
    contact: entry(
      'Nous joindre et questions fréquentes | Arche de l’espoir',
      'Communiquez avec notre équipe, dirigez votre demande vers la bonne personne et lisez les réponses aux questions les plus fréquentes, en français ou en anglais.',
      OG.contact,
    ),
    privacy: entry(
      'Confidentialité : protéger vos renseignements | Arche de l’espoir',
      'Comment nous recueillons, utilisons, protégeons et conservons les renseignements personnels, et comment nous joindre pour une question de confidentialité.',
      OG.privacy,
    ),
    access: entry(
      'Déclaration d’accessibilité | Arche de l’espoir',
      'Notre engagement envers l’accessibilité, la façon de demander de l’information dans un autre format et la façon de nous signaler un obstacle sur ce site.',
      OG.access,
    ),
    notFound: entry(
      'Page introuvable (404) | Arche de l’espoir',
      'Cette page est introuvable. Utilisez le menu pour accéder à l’accueil, aux programmes, aux ressources ou aux coordonnées de l’organisme.',
      OG.home,
      true,
    ),
  },
};

export function normalizeLang(language: string): Lang {
  return language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function absoluteUrl(path: string): string {
  if (path === '/' || path === '') return `${SITE.domain}/`;
  return `${SITE.domain}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageKeyForPath(pathname: string): PageKey {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const found = (Object.keys(ROUTE_PATHS) as PageKey[]).find(
    (key) => ROUTE_PATHS[key] !== '/404' && ROUTE_PATHS[key] === clean,
  );
  return found ?? 'notFound';
}

/** Page-level structured data. Organization and WebSite live in the static HTML. */
export function buildPageSchema(
  key: PageKey,
  lang: Lang,
  meta: PageMeta,
  faq: { question: string; answer: string }[] = [],
) {
  const url = absoluteUrl(ROUTE_PATHS[key]);
  const typeByKey: Partial<Record<PageKey, string>> = {
    about: 'AboutPage',
    work: 'CollectionPage',
    news: 'CollectionPage',
    gallery: 'CollectionPage',
    impact: 'WebPage',
    contact: 'ContactPage',
  };
  const page: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': typeByKey[key] ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
    isPartOf: { '@id': `${SITE.domain}/#website` },
    about: { '@id': `${SITE.domain}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: meta.image,
      width: 1200,
      height: 630,
    },
  };

  if (key === 'contact') {
    page.mainEntity = { '@id': `${url}#faq` };
  }

  const blocks: Record<string, unknown>[] = [page];

  if (key === 'contact' && faq.length > 0) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      inLanguage: lang === 'fr' ? 'fr-CA' : 'en-CA',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return blocks;
}