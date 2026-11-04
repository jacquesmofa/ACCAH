import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';
import ArkForm from '@/components/feature/ArkForm';

const WAYS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function PartnersPage() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.partners')} description={t('meta.partners')} metaKey="partners">
      <PageHero
        stamp={t('pt.stamp')}
        title={t('pt.h1')}
        sub={t('pt.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20a%20cross-sector%20working%20session%20with%20diverse%20professionals%20around%20a%20long%20table%20covered%20in%20documents%20and%20coffee%20cups%2C%20warm%20golden%20light%20through%20large%20windows%2C%20deep%20teal%20shadows%2C%20collaborative%20focused%20atmosphere%2C%20editorial%20style&width=2000&height=1125&seq=page-partners-hero-01&orientation=landscape"
        alt={t('pt.alt')}
      >
        <a className="cta" href="#partner-form">{t('pt.cta')} <i className="ri-arrow-down-line"></i></a>
        <Link className="cta cta-ghost" to="/credentials-ark">{t('nav.ark')}</Link>
      </PageHero>

      <section className="band band-cream">
        <div className="band-inner grid-two">
          <div>
            <p className="eyebrow" data-reveal>{t('pt.phil.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('pt.phil.h')}</h2>
          </div>
          <div className="prose">
            <p data-reveal>{t('pt.phil.p1')}</p>
            <p data-reveal>{t('pt.phil.p2')}</p>
          </div>
        </div>
      </section>

      <section className="band band-light">
        <div className="band-inner">
          <div className="sec-head">
            <p className="eyebrow" data-reveal>{t('pt.ways.eyebrow')}</p>
            <h2 className="sec" data-reveal>{t('pt.ways.h')}</h2>
          </div>
          <div className="grid-auto">
            {WAYS.map((n) => (
              <article key={n} className="tile" data-reveal>
                <span className="tile-num">{String(n).padStart(2, '0')}</span>
                <p>{t(`pt.w${n}`)}</p>
              </article>
            ))}
          </div>
          <p className="notice mt-8" data-reveal>{t('pt.logos')}</p>
        </div>
      </section>

      <section id="partner-form" className="band band-cream scroll-mt-24">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('pt.form.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('pt.form.h')}</h2>
            <p className="lede mt-4" data-reveal>{t('pt.form.p')}</p>
            <p className="notice mt-6" data-reveal>{t('ar.note')}</p>
          </div>
          <div data-reveal>
            <ArkForm variant="partner" />
          </div>
        </div>
      </section>

      <section className="band band-ink !py-14">
        <div className="band-inner flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
          <p className="m-0 max-w-[56ch] text-sm text-foreground-300" data-reveal>{t('pt.phil.p1')}</p>
          <div className="link-row !mt-0" data-reveal>
            <Link className="cta" to="/contact?reason=2">{t('nav.contact')} <i className="ri-arrow-right-line"></i></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}