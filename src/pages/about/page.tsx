import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';

const MANDATE = [1, 2, 3, 4, 5, 6];
const VALUES = [1, 2, 3, 4, 5, 6, 7];

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.about')} description={t('meta.about')} metaKey="about">
      <PageHero
        stamp={t('ab.stamp')}
        title={t('ab.h1')}
        sub={t('ab.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20a%20diverse%20group%20of%20African%20and%20Canadian%20community%20members%20gathered%20in%20a%20sunlit%20hall%20listening%20to%20a%20speaker%2C%20warm%20golden%20window%20light%2C%20deep%20teal%20shadows%20in%20the%20left%20third%2C%20editorial%20documentary%20style%2C%20calm%20and%20dignified%20atmosphere&width=2000&height=1125&seq=page-about-hero-01&orientation=landscape"
        alt={t('ab.alt')}
      >
        <Link className="cta" to="/work">{t('nav.work')} <i className="ri-arrow-right-line"></i></Link>
        <Link className="cta cta-ghost" to="/contact">{t('nav.contact')}</Link>
      </PageHero>

      <section className="band band-cream">
        <div className="band-inner grid-two">
          <div>
            <p className="eyebrow" data-reveal>{t('ab.who.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('ab.who.h')}</h2>
            <div className="prose mt-5">
              <p data-reveal>{t('ab.who.p1')}</p>
              <p data-reveal>{t('ab.who.p2')}</p>
              <p data-reveal>{t('ab.who.p3')}</p>
              <p data-reveal>{t('ab.who.p4')}</p>
            </div>
          </div>
          <figure className="media-frame m-0" data-reveal>
            <img width={1200} height={900} alt={t('ab.alt')} title="Ark of Hope community" loading="lazy" decoding="async"
              src="https://readdy.ai/api/search-image?query=Candid%20cinematic%20photograph%20of%20two%20women%20of%20African%20descent%20in%20conversation%20at%20a%20community%20table%20with%20notebooks%20and%20tea%2C%20warm%20side%20light%2C%20deep%20teal%20wall%20behind%2C%20soft%20focus%20background%2C%20human%20and%20approachable%20documentary%20style&width=1200&height=900&seq=page-about-portrait-02&orientation=landscape" />
            <figcaption className="media-quote">{t('brand.full')}</figcaption>
          </figure>
        </div>
      </section>

      <section className="band band-light">
        <div className="band-inner">
          <div className="grid-auto">
            <article className="tile" data-reveal>
              <span className="tile-num">01</span>
              <h2 className="text-2xl font-semibold m-0">{t('ab.mission.h')}</h2>
              <p>{t('ab.mission.p')}</p>
            </article>
            <article className="tile" data-reveal>
              <span className="tile-num">02</span>
              <h2 className="text-2xl font-semibold m-0">{t('ab.vision.h')}</h2>
              <p>{t('ab.vision.p')}</p>
            </article>
          </div>

          <div className="sec-head mt-16">
            <p className="eyebrow" data-reveal>{t('ab.mandate.eyebrow')}</p>
            <h2 className="sec" data-reveal>{t('ab.mandate.h')}</h2>
          </div>
          <ul className="list-rows">
            {MANDATE.map((n) => (
              <li key={n} data-reveal>
                <span className="idx">{String(n).padStart(2, '0')}</span>
                <div>
                  <h3>{t(`ab.m${n}t`)}</h3>
                  <p>{t(`ab.m${n}p`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-cream">
        <div className="band-inner">
          <div className="sec-head">
            <p className="eyebrow" data-reveal>{t('ab.values.eyebrow')}</p>
            <h2 className="sec" data-reveal>{t('ab.values.h')}</h2>
          </div>
          <div className="grid-auto">
            {VALUES.map((n) => (
              <article key={n} className="tile" data-reveal>
                <span className="tile-num">{String(n).padStart(2, '0')}</span>
                <h3>{t(`ab.v${n}t`)}</h3>
                <p>{t(`ab.v${n}p`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-ink">
        <div className="band-inner grid-two items-center">
          <div>
            <p className="eyebrow" data-reveal>{t('ab.bi.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('ab.bi.h')}</h2>
            <p className="lede mt-4" data-reveal>{t('ab.bi.p')}</p>
            <div className="link-row mt-6" data-reveal>
              <Link className="cta" to="/contact">{t('pg.email')} <i className="ri-arrow-right-line"></i></Link>
              <Link className="cta cta-ghost" to="/accessibility">{t('ft.access')}</Link>
            </div>
          </div>
          <div className="tile !border-foreground-50/20" data-reveal>
            <p className="eyebrow m-0">{t('ab.lead.eyebrow')}</p>
            <h3>{t('ab.lead.h')}</h3>
            <p className="italic">{t('ab.lead.p')}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}