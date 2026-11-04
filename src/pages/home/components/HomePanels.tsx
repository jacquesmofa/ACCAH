import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import Rich from '@/components/base/Rich';
import Panel from '@/components/feature/Panel';
import InquiryForm, { SERVICE_KEYS } from '@/components/feature/forms/InquiryForm';
import { EMAIL } from '@/components/feature/forms/FormBits';
import { IMG } from '@/mocks/media';

interface Program { title: string; summary: string }
interface Testimonial { quote: string; name: string; role: string }
interface EventItem { id: string; day: string; month: string; title: string; venue: string; type: string }

/** Manifesto words: *word* marks an italic-serif accent. Rendered as spans so React owns the DOM. */
function Manifesto({ text }: { text: string }) {
  const tokens = text.split(/(\*[^*]+\*)/).filter(Boolean);
  return (
    <p className="manifesto-text" data-words>
      {tokens.map((tok, ti) => {
        const accent = tok.startsWith('*');
        const words = tok.replace(/\*/g, '').split(/(\s+)/).filter(Boolean)
          .map((w, wi) => (/^\s+$/.test(w) ? w : <span key={`${ti}-${wi}`} className="w">{w}</span>));
        return accent ? <em key={ti} className="accent">{words}</em> : <span key={ti}>{words}</span>;
      })}
    </p>
  );
}

export default function HomePanels() {
  const { s, o } = useTx();
  const programs = o<Program[]>('programs');
  const voices = o<Testimonial[]>('testimonials');
  const events = o<EventItem[]>('events.list');

  return (
    <>
      <section className="panel manifesto" id="belief">
        <span className="ring w-[60vmin] h-[60vmin] left-[10%] top-[12%]" data-parallax="0.55" aria-hidden="true" />
        <span className="ring w-[34vmin] h-[34vmin] right-[12%] bottom-[10%]" data-parallax="0.3" aria-hidden="true" />
        <span className="panel-accent left-[6vw] bottom-[8%]" aria-hidden="true" data-parallax="0.55"><i className="ri-vip-crown-2-line" /></span>
        <Manifesto text={s('home.manifesto')} />
      </section>

      <Panel id="pillars" side="right" img={IMG.programs} alt="Diverse women in a warmly lit mentorship circle at a community hall" accent="06" accentPos="left-[8vw] top-[16%]" wide>
        <div className="lg:ml-auto lg:max-w-[880px] flex flex-col gap-4">
          <p className="stamp" data-reveal>{s('home.programsStamp')}</p>
          <Rich as="h2" html={s('home.programsTitle')} data-reveal />
          <ul className="rule-list">
            {programs.map((p, i) => (
              <li key={p.title} data-reveal>
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                <Link className="more" to={i === 5 ? '/cgirls' : `/services#${SERVICE_KEYS[i]}`}>{s('common.learnMore')} →</Link>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <Panel id="cgirls" side="left" img={IMG.cgirls} alt="Confident Black professional woman by an office window at dusk" accent="C" accentPos="right-[30vw] bottom-[10%]">
        <p className="stamp" data-reveal>{s('home.cgirlsStamp')}</p>
        <Rich as="h2" html={s('home.cgirlsTitle')} data-reveal />
        <p className="sub" data-reveal>{s('home.cgirlsSub')}</p>
        <div data-reveal><Link to="/cgirls" className="btn btn-gold">{s('common.exploreCgirls')} <i className="ri-arrow-right-line" /></Link></div>
      </Panel>

      <Panel id="voices" side="bottom" img={IMG.voices} alt="Women of several generations embracing in a warm community room" wide>
        <p className="stamp" data-reveal>{s('home.voicesStamp')}</p>
        <Rich as="h2" html={s('home.voicesTitle')} data-reveal />
        {/* CONTENT: confirm with client before launch */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-5 mt-4 overflow-x-auto snap-x snap-mandatory pb-2 w-full text-left">
          {voices.map((v) => (
            <figure key={v.name} className="card p-6 md:p-7 m-0 min-w-[82%] sm:min-w-[60%] md:min-w-0 snap-start" data-reveal>
              <span className="block text-6xl leading-none h-10" style={{ color: 'var(--accent)', fontFamily: 'var(--font-accent)' }}>“</span>
              <blockquote className="m-0 text-[15px] md:text-base leading-relaxed">{v.quote}</blockquote>
              <figcaption className="mt-5 text-sm"><strong className="font-semibold">{v.name}</strong><span style={{ color: 'var(--muted)' }}> · {v.role}</span></figcaption>
              <span className="gold-line" />
            </figure>
          ))}
        </div>
      </Panel>

      <Panel id="gatherings" side="right" img={IMG.events} alt="Women celebrating at an African and Caribbean cultural evening" accent="18" accentPos="left-[8vw] bottom-[12%]">
        <p className="stamp" data-reveal>{s('home.eventsStamp')}</p>
        <Rich as="h2" html={s('home.eventsTitle')} data-reveal />
        <div className="grid gap-3 mt-2">
          {events.map((e) => (
            <Link key={e.id} to="/events" className="card flex items-center gap-4 p-4 no-underline cursor-pointer" data-reveal>
              <span className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0" style={{ border: '1px solid var(--accent)' }}>
                <span className="text-[10px] tracking-widest" style={{ fontFamily: 'var(--font-label)', color: 'var(--accent2)' }}>{e.month}</span>
                <span className="text-xl font-semibold leading-none">{e.day}</span>
              </span>
              <span className="min-w-0"><span className="block font-medium text-[15px]">{e.title}</span><span className="block text-xs mt-1" style={{ color: 'var(--muted)' }}>{e.venue}</span></span>
              <i className="ri-arrow-right-up-line ml-auto" style={{ color: 'var(--accent)' }} />
              <span className="gold-line" />
            </Link>
          ))}
        </div>
        <div className="pull mt-3" data-reveal>
          <p>{s('home.partnerLine')} <strong>{s('home.partnerName')}</strong> · <Link to="/partners" className="underline" style={{ color: 'var(--accent)' }}>{s('common.viewPartners')}</Link></p>
        </div>
      </Panel>

      <Panel id="contact" side="full" img={IMG.contact} alt="Open doorway spilling warm light onto a frosted Mississauga street" wide>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-5">
            <p className="stamp" data-reveal>{s('home.contactStamp')}</p>
            <Rich as="h2" html={s('home.contactTitle')} data-reveal />
            <p className="sub" data-reveal>{s('form.inquiryIntro')}</p>
            <a href={`mailto:${EMAIL}`} className="mail-link" data-reveal><i className="ri-mail-line" />{EMAIL}</a>
            <div className="flex flex-wrap gap-3" data-reveal>
              <Link to="/get-involved#donate" className="btn btn-gold">{s('common.donateNow')}</Link>
              <Link to="/partners" className="btn btn-outline">{s('common.becomePartner')}</Link>
            </div>
          </div>
          <InquiryForm idSuffix="home" />
        </div>
      </Panel>
    </>
  );
}