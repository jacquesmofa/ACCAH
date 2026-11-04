import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import { VIDEO_SRC, VIDEO_COVER } from '@/mocks/media';
import { fmt } from '@/components/base/Rich';

interface Beat { stamp: string; lines: string[]; sub?: string; cta?: string; points?: string[] }

// Shot list (D = 14s): act boundaries as fractions of chapter progress.
const D = 14;
const ACTS = [
  { from: 0, to: 3, tone: 'light', motion: 'track', id: 'welcome', href: '/get-involved#donate' },
  { from: 3, to: 6, tone: 'dark', motion: 'rise', id: 'invitation', href: '/get-involved' },
  { from: 6, to: 9, tone: 'light', motion: 'drift', id: 'who-we-are' },
  { from: 9, to: 11, tone: 'light', motion: 'zoom', id: 'programs' },
  { from: 11, to: 14, tone: 'light', motion: 'rise', id: 'give', href: '/get-involved#donate' },
];

type Part = HTMLElement;
interface BeatRef { el: HTMLElement; from: number; to: number; parts: Part[]; lines: Part[] }

export default function Chapter() {
  const { o, lang } = useTx();
  const beats = o<Beat[]>('home.beats');
  const ref = useRef<HTMLElement>(null);

  // Scroll-scrubbed playback (scrollbar = playhead), beat choreography, video lifecycle.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const TOUCH = matchMedia('(pointer: coarse)').matches;
    const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (REDUCED) { el.classList.add('is-static'); return undefined; }
    if (TOUCH) el.classList.add('is-touch');

    const LERP = TOUCH ? 0.03 : 0.02;
    const FADE = 0.10; const STAGGER = 0.035; const EPS = 1 / 60;
    const CREEP = TOUCH ? 0.012 : 0.010;
    const stage = el.querySelector('.stage') as HTMLElement;
    const bs: BeatRef[] = [...el.querySelectorAll<HTMLElement>('.beat')].map((b) => ({
      el: b, from: parseFloat(b.dataset.from || '0'), to: parseFloat(b.dataset.to || '1'),
      parts: [...b.children] as Part[], lines: [...b.querySelectorAll<HTMLElement>('.line-in')],
    }));
    const c = { video: null as HTMLVideoElement | null, current: 0, rolling: false };
    let alive = true;

    const afterLCP = new Promise<void>((res) => {
      if (document.readyState === 'complete') res(); else addEventListener('load', () => res(), { once: true });
    }).then(() => new Promise<void>((res) => {
      if ('requestIdleCallback' in window) (window as unknown as { requestIdleCallback: (cb: () => void, o: object) => void }).requestIdleCallback(res, { timeout: 1500 });
      else setTimeout(res, 300);
    }));

    const detach = () => {
      if (!c.video) return;
      stage.classList.remove('is-live');
      c.video.removeAttribute('src'); c.video.load(); c.video.remove(); c.video = null;
    };
    const warmUp = (v: HTMLVideoElement) => {
      const roll = () => {
        if (c.video !== v || c.rolling || v.readyState >= 2) return;
        c.rolling = true; v.loop = true;
        v.play().catch(() => { el.classList.add('is-static'); detach(); });
      };
      const started = v.play();
      if (started && started.then) started.then(() => { if (!c.rolling) v.pause(); }).catch(roll);
      setTimeout(roll, 4000);
    };
    const attach = async () => {
      if (c.video) return;
      await afterLCP;
      if (!alive || c.video || !el.isConnected) return;
      const v = document.createElement('video');
      v.muted = true; v.playsInline = true; v.preload = 'auto';
      v.disablePictureInPicture = true; v.tabIndex = -1;
      v.setAttribute('aria-hidden', 'true'); v.setAttribute('playsinline', '');
      v.src = VIDEO_SRC;
      v.addEventListener('loadeddata', () => stage.classList.add('is-live'), { once: true });
      stage.insertBefore(v, stage.querySelector('.veil'));
      c.video = v;
      if (TOUCH) warmUp(v);
    };

    const near = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) attach(); }), { rootMargin: '120% 0px' });
    const far = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) detach(); }), { rootMargin: '260% 0px' });
    near.observe(el); far.observe(el);

    const applyVideo = (v: HTMLVideoElement | null, t: number) => {
      if (!v || !Number.isFinite(v.duration) || v.seeking) return;
      if (Math.abs(v.currentTime - t) < EPS) return;
      v.currentTime = t;
    };
    const progressOf = () => {
      const r = el.getBoundingClientRect();
      const travel = r.height - innerHeight;
      return travel <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / travel));
    };
    const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
    const ease = (x: number) => 1 - (1 - x) ** 3;
    const setState = (n: HTMLElement, op: number, leaving: boolean) => {
      n.style.setProperty('--o', op.toFixed(3));
      n.style.setProperty('--o-inv', (1 - op).toFixed(3));
      n.style.setProperty('--dir', leaving ? '1' : '-1');
    };
    const drive = (n: HTMLElement, local: number, i: number, cnt: number, first: boolean, last: boolean) => {
      const tIn = first ? 1 : clamp01((local - i * STAGGER) / FADE);
      const tOut = last ? 1 : clamp01((1 - local - (cnt - 1 - i) * STAGGER) / FADE);
      setState(n, ease(Math.min(tIn, tOut)), tOut < 1);
    };
    const applyBeats = () => {
      bs.forEach((b) => {
        const span = b.to - b.from;
        const local = span > 0 ? (c.current - b.from) / span : 0;
        const inside = local >= 0 && local <= 1;
        const first = b.from <= 0; const last = b.to >= 1;
        const held = (local < 0 && first) || (local > 1 && last);
        b.el.style.setProperty('--local', clamp01(local).toFixed(3));
        if (!inside) [...b.parts, ...b.lines].forEach((n) => setState(n, held ? 1 : 0, local > 1));
        else {
          b.parts.forEach((n, i) => drive(n, local, i, b.parts.length, first, last));
          b.lines.forEach((n, i) => drive(n, local, i * 0.8, b.lines.length * 0.8, first, last));
        }
        const edge = inside ? Math.min(first ? 1 : clamp01(local / FADE), last ? 1 : clamp01((1 - local) / FADE)) : 0;
        b.el.classList.toggle('is-on', held || edge > 0.5);
        b.el.classList.toggle('is-leaving', inside && !last && 1 - local < FADE + STAGGER * 4);
      });
    };
    const glide = (span: number) => {
      const gap = progressOf() - c.current;
      let step = gap * LERP;
      if (span > 0) {
        const rest = Math.abs(gap) * span;
        const floor = CREEP / span;
        if (rest < EPS) step = gap;
        else if (Math.abs(step) < floor) step = Math.sign(gap) * Math.min(floor, Math.abs(gap));
      }
      c.current += step;
    };

    let raf = 0;
    const tick = () => {
      const out = c.video && !c.rolling ? (c.video.duration || 0) : 0;
      const span = Math.max(0, out);
      glide(span);
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.5 && r.bottom > innerHeight * 0.5) {
        applyBeats();
        el.style.setProperty('--t', clamp01(c.current).toFixed(4));
        if (span > 0) applyVideo(c.video, c.current * span);
      }
      raf = requestAnimationFrame(tick);
    };
    const run = new IntersectionObserver((es) => {
      const vis = es.some((e) => e.isIntersecting);
      if (vis && !raf) raf = requestAnimationFrame(tick);
      if (!vis && raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    run.observe(el);
    c.current = progressOf();
    applyBeats();

    return () => {
      alive = false; near.disconnect(); far.disconnect(); run.disconnect();
      cancelAnimationFrame(raf); detach();
    };
  }, [lang]);

  return (
    <section ref={ref} className="chapter" data-label="Crowned Women film" aria-label="Crowned Women and Family Community Services introduction" style={{ ['--beat-count' as string]: 5 }}>
      <div className="stage">
        <img className="plate" src={VIDEO_COVER} width={1920} height={1080} fetchPriority="high" decoding="async"
          alt="A woman in a winter coat opens the brass door of a brick community building in Mississauga at dusk, as women gather in the warm entrance hall inside." />
        <div className="veil" aria-hidden="true" />
        <div className="veil veil-light" aria-hidden="true" />
        {beats.map((b, i) => {
          const a = ACTS[i];
          const H = i === 0 ? 'h1' : 'h2';
          return (
            <div key={a.id} id={a.id} className={`beat${i === 0 ? ' first' : ''}`} data-from={(a.from / D).toFixed(4)} data-to={(a.to / D).toFixed(4)}
              data-pos="left" data-depth="soft" data-tone={a.tone} data-motion={a.motion}>
              <p className="stamp">{b.stamp}</p>
              <H data-split="lines">
                {b.lines.map((l) => <span key={l} className="line"><span className="line-in" dangerouslySetInnerHTML={{ __html: fmt(l) }} /></span>)}
              </H>
              {b.sub && <p className="sub">{b.sub}</p>}
              {b.points && <ul className="points">{b.points.map((p) => <li key={p}>{p}</li>)}</ul>}
              {b.cta && a.href && (
                <div className="cta flex flex-wrap gap-3">
                  <Link to={a.href} className="btn btn-gold">{b.cta} <i className="ri-arrow-right-line" /></Link>
                </div>
              )}
            </div>
          );
        })}
        <div className="scroll-cue" aria-hidden="true"><span className="mouse" />{o<string>('common.scroll')}</div>
      </div>
    </section>
  );
}