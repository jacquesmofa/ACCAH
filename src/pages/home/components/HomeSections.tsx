import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const pad = (n: number) => String(n).padStart(2, '0');

const FOCUS = [
  { icon: 'ri-user-heart-line', anchor: 'area-1' },
  { icon: 'ri-earth-line', anchor: 'area-2' },
  { icon: 'ri-parent-line', anchor: 'area-3' },
  { icon: 'ri-wheelchair-line', anchor: 'area-4' },
  { icon: 'ri-translate-2', anchor: 'area-5' },
];

export function FocusGrid() {
  const { t } = useTranslation();
  return (
    <section className="band band-light" aria-labelledby="focus-title">
      <div className="band-inner">
        <div className="sec-head">
          <p className="eyebrow" data-reveal>{t('hm.focus.eyebrow')}</p>
          <h2 id="focus-title" className="sec" data-reveal dangerouslySetInnerHTML={{ __html: t('hm.focus.h') }} />
          <p className="lede" data-reveal>{t('hm.focus.p')}</p>
        </div>
        <div className="grid-auto">
          {FOCUS.map((f, i) => (
            <article key={f.icon} className="tile" data-reveal>
              <span className="tile-icon"><i className={f.icon}></i></span>
              <span className="tile-num">{pad(i + 1)}</span>
              <h3>{t(`focus.${i + 1}t`)}</h3>
              <p>{t(`focus.${i + 1}p`)}</p>
              <Link className="tile-link" to={`/work#${f.anchor}`}>
                {t('hm.focus.link')} <i className="ri-arrow-right-line"></i>
              </Link>
            </article>
          ))}
        </div>
        <div className="link-row mt-8" data-reveal>
          <Link className="cta" to="/work">{t('hm.focus.cta')} <i className="ri-arrow-right-line"></i></Link>
        </div>
      </div>
    </section>
  );
}

export function AboutIntro() {
  const { t } = useTranslation();
  return (
    <section className="band band-cream" aria-labelledby="about-intro-title">
      <div className="band-inner grid-two">
        <div>
          <p className="eyebrow" data-reveal>{t('hm.about.eyebrow')}</p>
          <h2 id="about-intro-title" className="sec mt-3" data-reveal dangerouslySetInnerHTML={{ __html: t('hm.about.h') }} />
          <p className="lede mt-4" data-reveal>{t('hm.about.p1')}</p>
          <p className="lede mt-3" data-reveal>{t('hm.about.p2')}</p>
          <div className="link-row mt-6" data-reveal>
            <Link className="cta" to="/about">{t('hm.about.link')} <i className="ri-arrow-right-line"></i></Link>
            <Link className="cta-outline" to="/work">{t('hm.about.link2')}</Link>
          </div>
        </div>
        <figure className="media-frame m-0" data-reveal>
          <img width={1200} height={900} alt={t('hm.about.alt')} title="African and Canadian Community Ark of Hope" loading="lazy" decoding="async"
            src="https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20women%20of%20different%20ages%20and%20backgrounds%20seated%20around%20a%20wooden%20table%20in%20a%20bright%20sunlit%20community%20hall%2C%20notebooks%20and%20tea%20cups%2C%20warm%20golden%20window%20light%2C%20deep%20teal%20walls%2C%20dignified%20editorial%20documentary%20style%2C%20calm%20and%20welcoming%20atmosphere&width=1200&height=900&seq=home-about-02&orientation=landscape" />
          <figcaption className="media-quote">{t('hm.about.cap')}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function ApproachPath() {
  const { t } = useTranslation();
  const steps = [1, 2, 3, 4, 5, 6];
  return (
    <section className="band band-cream" aria-labelledby="approach-title">
      <div className="band-inner grid-two items-start">
        <div>
          <p className="eyebrow" data-reveal>{t('hm.step.eyebrow')}</p>
          <h2 id="approach-title" className="sec mt-3" data-reveal dangerouslySetInnerHTML={{ __html: t('hm.step.h') }} />
          <p className="lede mt-4" data-reveal>{t('hm.step.p')}</p>
          <div className="link-row mt-6" data-reveal>
            <Link className="cta" to="/impact">{t('hm.step.link')} <i className="ri-arrow-right-line"></i></Link>
          </div>
        </div>
        <ol className="list-rows m-0 p-0 list-none">
          {steps.map((n) => (
            <li key={n} data-reveal>
              <span className="idx">{pad(n)}</span>
              <div>
                <h3>{t(`im.s${n}t`)}</h3>
                <p>{t(`im.s${n}p`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TakePart() {
  const { t } = useTranslation();
  const ways = [
    { icon: 'ri-hand-heart-line', to: '/get-involved', key: 'c1' },
    { icon: 'ri-links-line', to: '/partners', key: 'c2' },
    { icon: 'ri-chat-voice-line', to: '/get-involved#experience-form', key: 'c3' },
    { icon: 'ri-shake-hands-line', to: '/donate', key: 'c4' },
  ];
  return (
    <section className="band band-light" aria-labelledby="take-part-title">
      <div className="band-inner">
        <div className="sec-head">
          <p className="eyebrow" data-reveal>{t('hm.part.eyebrow')}</p>
          <h2 id="take-part-title" className="sec" data-reveal dangerouslySetInnerHTML={{ __html: t('hm.part.h') }} />
          <p className="lede" data-reveal>{t('hm.part.p')}</p>
        </div>
        <div className="grid-auto">
          {ways.map((w) => (
            <article key={w.key} className="tile" data-reveal>
              <span className="tile-icon"><i className={w.icon}></i></span>
              <h3>{t(`hm.part.${w.key}t`)}</h3>
              <p>{t(`hm.part.${w.key}p`)}</p>
              <Link className="tile-link" to={w.to}>{t(`hm.part.${w.key}l`)} <i className="ri-arrow-right-line"></i></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsTeaser() {
  const { t } = useTranslation();
  return (
    <section className="band band-cream" aria-labelledby="news-teaser-title">
      <div className="band-inner grid-two items-center">
        <div>
          <p className="eyebrow" data-reveal>{t('hm.news.eyebrow')}</p>
          <h2 id="news-teaser-title" className="sec mt-3" data-reveal dangerouslySetInnerHTML={{ __html: t('hm.news.h') }} />
          <p className="lede mt-4" data-reveal>{t('hm.news.p')}</p>
        </div>
        <div data-reveal>
          <p className="notice m-0">{t('hm.news.note')}</p>
          <div className="link-row mt-6">
            <Link className="cta" to="/news">{t('hm.news.cta')} <i className="ri-arrow-right-line"></i></Link>
            <Link className="cta-outline" to="/contact">{t('hm.news.cta2')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ChangePanel() {
  const { t } = useTranslation();
  return (
    <section className="band band-ink" aria-labelledby="change-title">
      <div className="band-inner grid-two items-start">
        <div>
          <p className="eyebrow" data-reveal>{t('hm.change.eyebrow')}</p>
          <h2 id="change-title" className="sec mt-3" data-reveal dangerouslySetInnerHTML={{ __html: t('hm.change.h') }} />
        </div>
        <div>
          <p className="lede" data-reveal>{t('hm.change.p1')}</p>
          <p className="mt-5 text-base md:text-lg leading-[1.7] text-primary-300 max-w-[46ch]" data-reveal>{t('hm.change.p2')}</p>
          <div className="link-row mt-6" data-reveal>
            <Link className="cta" to="/impact">{t('hm.change.cta')} <i className="ri-arrow-right-line"></i></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArkTeaser() {
  const { t } = useTranslation();
  return (
    <section className="band band-cream" aria-labelledby="ark-teaser-title">
      <div className="band-inner grid-two">
        <div>
          <p className="eyebrow" data-reveal>{t('hm.ark.eyebrow')}</p>
          <h2 id="ark-teaser-title" className="sec mt-3" data-reveal dangerouslySetInnerHTML={{ __html: t('hm.ark.h') }} />
          <p className="lede mt-4" data-reveal>{t('hm.ark.p')}</p>
          <div className="link-row mt-6" data-reveal>
            <Link className="cta" to="/credentials-ark">{t('hm.ark.cta')} <i className="ri-arrow-right-line"></i></Link>
          </div>
          <p className="notice mt-6" data-reveal>{t('hm.ark.tag')}</p>
        </div>
        <figure className="media-frame m-0" data-reveal>
          <img width={1200} height={900} alt={t('ar.alt2')} title="The Credentials ARK" loading="lazy" decoding="async"
            src="https://readdy.ai/api/search-image?query=Cinematic%20photograph%20of%20a%20bilingual%20advisory%20circle%20of%20African%20and%20Canadian%20women%20around%20a%20wooden%20table%20reviewing%20documents%2C%20warm%20golden%20window%20light%2C%20deep%20teal%20shadows%2C%20calm%20editorial%20composition%2C%20community%20hall%20setting&width=1200&height=900&seq=home-ark-01&orientation=landscape" />
          <figcaption className="media-quote">{t('ar.a2')}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function ClosingCta() {
  const { t } = useTranslation();
  return (
    <section className="panel" data-side="bottom" id="join">
      <img className="panel-bg" data-parallax="0.32" width={2400} height={1350} loading="lazy" decoding="async"
        alt="A lit community hall beside still water at blue hour" title="Join Ark of Hope"
        src="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20a%20small%20wooden%20community%20hall%20with%20warm%20glowing%20windows%20beside%20a%20calm%20lake%20at%20blue%20hour%2C%20building%20in%20the%20upper%20half%20of%20the%20frame%2C%20lower%20third%20dark%20still%20water%20and%20shadow%2C%20deep%20teal%20sky%2C%20honey%20gold%20reflections&width=2400&height=1350&seq=ark-involve-05&orientation=landscape" />
      <div className="panel-veil"></div>
      <div className="panel-copy" data-parallax="-0.08">
        <p className="stamp" data-reveal>{t('hm.close.eyebrow')}</p>
        <h2 data-reveal dangerouslySetInnerHTML={{ __html: t('hm.close.h') }} />
        <p className="sub" data-reveal>{t('hm.close.p')}</p>
        <div className="flex flex-wrap gap-3 justify-center" data-reveal>
          <Link className="cta" to="/partners">{t('hm.close.b1')} <i className="ri-arrow-right-line"></i></Link>
          <Link className="cta cta-ghost" to="/get-involved">{t('hm.close.b2')}</Link>
          <Link className="cta cta-ghost" to="/donate">{t('hm.close.b3')}</Link>
        </div>
      </div>
    </section>
  );
}