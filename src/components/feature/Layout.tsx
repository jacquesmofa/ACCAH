import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';
import useTx from '@/hooks/useTx';
import { usePanelMotion, usePointerParallax } from '@/hooks/useMotion';

export default function Layout() {
  const { s, lang } = useTx();
  const { pathname, hash, search } = useLocation();
  const [showTop, setShowTop] = useState(false);
  usePointerParallax();
  usePanelMotion([pathname, lang]);

  // Scroll to top (or to the hash target) on route change.
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 120);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash, search]);

  useEffect(() => {
    const f = () => setShowTop(scrollY > 600);
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">{s('nav.skip')}</a>
      <Header />
      <main id="main" key={pathname} className="page-fade"><Outlet /></main>
      <Footer />
      {/* Mobile floating Get Support */}
      <Link to="/contact#inquiry" className="btn btn-gold md:hidden fixed left-4 bottom-4 z-40 shadow-lg !min-h-[44px]"><i className="ri-hand-heart-line" />{s('common.getSupport')}</Link>
      <button type="button" aria-label={s('common.backTop')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-4 bottom-4 z-40 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${showTop ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-3'}`}
        style={{ background: 'var(--surface)', border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)', color: 'var(--accent)' }}>
        <i className="ri-arrow-up-line text-lg" />
      </button>
    </>
  );
}