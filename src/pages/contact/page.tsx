import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';
import ArkForm from '@/components/feature/ArkForm';
import FaqSection from '@/components/feature/FaqSection';
import { FORM_EMAIL } from '@/hooks/useFormSubmit';

const ROUTES = [1, 2, 3, 4, 5, 6];

export default function ContactPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const raw = Number(params.get('reason'));
  const start = ROUTES.includes(raw) ? raw : 1;
  const [reason, setReason] = useState(start);

  const choose = (n: number) => {
    setReason(n);
    const target = document.getElementById('contact-form');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageShell title={t('seo.contact')} description={t('meta.contact')} metaKey="contact">
      <PageHero
        stamp={t('cn.stamp')}
        tag={t('cn.lead')}
        title={t('cn.h1')}
        sub={t('cn.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20calm%20dark%20teal%20water%20at%20dusk%20with%20a%20thin%20line%20of%20honey%20gold%20light%20on%20the%20horizon%2C%20vast%20empty%20sky%20and%20gentle%20ripples%2C%20soft%20atmospheric%20haze%2C%20minimal%20contemplative%20seascape&width=2000&height=1125&seq=page-contact-hero-01&orientation=landscape"
        alt={t('cn.alt')}
      >
        <a className="cta" href={`mailto:${FORM_EMAIL}`}>{t('form.email')} <i className="ri-mail-line"></i></a>
      </PageHero>

      <section className="band band-cream">
        <div className="band-inner grid-two items-start">
          <div>
            <p className="eyebrow" data-reveal>{t('cn.route.eyebrow')}</p>
            <h2 className="sec mt-3" data-reveal>{t('cn.route.h')}</h2>
            <div className="route-grid mt-7" data-reveal>
              {ROUTES.map((n) => (
                <button key={n} type="button" className="route-card" data-active={reason === n}
                  aria-pressed={reason === n} onClick={() => choose(n)}>
                  <strong>{t(`cn.r${n}`)}</strong>
                  <span aria-hidden="true"><i className="ri-arrow-right-line"></i></span>
                </button>
              ))}
            </div>
            <p className="notice mt-7" data-reveal>{t('cn.sub')}</p>
          </div>

          <div id="contact-form" className="scroll-mt-24">
            <p className="eyebrow" data-reveal>{t('cn.form.eyebrow')}</p>
            <h2 className="sec mt-3 mb-6" data-reveal>{t('cn.form.h')}</h2>
            <div data-reveal>
              <ArkForm variant="contact" presetField="reason" presetValue={t(`cn.r${reason}`)} />
            </div>
          </div>
        </div>
      </section>

      <section className="band band-light !py-14">
        <div className="band-inner">
          <div className="grid-auto">
            <div data-reveal>
              <p className="eyebrow">{t('cn.details.email')}</p>
              <a className="mail-link !text-lg md:!text-xl mt-2 break-all" href={`mailto:${FORM_EMAIL}`}>{FORM_EMAIL}</a>
            </div>
            <div data-reveal>
              <p className="eyebrow">{t('cn.details.phone')}</p>
              <p className="m-0 mt-2 text-base">{t('cn.details.phoneV')}</p>
            </div>
            <div data-reveal>
              <p className="eyebrow">{t('cn.details.address')}</p>
              <p className="m-0 mt-2 text-base">{t('cn.details.addressV')}</p>
            </div>
            <div data-reveal>
              <p className="eyebrow">{t('cn.details.hours')}</p>
              <p className="m-0 mt-2 text-base">{t('cn.details.hoursV')}</p>
            </div>
            <div data-reveal>
              <p className="eyebrow">{t('cn.details.social')}</p>
              <p className="m-0 mt-2 text-base">{t('cn.details.socialV')}</p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
    </PageShell>
  );
}