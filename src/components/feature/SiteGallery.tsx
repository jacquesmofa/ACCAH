import { useCallback, useEffect, useRef, useState } from 'react';
import gallery from '../../content/gallery.json';

/*
 * Photo gallery: albums come from src/content/gallery.json.
 * Each album: { slug, title, description, alt, photos: [{ src, alt? }] }.
 * The look (colours, layout) is set once in the `theme` below so the
 * gallery matches this site. Full-screen viewer: arrows, swipe, Escape.
 */
type Photo = { src: string; alt?: string };
type Album = { slug: string; title: string; description: string; alt: string; photos: Photo[]; title_fr?: string; description_fr?: string; alt_fr?: string };
export type GalleryTheme = {
  layout: 'masonry' | 'grid' | 'editorial' | 'strip';
  ink: string; // text colour
  muted: string; // secondary text colour
  accent: string; // active tab / counter colour
  accentInk: string; // text on accent
  tabBg: string; // inactive tab background
  radius: string; // e.g. '1rem' or '0'
  headingClass?: string; // font class for album titles
};

const albums = (gallery as { albums: Album[] }).albums;

/** Ask Cloudinary for the right size; other picture links are used as they are. */
export const sized = (url: string, w: number) =>
  url.includes('res.cloudinary.com') && url.includes('/upload/') && !/\/upload\/[a-z]_/.test(url)
    ? url.replace('/upload/', `/upload/c_limit,w_${w},q_auto,f_auto/`)
    : url;

export const galleryAlbums = albums;

const LABELS = {
  en: { photos: 'photos', open: 'Open photo', of: 'of', close: 'Close', prev: 'Previous photo', next: 'Next photo', albums: 'Albums', photo: 'photo' },
  fr: { photos: 'photos', open: 'Ouvrir la photo', of: 'sur', close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', albums: 'Albums', photo: 'photo' },
};

export default function SiteGallery({ theme, note, lang = 'en' }: { theme: GalleryTheme; note?: string; lang?: 'en' | 'fr' }) {
  const L = LABELS[lang];
  const tr = (a: Album, k: 'title' | 'description' | 'alt') => (lang === 'fr' && a[`${k}_fr` as const]) || a[k];
  const [albumIndex, setAlbumIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const album = albums[albumIndex];
  const total = album.photos.length;
  const alt = (i: number) => album.photos[i].alt || `${tr(album, 'alt')}, ${L.photo} ${i + 1}`;

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % total)), [total]);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + total) % total)), [total]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, next, prev]);

  const touchX = useRef<number | null>(null);
  const r = { borderRadius: theme.radius };

  const tile = (p: Photo, i: number, cls: string, w = 640) => (
    <button
      key={p.src + i}
      type="button"
      onClick={() => setOpen(i)}
      className={`group block w-full overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-4 ${cls}`}
      style={{ ...r, ['--tw-ring-color' as string]: theme.accent }}
      aria-label={`${L.open} ${i + 1} ${L.of} ${total}`}
    >
      <img
        src={sized(p.src, w)}
        alt={alt(i)}
        loading={i < 6 ? 'eager' : 'lazy'}
        className={`w-full transition duration-500 group-hover:scale-[1.04] ${theme.layout === 'masonry' ? 'h-auto' : 'h-full object-cover'}`}
      />
    </button>
  );

  return (
    <div>
      {albums.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label={L.albums}>
          {albums.map((a, i) => (
            <button
              key={a.slug}
              role="tab"
              aria-selected={i === albumIndex}
              onClick={() => { setAlbumIndex(i); setOpen(null); }}
              className="px-5 py-2 text-sm font-semibold transition cursor-pointer max-w-full"
              style={
                i === albumIndex
                  ? { background: theme.accent, color: theme.accentInk, borderRadius: '999px' }
                  : { background: theme.tabBg, color: theme.ink, borderRadius: '999px' }
              }
            >
              {tr(a, 'title')} <span style={{ opacity: 0.6 }}>· {a.photos.length}</span>
            </button>
          ))}
        </div>
      )}

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className={`text-3xl md:text-4xl font-bold ${theme.headingClass || ''}`} style={{ color: theme.ink }}>{tr(album, 'title')}</h2>
        <p className="mt-3 text-lg" style={{ color: theme.muted }}>{tr(album, 'description')}</p>
        <p className="mt-2 text-sm uppercase tracking-widest font-semibold" style={{ color: theme.accent }}>{total} {L.photos}</p>
      </div>

      {theme.layout === 'masonry' && (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {album.photos.map((p, i) => tile(p, i, 'mb-3 md:mb-4 break-inside-avoid'))}
        </div>
      )}
      {theme.layout === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {album.photos.map((p, i) => tile(p, i, 'aspect-square'))}
        </div>
      )}
      {theme.layout === 'editorial' && (
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-3 md:gap-4">
          {album.photos.map((p, i) => tile(p, i, i % 7 === 0 ? 'col-span-2 row-span-2' : i % 7 === 4 ? 'col-span-2' : '', i % 7 === 0 ? 1100 : 640))}
        </div>
      )}
      {theme.layout === 'strip' && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4">
          {album.photos.map((p, i) =>
            tile(p, i, `${i % 5 < 2 ? 'md:col-span-3 aspect-[3/2]' : 'md:col-span-2 aspect-[4/3]'}`, i % 5 < 2 ? 1000 : 700)
          )}
        </div>
      )}

      {note && <p className="mt-8 text-center text-sm" style={{ color: theme.muted }}>{note}</p>}

      {open !== null && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{ background: 'rgba(8,8,10,0.94)' }}
          role="dialog"
          aria-modal="true"
          aria-label={`${tr(album, 'title')}, ${L.photo} ${open + 1} ${L.of} ${total}`}
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
            touchX.current = null;
          }}
        >
          <img
            src={sized(album.photos[open].src, 1800)}
            alt={alt(open)}
            className="max-h-[86vh] max-w-[94vw] object-contain shadow-2xl"
            style={{ borderRadius: '6px' }}
            onClick={(e) => e.stopPropagation()}
          />
          {[
            { label: L.close, icon: '✕', cls: 'top-4 right-4', fn: close },
            { label: L.prev, icon: '‹', cls: 'left-2 md:left-6 top-1/2 -translate-y-1/2', fn: prev },
            { label: L.next, icon: '›', cls: 'right-2 md:right-6 top-1/2 -translate-y-1/2', fn: next },
          ].map((b) => (
            <button
              key={b.label}
              onClick={(e) => { e.stopPropagation(); b.fn(); }}
              className={`absolute ${b.cls} w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl leading-none flex items-center justify-center cursor-pointer`}
              aria-label={b.label}
            >
              {b.icon}
            </button>
          ))}
          <p className="absolute bottom-5 left-0 right-0 text-center text-sm tracking-widest text-white/80">
            {open + 1} / {total}
          </p>
          <link rel="preload" as="image" href={sized(album.photos[(open + 1) % total].src, 1800)} />
        </div>
      )}
    </div>
  );
}
