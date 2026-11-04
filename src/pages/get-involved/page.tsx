import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';
import ArkForm from '@/components/feature/ArkForm';

export default function InvolvedPage() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.involved')} description={t('meta.involved')} metaKey="involved">
      <PageHero
        stamp={t('iv.stamp')}
        title={t('iv.h1')}
        sub={t('iv.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20volunteers%20setting%20up%20chairs%20and%20tables%20in%20a%20glowing%20community%20hall%20before%20an%20evening%20gathering%2C%20warm%20golden%20lamp%20light%2C%20deep%20teal%20shadows%2C%20welcoming%20atmosphere%2C%20editorial%20documentary%20style&width=2000&height=1125&seq=page-involved-hero-01&orientation=landscape"
        alt={t('iv.alt')}
      />

      <section className="band band-light">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('iv.vol.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('iv.vol.h')}</h2>
            <p className="lede mt-4" data-reveal>{t('iv.vol.p')}</p>
          </div>
          <div data-reveal>
            <ArkForm variant="volunteer" />
          </div>
        </div>
      </section>

      <section id="experience-form" className="band band-cream scroll-mt-24">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('iv.exp.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('iv.exp.h')}</h2>
            <p className="lede mt-4" data-reveal>{t('iv.exp.p')}</p>
          </div>
          <div data-reveal>
            <ArkForm variant="experience" />
          </div>
        </div>
      </section>

      <section className="band band-light">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('iv.amb.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('iv.amb.h')}</h2>
            <p className="lede mt-4" data-reveal>{t('iv.amb.p')}</p>
          </div>
          <div data-reveal>
            <ArkForm variant="ambassador" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}