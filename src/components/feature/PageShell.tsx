import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SiteNav from '@/components/feature/SiteNav';
import SiteFooter from '@/components/feature/SiteFooter';
import useScrollMotion from '@/hooks/useScrollMotion';

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  metaKey?: string;
};

export default function PageShell({ children, title, metaKey }: Props) {
  const { t, i18n } = useTranslation();
  const { pathname, hash } = useLocation();
  useScrollMotion(`${i18n.language}-${metaKey || title || 'page'}`);

  useEffect(() => {
    document.documentElement.lang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  }, [i18n.language]);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'auto', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return (
    <>
      <a href="#main-content" className="skip-link">{t('site.skip')}</a>
      <SiteNav />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}