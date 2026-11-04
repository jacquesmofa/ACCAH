import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';
import { FORM_EMAIL } from '@/hooks/useFormSubmit';

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.privacy')} description={t('meta.privacy')} metaKey="privacy">
      <PageHero
        stamp={t('pp.stamp')}
        title={t('pp.h1')}
        sub={t('pp.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20still%20dark%20teal%20water%20with%20soft%20reeds%20in%20the%20foreground%20at%20dusk%2C%20thin%20golden%20reflection%20on%20the%20surface%2C%20quiet%20minimal%20landscape%2C%20atmospheric%20haze%2C%20editorial%20photography&width=2000&height=1125&seq=page-privacy-hero-01&orientation=landscape"
        alt={t('pp.alt')}
      />

      <section className="band band-cream">
        <div className="band-inner grid-two">
          <div className="prose">
            <h2 className="sec" data-reveal>{t('pp.summary.h')}</h2>
            <p className="text-lg mt-5" data-reveal>{t('pp.pending')}</p>
          </div>
          <aside className="tile self-start" data-reveal>
            <p className="eyebrow m-0">{t('cn.details.email')}</p>
            <a className="mail-link !text-base mt-2 break-all" href={`mailto:${FORM_EMAIL}`}>{FORM_EMAIL}</a>
            <p className="text-sm mt-3 mb-0 opacity-75">{t('form.notice')}</p>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}