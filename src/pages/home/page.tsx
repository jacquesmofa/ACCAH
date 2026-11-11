import { useTranslation } from 'react-i18next';
import PageShell from '@/components/feature/PageShell';
import FilmChapter from './components/FilmChapter';
import Manifesto from './components/Manifesto';
import FoodSecurity from './components/FoodSecurity';
import { FocusGrid, ChangePanel, ArkTeaser, ClosingCta, AboutIntro, ApproachPath, TakePart, NewsTeaser } from './components/HomeSections';

export default function Home() {
  const { t } = useTranslation();
  return (
    <PageShell title={t('seo.home')} metaKey="home" description={t('meta.home')}>
      <FilmChapter />
      <Manifesto />
      <AboutIntro />
      <FocusGrid />
      <ApproachPath />
      <FoodSecurity />
      <ChangePanel />
      <ArkTeaser />
      <TakePart />
      <NewsTeaser />
      <ClosingCta />
    </PageShell>
  );
}