import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FORM_EMAIL } from '@/hooks/useFormSubmit';

const PRIMARY = [
  { to: '/', k: 'home' },
  { to: '/about', k: 'about' },
  { to: '/work', k: 'work' },
  { to: '/get-involved', k: 'involved' },
];
const SECONDARY = [
  { to: '/contact', k: 'contact' },
  { to: '/donate', k: 'donate' },
  { to: '/privacy', k: 'privacy' },
  { to: '/accessibility', k: 'access' },
];

export default function SiteFooter() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  return (
    <footer className="relative bg-background-950 text-foreground-50 pt-20 pb-8 px-4 md:px-[8vw] border-t border-primary-500/30">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent"></div>

      <h2 data-reveal className="foot-line text-3xl md:text-6xl font-semibold tracking-tight leading-[1.05] m-0 max-w-[22ch]"
        dangerouslySetInnerHTML={{ __html: t('ft.line') }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
        <div data-reveal>
          <p className="font-semibold m-0 leading-snug max-w-[30ch]">{t('brand.full')}</p>
          <p className="text-xs text-foreground-400 mt-2 m-0 max-w-[30ch]" lang={isFr ? 'en' : 'fr'}>{t('brand.fullFr')}</p>
          <p className="text-sm text-foreground-300 mt-3 max-w-[32ch]">{t('ft.desc')}</p>
          <Link to="/donate" className="cta !mt-5 !py-2.5 !text-sm">{t('nav.donate')}</Link>
        </div>

        <div data-reveal>
          <p className="stamp">{t('ft.explore')}</p>
          <ul className="list-none p-0 mt-4 grid gap-2 text-sm">
            {PRIMARY.map((l) => (
              <li key={l.to}><Link className="nav-link text-foreground-300" to={l.to}>{t(`nav.${l.k}`)}</Link></li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <p className="stamp">{t('ft.more')}</p>
          <ul className="list-none p-0 mt-4 grid gap-2 text-sm">
            {SECONDARY.map((l) => (
              <li key={l.to}>
                <Link className="nav-link text-foreground-300" to={l.to}>
                  {l.k === 'privacy' ? t('ft.privacy') : l.k === 'access' ? t('ft.access') : t(`nav.${l.k}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <p className="stamp">{t('ft.contact')}</p>
          <a href={`mailto:${FORM_EMAIL}`} className="nav-link text-sm text-foreground-300 mt-4 inline-block break-all">{FORM_EMAIL}</a>
          <ul className="list-none p-0 mt-3 grid gap-1.5 text-xs text-foreground-500">
            <li>{t('ft.phone')}</li>
            <li>{t('ft.address')}</li>
            <li>{t('ft.hours')}</li>
            <li>{t('ft.social')}</li>
          </ul>
          <div className="mt-4 flex items-center gap-2 text-xs text-foreground-500">
            <button type="button" onClick={() => i18n.changeLanguage('fr')} aria-pressed={isFr}
              className={`bg-transparent border-0 p-0 text-xs ${isFr ? 'text-primary-500' : 'text-foreground-400 hover:text-primary-500'}`}>Français</button>
            <span aria-hidden="true">|</span>
            <button type="button" onClick={() => i18n.changeLanguage('en')} aria-pressed={!isFr}
              className={`bg-transparent border-0 p-0 text-xs ${!isFr ? 'text-primary-500' : 'text-foreground-400 hover:text-primary-500'}`}>English</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-14 pt-6 border-t border-foreground-50/10 text-xs text-foreground-400">
        <p className="m-0">{t('ft.rights')}</p>
        <div className="flex flex-wrap gap-5">
          <Link to="/privacy" className="nav-link text-foreground-400">{t('ft.privacy')}</Link>
          <Link to="/accessibility" className="nav-link text-foreground-400">{t('ft.access')}</Link>
        </div>
      </div>
    </footer>
  );
}