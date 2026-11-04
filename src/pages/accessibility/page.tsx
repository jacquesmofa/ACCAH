import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import PageHero from '@/components/base/PageHero';
import { FORM_EMAIL } from '@/hooks/useFormSubmit';

export default function AccessibilityPage() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.access')} description={t('meta.access')} metaKey="accessibility">
      <PageHero
        stamp={t('ac.stamp')}
        title={t('ac.h1')}
        sub={t('ac.sub')}
        image="https://readdy.ai/api/search-image?query=Cinematic%20wide%20photograph%20of%20a%20gentle%20shoreline%20with%20calm%20shallow%20water%20and%20smooth%20stones%20leading%20inward%2C%20soft%20dusk%20light%2C%20deep%20teal%20water%20and%20warm%20golden%20reflections%2C%20welcoming%20minimal%20landscape%20photography&width=2000&height=1125&seq=page-access-hero-01&orientation=landscape"
        alt={t('ac.alt')}
      />

      <section className="band band-light">
        <div className="band-inner grid-two">
          <div className="prose">
            <h2 className="sec" data-reveal>{t('ac.statement.h')}</h2>
            <p className="text-lg mt-5" data-reveal>{t('ac.pending')}</p>
          </div>
          <aside className="tile self-start" data-reveal>
            <p className="eyebrow m-0">{t('cn.details.email')}</p>
            <a className="mail-link !text-base mt-2 break-all" href={`mailto:${FORM_EMAIL}`}>{FORM_EMAIL}</a>
            <p className="text-sm mt-3 mb-0 opacity-75">{t('ac.note')}</p>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}