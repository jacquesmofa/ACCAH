import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import { setLanguage } from '@/i18n';

export const NAV = [
  { to: '/', key: 'home' }, { to: '/about', key: 'about' }, { to: '/services', key: 'services' }, { to: '/cgirls', key: 'cgirls' },
  { to: '/events', key: 'events' }, { to: '/partners', key: 'partners' }, { to: '/get-involved', key: 'involved' }, { to: '/contact', key: 'contact' },
];

export function LangToggle({ small }: { small?: boolean }) {
  const { s, lang } = useTx();
  return (
    <button type="button" onClick={() => setLanguage(lang === 'en' ? 'fr' : 'en')} aria-label={s('nav.lang')}
      className={`cursor-pointer whitespace-nowrap font-[var(--font-label)] ${small ? 'text-xs' : 'text-[13px]'} tracking-widest`} style={{ fontFamily: 'var(--font-label)' }}>
      <span style={{ color: lang === 'en' ? 'var(--accent)' : 'var(--muted)' }}>EN</span>
      <span className="mx-1.5" style={{ color: 'var(--muted)' }}>|</span>
      <span style={{ color: lang === 'fr' ? 'var(--accent)' : 'var(--muted)' }}>FR</span>
    </button>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 no-underline cursor-pointer" aria-label="CWFCS home">
      <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>
        <i className="ri-vip-crown-2-line text-lg" />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-tight">Crowned Women</span>
        <span className="block text-[10px] tracking-[.18em] uppercase" style={{ color: 'var(--muted)', fontFamily: 'var(--font-label)' }}>& Family · CWFCS</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const { s } = useTx();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const f = () => setSolid(scrollY > 24);
    addEventListener('scroll', f, { passive: true }); f();
    return () => removeEventListener('scroll', f);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  return (
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <div className="flex items-center justify-between gap-6 px-4 md:px-6 lg:px-10 h-[76px]">
        <Logo />
        <nav aria-label="Main" className="hidden xl:flex items-center gap-7">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{s(`nav.${n.key}`)}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex"><LangToggle /></span>
          <Link to="/get-involved#donate" className="btn btn-gold hidden sm:inline-flex !min-h-[42px] !px-5">{s('nav.donate')}</Link>
          <button type="button" className="xl:hidden w-11 h-11 flex items-center justify-center cursor-pointer rounded-full" style={{ border: '1px solid color-mix(in srgb, var(--text) 20%, transparent)' }}
            aria-label={s('nav.menu')} aria-expanded={open} onClick={() => setOpen(true)}>
            <i className="ri-menu-4-line text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div className={`fixed inset-0 z-[60] flex flex-col transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'var(--bg)' }} aria-hidden={!open}>
        <div className="pattern-rule" />
        <div className="flex items-center justify-between px-4 md:px-6 h-[76px]">
          <Logo />
          <button type="button" className="w-11 h-11 flex items-center justify-center cursor-pointer" aria-label={s('nav.close')} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <i className="ri-close-line text-2xl" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-3">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} tabIndex={open ? 0 : -1}
              className={({ isActive }) => `text-3xl font-semibold tracking-tight no-underline ${isActive ? '' : 'opacity-80'}`}
              style={({ isActive }) => ({ color: isActive ? 'var(--accent)' : 'var(--text)' })}>{s(`nav.${n.key}`)}</NavLink>
          ))}
          <div className="mt-4"><LangToggle /></div>
        </nav>
        <div className="p-6"><Link to="/get-involved#donate" className="btn btn-gold w-full" tabIndex={open ? 0 : -1}>{s('nav.donate')}</Link></div>
      </div>
    </header>
  );
}