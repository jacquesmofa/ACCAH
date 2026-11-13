import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';
import SiteGallery from '@/components/feature/SiteGallery';
import gallery from '@/content/gallery.json';

// Gallery: albums in src/content/gallery.json, editorial grid in the Ark's teal + honey palette.
export default function GalleryPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  return (
    <PageShell title={t('seo.gallery')} description={t('meta.gallery')} metaKey="gallery">
      <PageHero stamp={t('gl.stamp')} title={t('gl.h1')} sub={t('gl.sub')} image={gallery.albums[1].photos[0].src} alt={t('gl.alt')} />
      <section className="band band-light">
        <div className="band-inner">
          <SiteGallery
            lang={lang}
            note={t('gl.note')}
            theme={{ layout: 'editorial', ink: 'oklch(var(--foreground-950))', muted: 'oklch(var(--foreground-700))', accent: 'oklch(var(--primary-800))', accentInk: 'oklch(var(--background-50))', tabBg: 'oklch(var(--background-200))', radius: '2px' }}
          />
        </div>
      </section>
    </PageShell>
  );
}
