import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';

export default function NotFound() {
  usePageMeta('notFound');
  const { s } = useTx();
  return (
    <section className="panel manifesto" data-side="full">
      <span className="panel-accent left-1/2 -translate-x-1/2 top-[12%]" aria-hidden="true">404</span>
      <div className="panel-copy items-center text-center" style={{ maxWidth: '40ch' }}>
        <span className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}><i className="ri-vip-crown-2-line text-2xl" /></span>
        <Rich as="h1" html={s('notFound.title')} />
        <p className="sub">{s('notFound.sub')}</p>
        <Link to="/" className="btn btn-gold">{s('common.returnHome')} <i className="ri-arrow-right-line" /></Link>
      </div>
    </section>
  );
}