import { useEffect, type RefObject } from 'react';

interface Beat {
  el: HTMLElement;
  from: number;
  to: number;
  parts: HTMLElement[];
  lines: HTMLElement[];
  chips: HTMLElement[];
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => 1 - (1 - x) ** 3;

export default function useFilm(ref: RefObject<HTMLElement | null>, key: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FINE = matchMedia('(pointer: fine)').matches;
    if (REDUCED) {
      el.classList.add('is-static');
      return () => el.classList.remove('is-static');
    }
    const FADE = 0.1;
    const STAGGER = 0.035;
    const stage = el.querySelector('.stage') as HTMLElement;
    const beats: Beat[] = [...el.querySelectorAll<HTMLElement>('.beat')].map((b) => {
      b.classList.remove('is-first');
      return {
        el: b,
        from: parseFloat(b.dataset.from || '0'),
        to: b.dataset.to ? parseFloat(b.dataset.to) : 1,
        parts: [...b.children].filter((c) => !c.classList.contains('chips')) as HTMLElement[],
        lines: [...b.querySelectorAll<HTMLElement>('.line-in')],
        chips: [...b.querySelectorAll<HTMLElement>('.chips li')],
      };
    });
    const c = {
      dur: parseFloat(el.dataset.duration || '14'),
      video: null as HTMLVideoElement | null,
      playing: false,
      held: false,
      wait: true,
      clock: 0,
      armed: false,
    };
    let disposed = false;
    const timers: number[] = [];

    const plate = stage.querySelector('.plate') as HTMLImageElement | null;
    const afterLCP = new Promise<void>((res) => {
      if (!plate || plate.complete) { res(); return; }
      plate.addEventListener('load', () => res(), { once: true });
      plate.addEventListener('error', () => res(), { once: true });
      timers.push(window.setTimeout(res, 800));
    });

    const retry = () => start();
    function start() {
      const v = c.video;
      if (!v) return;
      const p = v.play();
      if (!p || !p.then) { c.playing = true; return; }
      p.then(() => {
        c.playing = true;
        if (c.wait) c.wait = false;
        else if (Number.isFinite(v.duration) && v.duration > 0
          && Math.abs(c.clock * v.duration - v.currentTime) > 1.5) v.currentTime = c.clock * v.duration;
        if (c.held) v.pause();
      }).catch(() => {
        c.playing = false;
        c.wait = false;
        if (c.armed) return;
        c.armed = true;
        window.addEventListener('pointerdown', retry, { once: true, passive: true });
        window.addEventListener('touchstart', retry, { once: true, passive: true });
      });
    }

    async function attach() {
      if (c.video) return;
      await afterLCP;
      if (disposed || c.video || !el!.isConnected) return;
      const v = document.createElement('video');
      v.muted = true; v.playsInline = true; v.loop = true; v.preload = 'auto';
      v.disablePictureInPicture = true; v.tabIndex = -1;
      v.setAttribute('aria-hidden', 'true');
      v.setAttribute('playsinline', '');
      const poster = plate?.getAttribute('src') || el!.dataset.poster || '';
      if (poster) v.poster = poster;
      v.src = el!.dataset.video || '';
      timers.push(window.setTimeout(() => { c.wait = false; }, 5000));
      v.addEventListener('loadedmetadata', () => {
        if (Number.isFinite(v.duration) && v.duration > 0) c.dur = v.duration;
      }, { once: true });
      v.addEventListener('loadeddata', () => stage.classList.add('is-live'), { once: true });
      stage.insertBefore(v, stage.querySelector('.veil'));
      c.video = v;
      start();
    }

    function detach() {
      if (!c.video) return;
      stage.classList.remove('is-live');
      c.playing = false;
      c.video.pause();
      c.video.removeAttribute('src');
      c.video.load();
      c.video.remove();
      c.video = null;
    }

    const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) attach(); }), { rootMargin: '200px' });
    const far = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) detach(); }), { rootMargin: '260%' });
    near.observe(el); far.observe(el);

    function playhead(dt: number) {
      const v = c.video;
      if (c.playing && v && Number.isFinite(v.duration) && v.duration > 0) {
        c.clock = clamp01(v.currentTime / v.duration);
        return c.clock;
      }
      if (!c.held && !c.wait) c.clock = (c.clock + dt / Math.max(1, c.dur)) % 1;
      return c.clock;
    }
    function setState(node: HTMLElement, o: number, leaving: boolean) {
      node.style.setProperty('--o', o.toFixed(3));
      node.style.setProperty('--o-inv', (1 - o).toFixed(3));
      node.style.setProperty('--dir', leaving ? '1' : '-1');
    }
    function drive(node: HTMLElement, local: number, i: number, n: number) {
      const tIn = clamp01((local - i * STAGGER) / FADE);
      const tOut = clamp01((1 - local - (n - 1 - i) * STAGGER) / FADE);
      setState(node, ease(Math.min(tIn, tOut)), tOut < 1);
    }
    function applyBeats(p: number) {
      beats.forEach((b) => {
        const span = b.to - b.from;
        const local = span > 0 ? (p - b.from) / span : 0;
        const inside = local >= 0 && local < 1;
        b.el.style.setProperty('--local', clamp01(local).toFixed(3));
        if (!inside) {
          [...b.parts, ...b.lines, ...b.chips].forEach((n) => setState(n, 0, local > 1));
        } else {
          b.parts.forEach((n, i) => drive(n, local, i, b.parts.length));
          b.lines.forEach((n, i) => drive(n, local, i * 0.8, b.lines.length * 0.8));
          b.chips.forEach((n, i) => drive(n, local, 2 + i, 2 + b.chips.length));
        }
        b.el.classList.toggle('is-on', inside);
        b.el.classList.toggle('is-leaving', inside && 1 - local < FADE + STAGGER * 4);
      });
    }

    function hold(on: boolean) {
      if (c.held === on) return;
      c.held = on;
      const v = c.video;
      if (!v || !c.playing) return;
      if (on) v.pause(); else v.play().catch(() => {});
    }
    const over = (e: PointerEvent) => { if ((e.target as HTMLElement).closest('.beat')) hold(true); };
    const out = (e: PointerEvent) => {
      const rt = e.relatedTarget as HTMLElement | null;
      if (!rt || !rt.closest?.('.beat')) hold(false);
    };
    if (FINE) { stage.addEventListener('pointerover', over); stage.addEventListener('pointerout', out); }

    const setExit = () => {
      const top = el.getBoundingClientRect().top;
      el.style.setProperty('--exit', clamp01(-top / Math.max(1, window.innerHeight)).toFixed(3));
    };
    const cueOff = () => document.documentElement.style.setProperty('--cue', '0');
    window.addEventListener('scroll', cueOff, { once: true, passive: true });

    let raf = 0;
    let prev = 0;
    function tick(now: number) {
      const dt = prev ? Math.min(0.1, (now - prev) / 1000) : 0;
      prev = now;
      setExit();
      applyBeats(playhead(dt));
      raf = requestAnimationFrame(tick);
    }
    const run = new IntersectionObserver((es) => {
      const vis = es.some((e) => e.isIntersecting);
      if (vis && !raf) { prev = 0; raf = requestAnimationFrame(tick); }
      if (!vis && raf) { cancelAnimationFrame(raf); raf = 0; setExit(); }
    });
    run.observe(el);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      timers.forEach((t) => clearTimeout(t));
      near.disconnect(); far.disconnect(); run.disconnect();
      stage.removeEventListener('pointerover', over);
      stage.removeEventListener('pointerout', out);
      window.removeEventListener('pointerdown', retry);
      window.removeEventListener('touchstart', retry);
      window.removeEventListener('scroll', cueOff);
      detach();
    };
  }, [ref, key]);
}