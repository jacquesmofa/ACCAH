import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';

const ACTIVITIES = [1, 2, 3, 4, 5, 6, 7];

export default function ArkPage() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.ark')} description={t('meta.ark')} metaKey="ark">
      <PageHero
        stamp={t('ar.stamp')}
        tag={t('ar.badge')}
        title={t('ar.h1')}
        sub={t('ar.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20a%20confident%20internationally%20trained%20African%20woman%20professional%20holding%20a%20diploma%20folder%20in%20a%20modern%20office%20at%20dusk%2C%20warm%20amber%20desk%20lamp%20glow%2C%20deep%20teal%20shadows%20filling%20the%20left%20half%2C%20quiet%20dignified%20mood%2C%20editorial%20style&width=2000&height=1125&seq=page-ark-hero-01&orientation=landscape"
        alt={t('ar.alt')}
      >
        <Link className="cta" to="/get-involved#experience-form">{t('ar.cta1')} <i className="ri-arrow-right-line"></i></Link>
        <Link className="cta cta-ghost" to="/partners#partner-form">{t('ar.cta2')}</Link>
      </PageHero>

      <section className="band band-cream">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('ar.ch.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('ar.ch.h')}</h2>
            <p className="lede mt-5" data-reveal>{t('ar.ch.p')}</p>
          </div>
          <figure className="media-frame m-0" data-reveal>
            <img width={1200} height={900} alt={t('ar.alt')} title={t('ar.h1')} loading="lazy" decoding="async"
              src="https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20an%20African%20woman%20professional%20reviewing%20credential%20documents%20and%20a%20laptop%20at%20a%20warm%20lit%20desk%20in%20the%20evening%2C%20teal%20wall%20behind%2C%20gold%20lamp%2C%20determined%20quiet%20expression%2C%20editorial%20documentary%20style&width=1200&height=900&seq=page-ark-challenge-02&orientation=landscape" />
          </figure>
        </div>
      </section>

      <section className="band band-light">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('ar.res.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('ar.res.h')}</h2>
            <p className="lede mt-5" data-reveal>{t('ar.res.p')}</p>
            <p className="notice mt-6" data-reveal>{t('ar.note')}</p>
          </div>
          <figure className="media-frame m-0" data-reveal>
            <img width={1200} height={900} alt={t('ar.alt2')} title={t('ar.a2')} loading="lazy" decoding="async"
              src="https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20a%20bilingual%20advisory%20circle%20of%20African%20and%20Canadian%20women%20around%20a%20wooden%20table%20reviewing%20printed%20documents%2C%20warm%20golden%20window%20light%2C%20deep%20teal%20shadows%2C%20attentive%20listening%2C%20editorial%20documentary%20photography&width=1200&height=900&seq=page-ark-circle-02&orientation=landscape" />
            <figcaption className="media-quote">{t('ar.a2')}</figcaption>
          </figure>
        </div>
      </section>

      <section className="band band-cream">
        <div className="band-inner">
          <div className="sec-head">
            <p className="eyebrow" data-reveal>{t('ar.act.eyebrow')}</p>
            <h2 className="sec" data-reveal>{t('ar.act.h')}</h2>
          </div>
          <ul className="list-rows">
            {ACTIVITIES.map((n) => (
              <li key={n} data-reveal>
                <span className="idx">{String(n).padStart(2, '0')}</span>
                <div><p className="!mt-0 !text-[15.5px]">{t(`ar.a${n}`)}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-ink">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('ar.out.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('ar.out.h')}</h2>
          </div>
          <div>
            <p className="lede" data-reveal>{t('ar.out.p')}</p>
            <div className="link-row mt-7" data-reveal>
              <Link className="cta" to="/get-involved#experience-form">{t('ar.cta1')} <i className="ri-arrow-right-line"></i></Link>
              <Link className="cta cta-ghost" to="/partners#partner-form">{t('ar.cta2')}</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}