import { useEffect } from 'react';

/** Pointer parallax: eases --mx / --my (-1…1) onto :root. Mouse only, never under reduced motion. */
export function usePointerParallax() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer: fine)').matches) return undefined;
    const root = document.documentElement;
    const MLERP = 0.08;
    let tx = 0; let ty = 0; let mx = 0; let my = 0; let mraf = 0;
    const settle = () => {
      mx += (tx - mx) * MLERP; my += (ty - my) * MLERP;
      root.style.setProperty('--mx', mx.toFixed(3));
      root.style.setProperty('--my', my.toFixed(3));
      mraf = Math.abs(tx - mx) + Math.abs(ty - my) > 0.002 ? requestAnimationFrame(settle) : 0;
    };
    const aim = (x: number, y: number) => { tx = x; ty = y; if (!mraf) mraf = requestAnimationFrame(settle); };
    const onMove = (e: PointerEvent) => aim((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    const onLeave = () => aim(0, 0);
    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => { removeEventListener('pointermove', onMove); document.removeEventListener('mouseleave', onLeave); cancelAnimationFrame(mraf); };
  }, []);
}

/** Reveal-on-entry, panel parallax, resample smoothing and manifesto word lighting. Re-scans on route/lang change. */
export function usePanelMotion(deps: unknown[]) {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let io: IntersectionObserver | null = null;
    let raf = 0;
    const timer = window.setTimeout(() => {
      const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')];
      if (reduced) { reveals.forEach((el) => el.classList.add('is-in')); }
      else {
        io = new IntersectionObserver((es) => es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in'); io?.unobserve(e.target);
        }), { rootMargin: '0px 0px -12% 0px' });
        reveals.forEach((el) => {
          const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal')) : [];
          el.style.setProperty('--i', String(Math.max(0, sibs.indexOf(el))));
          io?.observe(el);
        });
      }
      paint(); softenAll(); light();
    }, 60);

    const paint = () => {
      raf = 0;
      if (reduced) return;
      const h = innerHeight;
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -h || r.top > 2 * h) return;
        const centre = (r.top + r.height / 2 - h / 2) / h;
        let speed = parseFloat(el.dataset.parallax || '0.32');
        if (el.classList.contains('panel-bg') && innerWidth < 780) speed = Math.min(speed, 0.22);
        el.style.setProperty('--py', `${(centre * -speed * h).toFixed(1)}px`);
      });
    };
    const soften = (el: HTMLImageElement | HTMLVideoElement) => {
      const nw = (el as HTMLImageElement).naturalWidth || (el as HTMLVideoElement).videoWidth;
      const nh = (el as HTMLImageElement).naturalHeight || (el as HTMLVideoElement).videoHeight;
      if (!nw || !nh) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const factor = Math.max(r.width / nw, r.height / nh);
      const px = factor <= 1.15 ? 0 : Math.min(1.6, Math.max(0.4, (factor - 1) * 1.2));
      el.style.setProperty('--soften', `${px.toFixed(2)}px`);
    };
    const SOFT = '.stage video, .plate, .panel-bg';
    const softenAll = () => document.querySelectorAll<HTMLImageElement>(SOFT).forEach(soften);
    const onLoad = (e: Event) => { const t = e.target as HTMLElement; if (t?.matches?.(SOFT)) soften(t as HTMLImageElement); };
    const light = () => {
      const h = innerHeight;
      document.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
        const section = el.closest('section') || el;
        const r = section.getBoundingClientRect();
        if (r.bottom < 0 || r.top > h) return;
        const p = Math.min(1, Math.max(0, (h * 0.8 - r.top) / (r.height + h * 0.45)));
        const words = el.querySelectorAll<HTMLElement>('.w');
        const n = words.length;
        words.forEach((w, i) => w.style.setProperty('--lit', reduced || p * (n + 1) > i + 1 ? '1' : '0'));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); requestAnimationFrame(light); };
    const onResize = () => { paint(); softenAll(); };
    document.addEventListener('load', onLoad, true);
    document.addEventListener('loadedmetadata', onLoad, true);
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer); io?.disconnect(); cancelAnimationFrame(raf);
      document.removeEventListener('load', onLoad, true);
      document.removeEventListener('loadedmetadata', onLoad, true);
      removeEventListener('scroll', onScroll); removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}