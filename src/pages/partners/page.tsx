import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import Panel from '@/components/feature/Panel';
import { IMG } from '@/mocks/media';

interface PType { t: string; d: string; icon: string }

export default function Partners() {
  usePageMeta('partners');
  const { s, o } = useTx();
  const types = o<PType[]>('partners.types');

  return (
    <>
      <Panel side="left" img={IMG.partnersHero} alt="Two women professionals shaking hands warmly" accent="+">
        <p className="stamp" data-reveal>{s('partners.stamp')}</p>
        <Rich as="h1" html={s('partners.title')} data-reveal />
        <p className="sub" data-reveal>{s('partners.sub')}</p>
      </Panel>

      <section className="px-4 md:px-6 lg:px-[8vw] py-24 md:py-32" style={{ background: 'var(--surface)' }}>
        <p className="stamp" data-reveal>{s('partners.gridStamp')}</p>
        <Rich as="h2" html={s('partners.gridTitle')} className="text-3xl md:text-5xl font-semibold tracking-tight mt-3 mb-12" data-reveal />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          <div className="card logo-tile h-36 md:h-44 flex flex-col items-center justify-center gap-2 text-center p-4" data-reveal>
            <i className="ri-school-line text-3xl" style={{ color: 'var(--accent)' }} />
            <span className="font-semibold text-sm md:text-base">Peel District School Board</span>
            <span className="text-[11px]" style={{ color: 'var(--muted)' }}>{s('partners.logoNote')}</span>
          </div>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-36 md:h-44 rounded-[18px] flex items-center justify-center text-sm" style={{ border: '1px dashed color-mix(in srgb, var(--text) 22%, transparent)', color: 'var(--muted)' }} data-reveal>{s('partners.yourLogo')}</div>
          ))}
        </div>
      </section>

      <Panel side="bottom" img={IMG.programs} alt="Women in a warmly lit mentorship circle" wide>
        <p className="stamp" data-reveal>{s('partners.typesStamp')}</p>
        <Rich as="h2" html={s('partners.typesTitle')} data-reveal />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 w-full text-left">
          {types.map((t) => (
            <div key={t.t} className="card p-7" data-reveal>
              <span className="w-12 h-12 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}><i className={`${t.icon} text-xl`} /></span>
              <h3 className="text-xl font-semibold mt-5 mb-2">{t.t}</h3>
              <p className="text-sm m-0 leading-relaxed" style={{ color: 'color-mix(in srgb, var(--text) 82%, transparent)' }}>{t.d}</p>
              <span className="gold-line" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mt-10" data-reveal>
          <Rich as="h3" html={s('partners.ctaTitle')} className="text-2xl md:text-3xl font-semibold m-0" />
          <Link to="/get-involved?area=partnership#join" className="btn btn-gold">{s('common.becomePartner')} <i className="ri-arrow-right-line" /></Link>
        </div>
      </Panel>
    </>
  );
}