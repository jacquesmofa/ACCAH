import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  PAGE_META,
  ROUTE_PATHS,
  SITE,
  absoluteUrl,
  buildPageSchema,
  normalizeLang,
  pageKeyForPath,
} from '@/lib/seo';

const setMeta = (key: string, content: string, attr: 'name' | 'property' = 'name') => {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const removeHreflang = () => {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((node) => node.remove());
};

/**
 * Keeps the document head in sync with the current route and language:
 * title, description, canonical, robots, Open Graph, Twitter card and JSON-LD.
 * Crawlers that never run JavaScript are covered by the static tags in
 * index.html and by the per-page table documented in the project notes.
 */
export default function useSeo() {
  const { pathname } = useLocation();
  const { i18n, t } = useTranslation();
  const lang = normalizeLang(i18n.language || 'en');

  useEffect(() => {
    const key = pageKeyForPath(pathname);
    const meta = PAGE_META[lang][key];
    const canonical = absoluteUrl(ROUTE_PATHS[key]);

    document.documentElement.lang = lang === 'fr' ? 'fr' : 'en';
    document.title = meta.title;

    setMeta('description', meta.description);
    setMeta(
      'robots',
      meta.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    setCanonical(canonical);

    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', SITE.name, 'property');
    setMeta('og:title', meta.title, 'property');
    setMeta('og:description', meta.description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:image', meta.image, 'property');
    setMeta('og:image:secure_url', meta.image, 'property');
    setMeta('og:image:type', 'image/jpeg', 'property');
    setMeta('og:image:width', '1200', 'property');
    setMeta('og:image:height', '630', 'property');
    setMeta('og:image:alt', meta.title, 'property');
    setMeta('og:locale', SITE.locale[lang], 'property');
    setMeta('og:locale:alternate', SITE.locale[lang === 'fr' ? 'en' : 'fr'], 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setMeta('twitter:image', meta.image);
    setMeta('twitter:image:alt', meta.title);

    // FAQ structured data only where the same answers are visible on the page.
    const faq =
      key === 'contact'
        ? [1, 2, 3, 4, 5, 6].map((n) => ({ question: t(`faq.q${n}`), answer: t(`faq.a${n}`) }))
        : [];

    const blocks = buildPageSchema(key, lang, meta, faq);
    let script = document.getElementById('page-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'page-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);

    // One URL serves both languages, so no hreflang alternates are published:
    // pointing en and fr at the same address would be inaccurate.
    removeHreflang();
  }, [pathname, lang, t]);
}