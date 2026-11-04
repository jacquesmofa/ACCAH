import { useTranslation } from 'react-i18next';

export default function Manifesto() {
  const { t } = useTranslation();
  const parts = t('manifesto.text').split(/(\[\[[^\]]+\]\])/).filter(Boolean);

  const words = (s: string, k: string) => s.split(/(\s+)/).map((w, i) => (
    /^\s+$/.test(w) || !w ? w : <span className="w" key={`${k}-${i}`}>{w}</span>
  ));

  return (
    <section className="panel manifesto" id="welcome" aria-label={t('hm.focus.eyebrow')}>
      <span className="panel-accent" style={{ right: '6vw', top: '8vh' }} aria-hidden="true" data-parallax="0.55">01</span>
      <div className="relative z-[2] flex flex-col items-center gap-9">
        <p className="manifesto-text" data-words>
          {parts.map((p, i) => (p.startsWith('[[')
            ? <em className="accent" key={`a${i}`}>{words(p.slice(2, -2), `a${i}`)}</em>
            : <span key={`t${i}`}>{words(p, `t${i}`)}</span>))}
        </p>
        <div className="grid gap-4 text-center max-w-[66ch]">
          <p className="m-0 text-base md:text-lg leading-[1.75] text-foreground-300" data-reveal>{t('welcome.p1')}</p>
          <p className="m-0 text-base md:text-lg leading-[1.75] text-foreground-300" data-reveal>{t('welcome.p2')}</p>
        </div>
      </div>
    </section>
  );
}