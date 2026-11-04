import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LINKS = [
  { to: '/', k: 'home' },
  { to: '/about', k: 'about' },
  { to: '/work', k: 'work' },
  { to: '/credentials-ark', k: 'ark' },
  { to: '/impact', k: 'impact' },
  { to: '/partners', k: 'partners' },
  { to: '/get-involved', k: 'involved' },
  { to: '/news', k: 'news' },
  { to: '/contact', k: 'contact' },
];

export default function SiteNav() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isFr = i18n.language.startsWith('fr');

  useEffect(() => { setOpen(false); }, [pathname]);

  const langSwitch = (extra = '') => (
    <div className={`lang-switch ${extra}`} role="group" aria-label={t('nav.langAria')}>
      <button type="button" onClick={() => i18n.changeLanguage('fr')} aria-pressed={isFr}
        lang="fr" className="whitespace-nowrap">{t('nav.langFr')}</button>
      <span aria-hidden="true">|</span>
      <button type="button" onClick={() => i18n.changeLanguage('en')} aria-pressed={!isFr}
        lang="en" className="whitespace-nowrap">{t('nav.langEn')}</button>
    </div>
  );

  return (
    <header className="nav fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between gap-3 px-4 md:px-8 h-16 md:h-20" aria-label="Main">
        <Link to="/" className="flex items-center gap-2.5 no-underline text-foreground-50 shrink-0">
          <span className="w-9 h-9 rounded-full border border-primary-500/60 flex items-center justify-center text-primary-500">
            <i className="ri-sailboat-line text-lg"></i>
          </span>
          <span className="font-semibold tracking-tight text-[15px] whitespace-nowrap">{t('brand.name')}</span>
        </Link>

        <ul className="hidden xl:flex items-center gap-4 list-none m-0 p-0 text-[12.5px]">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink className="nav-link" to={l.to} end={l.to === '/'}>{t(`nav.${l.k}`)}</NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-3 shrink-0">
          {langSwitch()}
          <Link to="/donate" className="cta !mt-0 !py-2.5 !text-sm">{t('nav.donate')}</Link>
        </div>

        <button type="button" className="xl:hidden w-10 h-10 flex items-center justify-center text-foreground-50 bg-transparent border-0 shrink-0"
          aria-label={open ? t('nav.close') : t('nav.menu')} aria-expanded={open} onClick={() => setOpen(!open)}>
          <i className={`${open ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
        </button>
      </nav>

      {open && (
        <div className="xl:hidden bg-background-950/97 backdrop-blur-md border-t border-foreground-50/10 px-4 pb-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="list-none m-0 p-0 flex flex-col">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className="block py-3 text-[15px] text-foreground-50 no-underline border-b border-foreground-50/10">
                  {t(`nav.${l.k}`)}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            {langSwitch()}
            <Link to="/donate" className="cta !mt-0 !py-2 !text-sm">{t('nav.donate')}</Link>
          </div>
        </div>
      )}
    </header>
  );
}