import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import food from '@/content/food-security.json';

const pad = (n: number) => String(n).padStart(2, '0');
const cld = (url: string, w: number, h: number) => url.replace('/image/upload/', `/image/upload/f_auto,q_auto,c_fill,g_auto,w_${w},h_${h}/`);

/** Food security for funders and partners. Photos are optional (src/content/food-security.json): the section is complete without them. */
export default function FoodSecurity() {
  const { t } = useTranslation();
  const photos = food.photos.filter(Boolean);
  const email = t('site.email');
  return (
    <section className="band band-ink" aria-labelledby="food-title" id="food-security">
      <div className="band-inner">
        <div className="sec-head">
          <p className="eyebrow" data-reveal>{t('hm.food.eyebrow')}</p>
          <h2 id="food-title" className="sec" data-reveal dangerouslySetInnerHTML={{ __html: t('hm.food.h') }} />
          <p className="lede" data-reveal>{t('hm.food.p')}</p>
        </div>

        {photos.length > 0 && (
          <div className="food-photos" data-reveal>
            {photos.slice(0, 4).map((p, i) => (
              <img key={p} src={cld(p, i === 0 ? 1200 : 600, i === 0 ? 900 : 600)} alt={t('hm.food.alt')} loading="lazy" decoding="async" />
            ))}
          </div>
        )}

        <div className="grid-auto mt-8">
          {[1, 2, 3, 4].map((n) => (
            <article key={n} className="tile" data-reveal>
              <span className="tile-num">{pad(n)}</span>
              <h3>{t(`hm.food.s${n}t`)}</h3>
              <p>{t(`hm.food.s${n}p`)}</p>
            </article>
          ))}
        </div>

        <div className="grid-two mt-10">
          <div data-reveal>
            <h3 className="food-h3">{t('hm.food.fundH')}</h3>
            <ul className="food-ul">{[1, 2, 3, 4].map((n) => <li key={n}><i className="ri-anchor-line" aria-hidden="true"></i>{t(`hm.food.f${n}`)}</li>)}</ul>
          </div>
          <div className="food-panel" data-reveal>
            <h3 className="food-h3">{t('hm.food.giveH')}</h3>
            <ul className="food-ul">{[1, 2, 3, 4].map((n) => <li key={n}><i className="ri-checkbox-circle-line" aria-hidden="true"></i>{t(`hm.food.g${n}`)}</li>)}</ul>
            <div className="link-row mt-6">
              <Link className="cta" to="/partners">{t('hm.food.cta')} <i className="ri-arrow-right-line"></i></Link>
              <a className="cta-outline" href={`mailto:${email}?subject=${encodeURIComponent(t('hm.food.subject'))}`}>{t('hm.food.cta2')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
