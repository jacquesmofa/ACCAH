import { useState } from 'react';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import Panel from '@/components/feature/Panel';
import InquiryForm from '@/components/feature/forms/InquiryForm';
import { EMAIL } from '@/components/feature/forms/FormBits';
import { IMG } from '@/mocks/media';

interface Faq { q: string; a: string }
const ADDRESS = '6850 Milcreek Drive, Suite 101C, Mississauga, ON';
const MAPS = 'https://www.google.com/maps/dir/?api=1&destination=6850+Milcreek+Drive+Mississauga+ON';

export default function Contact() {
  usePageMeta('contact');
  const { s, o } = useTx();
  const faq = o<Faq[]>('contact.faq');
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <Panel id="inquiry" side="full" img={IMG.contactHero} alt="Brick community building entrance with warm light on a frosty evening" wide>
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-[760px]">
            <p className="stamp" data-reveal>{s('contact.stamp')}</p>
            <Rich as="h1" html={s('contact.title')} data-reveal />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 card p-7 flex flex-col gap-5" data-reveal>
              <h2 className="text-xl font-semibold m-0">{s('contact.cardTitle')}</h2>
              <div><p className="stamp mb-1">{s('contact.address')}</p><p className="m-0">{ADDRESS}</p></div>
              <div><p className="stamp mb-1">{s('contact.email')}</p><a href={`mailto:${EMAIL}`} className="break-all hover:underline" style={{ color: 'var(--accent)' }}>{EMAIL}</a></div>
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-fit"><i className="ri-direction-line" />{s('contact.directions')}</a>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-4">
              <p className="sub" data-reveal>{s('form.inquiryIntro')}</p>
              <InquiryForm idSuffix="contact" />
            </div>
          </div>
        </div>
      </Panel>

      <section className="px-4 md:px-6 lg:px-[8vw] py-24 md:py-32" style={{ background: 'var(--surface)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div data-reveal>
            <p className="stamp">{s('contact.faqStamp')}</p>
            <Rich as="h2" html={s('contact.faqTitle')} className="text-3xl md:text-5xl font-semibold tracking-tight mt-3 mb-8" />
            <div className="w-full h-[320px] md:h-[400px] rounded-[20px] overflow-hidden" style={{ border: '1px solid color-mix(in srgb, var(--text) 12%, transparent)' }}>
              <iframe title="Map: 6850 Milcreek Drive, Mississauga" src="https://www.google.com/maps?q=6850+Milcreek+Drive+Mississauga+ON&output=embed" className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <div className="flex flex-col">
            {faq.map((f, i) => (
              <div key={f.q} style={{ borderTop: '1px solid color-mix(in srgb, var(--text) 16%, transparent)' }} data-reveal>
                <h3 className="m-0">
                  <button type="button" className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer text-base md:text-lg font-medium"
                    aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                    {f.q}
                    <i className={`ri-add-line text-xl transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} style={{ color: 'var(--accent)' }} />
                  </button>
                </h3>
                <div id={`faq-${i}`} className={`accordion-body ${open === i ? 'open' : ''}`}>
                  <div><p className="m-0 pb-5 text-sm leading-[1.7]" style={{ color: 'color-mix(in srgb, var(--text) 80%, transparent)' }}>{f.a}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}