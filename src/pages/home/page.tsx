import Chapter from '@/pages/home/components/Chapter';
import HomePanels from '@/pages/home/components/HomePanels';
import usePageMeta from '@/hooks/usePageMeta';

export default function Home() {
  usePageMeta('home');
  return (
    <>
      <Chapter />
      <HomePanels />
    </>
  );
}