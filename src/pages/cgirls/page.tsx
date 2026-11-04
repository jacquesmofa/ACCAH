import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import Panel from '@/components/feature/Panel';
import { IMG } from '@/mocks/media';

interface Step { t: string; d: string }

export default function Cgirls() {
  usePageMeta('cgirls');
  const { s, o } = useTx();
  const path = o<Step[]>('cgirls.path');
  const forList = o<string[]>('cgirls.forList');

  return (
    <>
      <Panel side="left" img={IMG.cgirlsHero} alt="Black and newcomer professional women standing together on an office terrace at dusk" accent="C">
        <p className="stamp" data-reveal>{s('cgirls.eyebrow')}</p>
        <Rich as="h1" html={s('cgirls.title')} data-reveal />
        <div className="flex flex-wrap gap-3" data-reveal>
          <Link to="/contact?service=cgirls#inquiry" className="btn btn-gold">{s('cgirls.apply')} <i className="ri-arrow-right-line" /></Link>
          <a href="#partner" className="btn btn-outline">{s('cgirls.funderStamp').replace(/^\d+ — /, '')}</a>
        </div>
      </Panel>

      <section className="panel manifesto" data-side="full">
        <span className="panel-accent right-[6vw] top-[10%]" aria-hidden="true" data-parallax="0.55">02</span>
        <div className="panel-copy" data-parallax="-0.08" style={{ maxWidth: '60ch', alignItems: 'center' }}>
          <p className="stamp" data-reveal>{s('cgirls.overviewStamp')}</p>
          <Rich as="h2" html={s('cgirls.overviewTitle')} data-reveal />
          <p className="sub" data-reveal>{s('cgirls.overview')}</p>
        </div>
      </section>

      <Panel side="right" img={IMG.cgirls} alt="Professional woman by a tall office window at dusk">
        <p className="stamp" data-reveal>{s('cgirls.challengeStamp')}</p>
        <Rich as="h2" html={s('cgirls.challengeTitle')} data-reveal />
        <div className="pull" data-reveal><p className="!text-base">{s('cgirls.challenge')}</p></div>
      </Panel>

      <Panel side="right" img={IMG.cgirlsPath} alt="A woman climbing a grand staircase in a warmly lit office atrium" wide>
        <div className="lg:ml-auto lg:max-w-[880px] flex flex-col gap-4">
          <p className="stamp" data-reveal>{s('cgirls.pathStamp')}</p>
          <Rich as="h2" html={s('cgirls.pathTitle')} data-reveal />
          <ul className="rule-list">
            {path.map((st, i) => (
              <li key={st.t} data-reveal><span className="idx">{String(i + 1).padStart(2, '0')}</span><h3>{st.t}</h3><p>{st.d}</p></li>
            ))}
          </ul>
          <div data-reveal>
            <p className="stamp mb-3 mt-4">{s('cgirls.forStamp')}</p>
            <div className="flex flex-wrap gap-2">{forList.map((f) => <span key={f} className="tag"><i className="ri-vip-crown-2-line mr-1.5" style={{ color: 'var(--accent)' }} />{f}</span>)}</div>
            <p className="text-sm mt-4" style={{ color: 'var(--muted)' }}>{s('cgirls.related')} <Link to="/services#board" className="underline" style={{ color: 'var(--accent)' }}>{s('common.learnMore')}</Link></p>
          </div>
        </div>
      </Panel>

      <Panel id="partner" side="left" img={IMG.partnersHero} alt="Two women professionals shaking hands in a warm meeting room">
        <p className="stamp" data-reveal>{s('cgirls.funderStamp')}</p>
        <Rich as="h2" html={s('cgirls.funderTitle')} data-reveal />
        <p className="sub" data-reveal>{s('cgirls.funder')}</p>
        <div className="flex flex-wrap gap-3" data-reveal>
          <Link to="/contact?subject=cgirls-partnership#inquiry" className="btn btn-gold">{s('cgirls.funderCta')} <i className="ri-arrow-right-line" /></Link>
          <Link to="/contact?service=cgirls#inquiry" className="btn btn-outline">{s('cgirls.apply')}</Link>
        </div>
      </Panel>
    </>
  );
}