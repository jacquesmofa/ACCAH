import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import CountUp from '@/components/base/CountUp';
import Panel from '@/components/feature/Panel';
import { IMG } from '@/mocks/media';

interface Impact { n: number; suffix: string; label: string; text: string }
interface Value { t: string; d: string }
interface Member { name: string; role: string }

const SERVE_ICONS = ['ri-women-line', 'ri-seedling-line', 'ri-home-heart-line', 'ri-earth-line'];
const TEAM_IMG = [IMG.team1, IMG.team2, IMG.team3];

export default function About() {
  usePageMeta('about');
  const { s, o, lang } = useTx();
  const impact = o<Impact[]>('about.impact');
  const values = o<Value[]>('about.values');
  const team = o<Member[]>('about.team');
  const serve = o<string[]>('about.serve');

  return (
    <>
      <Panel side="left" img={IMG.aboutHero} alt="Women leaders around a long table with gold place cards" accent="01">
        <p className="stamp" data-reveal>{s('about.stamp')}</p>
        <Rich as="h1" html={s('about.title')} data-reveal />
        <p className="sub" data-reveal>{s('tagline')}</p>
      </Panel>

      <Panel side="right" img={IMG.aboutStory} alt="Three generations of Black women sharing tea by a warm window">
        <p className="stamp" data-reveal>{s('about.storyStamp')}</p>
        <Rich as="h2" html={s('about.storyTitle')} data-reveal />
        <p className="sub" data-reveal>{s('about.story')}</p>
        <div className="pull" data-reveal><p>{s('about.story2')}</p></div>
      </Panel>

      <section className="panel manifesto" data-side="full">
        <span className="ring w-[50vmin] h-[50vmin] right-[8%] top-[10%]" data-parallax="0.55" aria-hidden="true" />
        <div className="panel-copy panel-copy--wide" data-parallax="-0.08">
          <p className="stamp" data-reveal>{s('about.impactStamp')}</p>
          <Rich as="h2" html={s('about.impactTitle')} data-reveal />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 text-left">
            {impact.map((m) => (
              <div key={m.label} className="card p-7" data-reveal>
                <p className="text-5xl md:text-6xl font-semibold tracking-tight m-0" style={{ color: 'var(--accent)' }}><CountUp to={m.n} suffix={m.suffix} locale={lang} /></p>
                <p className="stamp mt-3">{m.label}</p>
                <p className="text-sm mt-3 m-0" style={{ color: 'var(--muted)' }}>{m.text}</p>
                <span className="gold-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Panel side="right" img={IMG.aboutValues} alt="A newcomer woman celebrating her graduation among applauding women" wide>
        <div className="lg:ml-auto lg:max-w-[880px] flex flex-col gap-4">
          <p className="stamp" data-reveal>{s('about.valuesStamp')}</p>
          <Rich as="h2" html={s('about.valuesTitle')} data-reveal />
          <ul className="rule-list">
            {values.map((v, i) => (
              <li key={v.t} data-reveal>
                <span className="idx" style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: 22, color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.t}</h3><p>{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <section className="px-4 md:px-6 lg:px-[8vw] py-24 md:py-32" style={{ background: 'var(--surface)' }}>
        <p className="stamp" data-reveal>{s('about.teamStamp')}</p>
        <Rich as="h2" html={s('about.teamTitle')} className="text-3xl md:text-5xl font-semibold tracking-tight mt-3 mb-12" data-reveal />
        {/* CONTENT: confirm with client before launch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-parallax="-0.04">
          {team.map((m, i) => (
            <figure key={m.name} className="m-0 group" data-reveal>
              <div className="arch w-full h-[380px] md:h-[440px]" style={{ border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)' }}>
                <img src={TEAM_IMG[i]} alt={`${m.name}, ${m.role}`} title={m.name} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <figcaption className="mt-5"><p className="text-xl font-semibold m-0">{m.name}</p><p className="text-sm m-0 mt-1" style={{ color: 'var(--accent2)' }}>{m.role}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Panel side="bottom" img={IMG.voices} alt="Women and families gathered in a warm community room" wide>
        <p className="stamp" data-reveal>{s('about.serveStamp')}</p>
        <Rich as="h2" html={s('about.serveTitle')} data-reveal />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-[900px]">
          {serve.map((w, i) => (
            <div key={w} className="card p-5 flex flex-col items-center gap-3 text-center" data-reveal>
              <span className="w-12 h-12 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}><i className={`${SERVE_ICONS[i]} text-xl`} /></span>
              <span className="text-sm font-medium">{w}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center mt-6" data-reveal>
          <Link to="/get-involved" className="btn btn-gold">{s('common.getInvolved')} <i className="ri-arrow-right-line" /></Link>
          <Link to="/services" className="btn btn-outline">{s('nav.services')}</Link>
        </div>
      </Panel>
    </>
  );
}