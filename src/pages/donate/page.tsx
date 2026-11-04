import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';
import ArkForm from '@/components/feature/ArkForm';

const OPTIONS = [1, 2, 3, 4, 5];

// TODO: connect donation processor

export default function DonatePage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(1);
  const preset = t(`dn.o${selected}`);

  return (
    <PageShell title={t('seo.donate')} description={t('meta.donate')} metaKey="donate">
      <PageHero
        stamp={t('dn.stamp')}
        title={t('dn.h1')}
        sub={t('dn.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20warm%20golden%20light%20falling%20across%20empty%20wooden%20chairs%20in%20a%20quiet%20community%20hall%20at%20dusk%2C%20soft%20dust%20in%20the%20air%2C%20deep%20teal%20shadows%20in%20the%20corners%2C%20hopeful%20contemplative%20mood%2C%20editorial%20photography&width=2000&height=1125&seq=page-donate-hero-01&orientation=landscape"
        alt={t('dn.alt')}
      >
        <a className="cta" href="#donation-form">{t('dn.cta')} <i className="ri-arrow-down-line"></i></a>
      </PageHero>

      <section className="band band-cream">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('dn.why.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('dn.why.h')}</h2>
          </div>
          <div className="prose">
            <p data-reveal>{t('dn.why.p')}</p>
            <p className="notice" data-reveal>{t('dn.tax.p')}</p>
            <p className="text-sm" data-reveal>{t('dn.tax.note')}</p>
          </div>
        </div>
      </section>

      <section className="band band-light">
        <div className="band-inner">
          <div className="sec-head">
            <p className="eyebrow" data-reveal>{t('dn.opt.eyebrow')}</p>
            <h2 className="sec" data-reveal>{t('dn.opt.h')}</h2>
            <p className="lede" data-reveal>{t('dn.opt.p')}</p>
          </div>
          <div className="amount-grid">
            {OPTIONS.map((n) => {
              const active = selected === n;
              return (
                <button key={n} type="button" className="amount-card" data-active={active} aria-pressed={active}
                  onClick={() => setSelected(n)}>
                  <span className="tile-num">{String(n).padStart(2, '0')}</span>
                  <strong>{t(`dn.o${n}`)}</strong>
                  <span className="mark">{active ? t('dn.opt.selected') : t('dn.opt.select')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="donation-form" className="band band-cream scroll-mt-24">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('dn.form.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('dn.form.h')}</h2>
            <p className="lede mt-4" data-reveal>{t('dn.form.p')}</p>
            <p className="notice mt-6" data-reveal>{t('dn.tax.p')}</p>
          </div>
          <div data-reveal>
            <ArkForm variant="donation" presetField="option" presetValue={preset} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}