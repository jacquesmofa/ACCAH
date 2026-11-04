import { useEffect } from 'react';

export default function useScrollMotion(key: string) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const nav = document.querySelector('.nav');
    const navF = () => nav?.classList.toggle('is-solid', window.scrollY > 24);
    window.addEventListener('scroll', navF, { passive: true });
    navF();
    cleanups.push(() => window.removeEventListener('scroll', navF));

    const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FINE = matchMedia('(pointer: fine)').matches;

    if (FINE && !REDUCED) {
      const root = document.documentElement;
      let tx = 0; let ty = 0; let mx = 0; let my = 0; let mraf = 0;
      const settle = () => {
        mx += (tx - mx) * 0.08; my += (ty - my) * 0.08;
        root.style.setProperty('--mx', mx.toFixed(3));
        root.style.setProperty('--my', my.toFixed(3));
        mraf = Math.abs(tx - mx) + Math.abs(ty - my) > 0.002 ? requestAnimationFrame(settle) : 0;
      };
      const aim = (x: number, y: number) => { tx = x; ty = y; if (!mraf) mraf = requestAnimationFrame(settle); };
      const move = (e: PointerEvent) => aim((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
      const leave = () => aim(0, 0);
      window.addEventListener('pointermove', move, { passive: true });
      document.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        window.removeEventListener('pointermove', move);
        document.removeEventListener('mouseleave', leave);
        cancelAnimationFrame(mraf);
      });
    }

    if (REDUCED) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
      return () => cleanups.forEach((f) => f());
    }

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }), { rootMargin: '0px 0px -12% 0px' });
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.classList.contains('is-in')) return;
      const sibs = [...(el.parentElement?.children || [])].filter((ch) => ch.hasAttribute('data-reveal'));
      el.style.setProperty('--i', String(sibs.indexOf(el)));
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    let raf = 0;
    const paint = () => {
      raf = 0;
      const h = window.innerHeight;
      layers.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -h || r.top > 2 * h) return;
        const centre = (r.top + r.height / 2 - h / 2) / h;
        let speed = parseFloat(el.dataset.parallax || '0.32');
        if (el.classList.contains('panel-bg') && window.innerWidth < 780) speed = Math.min(speed, 0.22);
        el.style.setProperty('--py', `${(centre * -speed * h).toFixed(1)}px`);
      });
    };

    const SOFT = '.stage video, .plate, .panel-bg';
    const soften = (el: Element) => {
      const m = el as HTMLImageElement & HTMLVideoElement;
      const nw = m.naturalWidth || m.videoWidth;
      const nh = m.naturalHeight || m.videoHeight;
      if (!nw || !nh) return;
      const r = m.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const f = Math.max(r.width / nw, r.height / nh);
      const px = f <= 1.15 ? 0 : Math.min(1.6, Math.max(0.4, (f - 1) * 1.2));
      m.style.setProperty('--soften', `${px.toFixed(2)}px`);
    };
    const softenAll = () => document.querySelectorAll(SOFT).forEach(soften);
    const onLoad = (e: Event) => { const t = e.target as Element; if (t?.matches?.(SOFT)) soften(t); };
    document.addEventListener('load', onLoad, true);
    document.addEventListener('loadedmetadata', onLoad, true);
    softenAll();

    const words = [...document.querySelectorAll<HTMLElement>('[data-words]')].map((el) => ({
      section: (el.closest('section') || el) as HTMLElement,
      words: [...el.querySelectorAll<HTMLElement>('.w')],
    }));
    const light = () => {
      const h = window.innerHeight;
      words.forEach((m) => {
        const r = m.section.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) return;
        const p = Math.min(1, Math.max(0, (h * 0.8 - r.top) / (r.height + h * 0.45)));
        const n = m.words.length;
        m.words.forEach((w, i) => w.style.setProperty('--lit', p * (n + 1) > i + 1 ? '1' : '0'));
      });
    };
    const onScroll = () => {
      requestAnimationFrame(light);
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onResize = () => { paint(); softenAll(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    light(); paint();
    cleanups.push(() => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('load', onLoad, true);
      document.removeEventListener('loadedmetadata', onLoad, true);
      cancelAnimationFrame(raf);
    });
    return () => cleanups.forEach((f) => f());
  }, [key]);
}