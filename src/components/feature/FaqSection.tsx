import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = { id?: string };

const QUESTIONS = [1, 2, 3, 4, 5, 6];

export default function FaqSection({ id = 'faq' }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id={id} className="relative overflow-clip bg-background-950 py-24 md:py-32 px-4 md:px-[8vw]">
      <span className="panel-accent" style={{ left: '3vw', top: '4vh' }} aria-hidden="true" data-parallax="0.55">?</span>
      <div className="relative z-10 max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16">
        <div>
          <p className="stamp" data-reveal>{t('faq.eyebrow')}</p>
          <h2 data-reveal className="text-4xl md:text-6xl font-semibold tracking-tight mt-4 leading-none" dangerouslySetInnerHTML={{ __html: t('faq.h') }} />
        </div>
        <div>
          {QUESTIONS.map((n) => {
            const isOpen = open === n;
            return (
              <div key={n} data-reveal className="border-t border-foreground-50/15 last:border-b">
                <h3 className="m-0">
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : n)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left bg-transparent border-0 text-foreground-50 text-base md:text-lg font-medium hover:text-primary-500 transition-colors">
                    <span>{t(`faq.q${n}`)}</span>
                    <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border border-foreground-50/20">
                      <i className={`ri-add-line transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}></i>
                    </span>
                  </button>
                </h3>
                <div className={`faq-body ${isOpen ? 'open' : ''}`}>
                  <div className="overflow-hidden">
                    <p className="m-0 pb-6 pr-10 text-foreground-400 leading-relaxed text-sm md:text-base">{t(`faq.a${n}`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}