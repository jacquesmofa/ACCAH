import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <PageShell title={t('nf.h')} metaKey="not-found">
      <section className="band band-ink min-h-[88vh] flex items-center pt-28">
        <div className="band-inner">
          <span className="w-16 h-16 rounded-full border border-primary-500/50 flex items-center justify-center text-primary-500 mb-6">
            <i className="ri-sailboat-line text-3xl"></i>
          </span>
          <p className="stamp">{t('nf.stamp')}</p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 max-w-[20ch]">{t('nf.h')}</h1>
          <p className="mt-4 text-base text-foreground-300 max-w-[56ch]">{t('nf.p')}</p>
          <div className="link-row mt-7">
            <Link className="cta" to="/">{t('nf.home')} <i className="ri-arrow-right-line"></i></Link>
            <Link className="cta cta-ghost" to="/contact">{t('nav.contact')}</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}