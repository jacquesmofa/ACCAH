import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';

const AREAS = [
  {
    n: 1,
    src: 'https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20three%20professional%20women%20of%20African%20descent%20in%20a%20mentoring%20circle%20with%20notebooks%20and%20coffee%20in%20a%20bright%20modern%20room%2C%20warm%20golden%20daylight%2C%20deep%20teal%20accents%2C%20confident%20and%20supportive%20mood%2C%20editorial%20documentary%20style&width=1200&height=900&seq=page-work-women-01&orientation=landscape',
  },
  {
    n: 2,
    src: 'https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20a%20newcomer%20family%20being%20welcomed%20at%20a%20community%20service%20desk%2C%20a%20staff%20member%20handing%20over%20a%20folder%2C%20warm%20afternoon%20light%20through%20tall%20windows%2C%20deep%20teal%20and%20gold%20colour%20grade%2C%20calm%20hopeful%20atmosphere&width=1200&height=900&seq=page-work-newcomer-02&orientation=landscape',
  },
  {
    n: 3,
    src: 'https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20a%20teenage%20student%20and%20an%20adult%20mentor%20working%20through%20homework%20at%20a%20library%20table%2C%20warm%20window%20light%2C%20soft%20deep%20teal%20shadows%2C%20books%20and%20pencils%2C%20quiet%20focused%20atmosphere%2C%20documentary%20style&width=1200&height=900&seq=page-work-youth-03&orientation=landscape',
  },
  {
    n: 4,
    src: 'https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20an%20accessible%20community%20workshop%20with%20a%20ramp%2C%20wide%20doorways%20and%20a%20person%20using%20a%20wheelchair%20joining%20a%20group%20discussion%2C%20warm%20natural%20light%2C%20deep%20teal%20walls%2C%20inclusive%20and%20dignified%20composition&width=1200&height=900&seq=page-work-access-04&orientation=landscape',
  },
  {
    n: 5,
    src: 'https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20a%20neighbourhood%20community%20gathering%20in%20a%20courtyard%20with%20shared%20food%20and%20conversation%2C%20warm%20golden%20evening%20light%2C%20deep%20teal%20shadows%2C%20welcoming%20atmosphere%2C%20editorial%20documentary%20style&width=1200&height=900&seq=page-work-wellbeing-05&orientation=landscape',
  },
  {
    n: 6,
    src: 'https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20a%20bilingual%20community%20consultation%20with%20a%20facilitator%20at%20a%20flip%20chart%20and%20participants%20seated%20in%20a%20semicircle%2C%20warm%20golden%20evening%20light%2C%20deep%20teal%20shadows%2C%20engaged%20conversation%2C%20editorial%20documentary%20style&width=1200&height=900&seq=page-work-education-06&orientation=landscape',
  },
];

export default function WorkPage() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.work')} description={t('meta.work')} metaKey="work">
      <PageHero
        stamp={t('wk.stamp')}
        title={t('wk.h1')}
        sub={t('wk.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20a%20mother%20and%20daughter%20reading%20together%20beside%20a%20tall%20window%20at%20golden%20hour%2C%20warm%20honey%20light%2C%20deep%20teal%20shadowed%20interior%2C%20calm%20intimate%20mood%2C%20editorial%20documentary%20photography&width=2000&height=1125&seq=page-work-hero-01&orientation=landscape"
        alt={t('wk.alt')}
      >
        <Link className="cta" to="/credentials-ark">{t('nav.ark')} <i className="ri-arrow-right-line"></i></Link>
        <Link className="cta cta-ghost" to="/impact">{t('nav.impact')}</Link>
      </PageHero>

      <section className="band band-cream">
        <div className="band-inner">
          <div className="sec-head">
            <p className="eyebrow" data-reveal>{t('wk.areas.eyebrow')}</p>
            <h2 className="sec" data-reveal>{t('wk.areas.h')}</h2>
          </div>

          {AREAS.map((a) => (
            <article key={a.n} id={`area-${a.n}`} className="area-row scroll-mt-24">
              <div className="area-copy">
                <p className="eyebrow" data-reveal>{`0${a.n} — ${t('wk.areas.eyebrow')}`}</p>
                <h2 data-reveal>{t(`wk.a${a.n}t`)}</h2>
                <p className="m-0 leading-relaxed" data-reveal>{t(`wk.a${a.n}p`)}</p>
              </div>
              <figure className="media-frame m-0" data-reveal>
                <img width={1200} height={900} alt={t(`wk.a${a.n}t`)} title={t(`wk.a${a.n}t`)} src={a.src} loading="lazy" decoding="async" />
              </figure>
            </article>
          ))}
        </div>
      </section>

      <section className="band band-ink">
        <div className="band-inner grid-two items-center">
          <div>
            <h2 className="sec" data-reveal>{t('wk.cta.h')}</h2>
            <p className="lede mt-4" data-reveal>{t('wk.cta.p')}</p>
          </div>
          <div className="link-row" data-reveal>
            <Link className="cta" to="/impact">{t('nav.impact')} <i className="ri-arrow-right-line"></i></Link>
            <Link className="cta cta-ghost" to="/get-involved">{t('nav.involved')}</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}