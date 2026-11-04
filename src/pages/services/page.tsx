import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import Panel from '@/components/feature/Panel';
import InquiryForm, { SERVICE_KEYS } from '@/components/feature/forms/InquiryForm';
import { IMG } from '@/mocks/media';

interface Program { title: string; desc: string; tags: string[]; icon: string }
const PIMG = [IMG.s1, IMG.s2, IMG.s3, IMG.s4, IMG.s5, IMG.s6];

export default function Services() {
  usePageMeta('services');
  const { s, o } = useTx();
  const programs = o<Program[]>('programs');

  return (
    <>
      <Panel side="left" img={IMG.servicesHero} alt="Women arriving in a warm community entrance hall on a winter evening" accent="06">
        <p className="stamp" data-reveal>{s('services.stamp')}</p>
        <Rich as="h1" html={s('services.title')} data-reveal />
        <p className="sub" data-reveal>{s('services.sub')}</p>
        <div data-reveal><a href="#inquiry" className="btn btn-gold">{s('common.makeInquiry')} <i className="ri-arrow-down-line" /></a></div>
      </Panel>

      <div className="px-4 md:px-6 lg:px-[8vw] py-24 md:py-32 grid gap-24 md:gap-32">
        {programs.map((p, i) => (
          <article key={p.title} id={SERVICE_KEYS[i]} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center scroll-mt-28`}>
            <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-2' : ''}`} data-reveal>
              <div className="relative w-full h-[280px] md:h-[440px] rounded-[20px] overflow-hidden" style={{ border: '1px solid color-mix(in srgb, var(--text) 12%, transparent)' }}>
                <img src={PIMG[i]} alt={p.title} title={p.title} loading="lazy" className="absolute inset-x-0 -top-[12%] w-full h-[124%] object-cover object-top" data-parallax="0.12" />
              </div>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-4" style={{ transform: 'translate(calc(var(--mx,0)*10px), calc(var(--my,0)*8px))' }}>
              <div className="flex items-center gap-4" data-reveal>
                <span className="text-4xl" style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontWeight: 700, color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--accent2)', color: 'var(--accent2)' }}><i className={p.icon} /></span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight m-0" data-reveal>{p.title}</h2>
              <p className="leading-[1.7] m-0" style={{ color: 'color-mix(in srgb, var(--text) 85%, transparent)' }} data-reveal>{p.desc}</p>
              <div data-reveal>
                <p className="stamp mb-2">{s('common.whoFor')}</p>
                <div className="flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
              <div className="flex flex-wrap gap-3 mt-2" data-reveal>
                <Link to={`/services?service=${SERVICE_KEYS[i]}#inquiry`} className="btn btn-gold">{s('common.makeInquiry')} <i className="ri-arrow-right-line" /></Link>
                {i === 5 && <Link to="/cgirls" className="btn btn-outline">{s('common.exploreCgirls')}</Link>}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Panel id="inquiry" side="full" img={IMG.contact} alt="Warm light from an open doorway onto a frosted street" wide>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-4">
            <p className="stamp" data-reveal>{s('services.inquiryStamp')}</p>
            <Rich as="h2" html={s('services.inquiryTitle')} data-reveal />
            <p className="sub" data-reveal>{s('form.inquiryIntro')}</p>
          </div>
          <InquiryForm idSuffix="services" />
        </div>
      </Panel>
    </>
  );
}