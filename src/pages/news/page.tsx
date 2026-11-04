import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';

const FILTERS = [1, 2, 3, 4, 5, 6, 7];

export default function NewsPage() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  return (
    <PageShell title={t('seo.news')} description={t('meta.news')} metaKey="news">
      <PageHero
        stamp={t('nw.stamp')}
        title={t('nw.h1')}
        sub={t('nw.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20hands%20arranging%20printed%20bilingual%20resources%20and%20booklets%20on%20a%20wooden%20community%20table%2C%20warm%20golden%20afternoon%20light%2C%20deep%20teal%20shadows%2C%20editorial%20still%20life%20with%20human%20presence&width=2000&height=1125&seq=page-news-hero-01&orientation=landscape"
        alt={t('nw.alt')}
      />

      <section className="band band-light">
        <div className="band-inner">
          <div className="filter-bar mb-9" role="group" aria-label={t('nw.stamp')} data-reveal>
            <button type="button" className="filter-btn" data-active={active === 0} aria-pressed={active === 0}
              onClick={() => setActive(0)}>{t('nw.stamp')}</button>
            {FILTERS.map((n) => (
              <button key={n} type="button" className="filter-btn" data-active={active === n} aria-pressed={active === n}
                onClick={() => setActive(n)}>{t(`nw.filter.${n}`)}</button>
            ))}
          </div>

          <div className="empty-block min-h-[180px] items-center justify-center text-center" aria-live="polite">
            <div>
              <i className="ri-article-line text-3xl block mb-3 mx-auto opacity-70"></i>
              <p className="m-0 text-base">{t('nw.empty')}</p>
              <p className="m-0 mt-2 text-sm opacity-80">{t('nw.note')}</p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}