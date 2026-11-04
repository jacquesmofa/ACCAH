import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';

const STEPS = [1, 2, 3, 4, 5, 6];
const MEASURES = [1, 2, 3, 4, 5, 6, 7];

export default function ImpactPage() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.impact')} description={t('meta.impact')} metaKey="impact">
      <PageHero
        stamp={t('im.stamp')}
        title={t('im.h1')}
        sub={t('im.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20a%20community%20co-design%20workshop%20with%20diverse%20participants%20placing%20paper%20notes%20on%20a%20wall%2C%20warm%20golden%20side%20light%2C%20deep%20teal%20shadows%2C%20hands%20and%20notes%20in%20focus%2C%20editorial%20documentary%20style&width=2000&height=1125&seq=page-impact-hero-01&orientation=landscape"
        alt={t('im.alt')}
      >
        <Link className="cta" to="/work">{t('nav.work')} <i className="ri-arrow-right-line"></i></Link>
        <Link className="cta cta-ghost" to="/credentials-ark">{t('nav.ark')}</Link>
      </PageHero>

      <section className="band band-cream">
        <div className="band-inner grid-two">
          <div>
            <p className="eyebrow" data-reveal>{t('im.why.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('im.why.h')}</h2>
          </div>
          <div className="prose">
            <p data-reveal>{t('im.why.p')}</p>
          </div>
        </div>
      </section>

      <section className="band band-ink">
        <div className="band-inner">
          <div className="sec-head">
            <p className="eyebrow" data-reveal>{t('im.step.eyebrow')}</p>
            <h2 className="sec" data-reveal>{t('im.step.h')}</h2>
          </div>
          <div className="grid-auto">
            {STEPS.map((n) => (
              <article key={n} className="tile" data-reveal>
                <span className="tile-num">{String(n).padStart(2, '0')}</span>
                <h3>{t(`im.s${n}t`)}</h3>
                <p>{t(`im.s${n}p`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-light">
        <div className="band-inner grid-two">
          <div>
            <p className="eyebrow" data-reveal>{t('im.measure.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('im.measure.h')}</h2>
            <div className="link-row mt-7" data-reveal>
              <Link className="cta" to="/contact?reason=3">{t('nav.contact')} <i className="ri-arrow-right-line"></i></Link>
            </div>
          </div>
          <ul className="list-rows">
            {MEASURES.map((n) => (
              <li key={n} data-reveal>
                <span className="idx">{String(n).padStart(2, '0')}</span>
                <div><p className="!mt-0 !text-[15px]">{t(`im.m${n}`)}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}