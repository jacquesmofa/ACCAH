import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useFilm from '@/hooks/useFilm';

const VIDEO = 'https://v3b.fal.media/files/b/0ab110d0/Pms3k2GHy3AnLSzIxRXlw_g5S4Qaal.mp4';
const COVER = 'https://v3b.fal.media/files/b/0ab110a1/p6NTGc9zojDpJ_QZvcT2E_7MNMwPr2.jpg';

function Lines({ html, as, className }: { html: string; as: 'h1' | 'h2'; className?: string }) {
  const Tag = as;
  return (
    <Tag data-split="lines" className={className}>
      {html.split(/<br\s*\/?>/i).map((l) => (
        <span className="line" key={l}><span className="line-in" dangerouslySetInnerHTML={{ __html: l }} /></span>
      ))}
    </Tag>
  );
}

export default function FilmChapter() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  useFilm(ref, i18n.language);

  return (
    <section ref={ref} className="chapter" id="top" data-video={VIDEO} data-duration="14" data-poster={COVER} data-label="Ark of Hope">
      <div className="stage">
        <img className="plate" src={COVER} width={1920} height={1080} fetchPriority="high" decoding="async" alt={t('film.alt')} />
        <div className="veil" aria-hidden="true"></div>
        <div className="veil veil-light" aria-hidden="true"></div>

        <div className="beat is-first" data-from="0" data-to="0.5" data-pos="left" data-depth="soft" data-tone="light" data-motion="track" id="overview">
          <p className="stamp">{t('b1.stamp')}</p>
          <Lines as="h1" className="hero-title--long" html={t('b1.h')} />
          <p className="sub">{t('b1.sub')}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="cta" to="/work">{t('b1.cta')} <i className="ri-arrow-right-line"></i></Link>
            <Link className="cta cta-ghost" to="/get-involved">{t('b1.cta2')}</Link>
          </div>
        </div>

        <div className="beat" data-from="0.5" data-to="1" data-pos="left" data-depth="soft" data-tone="dark" data-motion="drift" id="harbour">
          <p className="stamp">{t('b2.stamp')}</p>
          <Lines as="h2" html={t('b2.h')} />
          <p className="sub">{t('b2.sub')}</p>
          <Link className="cta" to="/get-involved">{t('b2.cta')} <i className="ri-arrow-right-line"></i></Link>
          <ul className="chips" data-side="right">
            <li>{t('b2.chip1')}</li>
            <li>{t('b2.chip2')}</li>
            <li>{t('b2.chip3')}</li>
          </ul>
        </div>

        <div className="scroll-cue" aria-hidden="true"><span></span></div>
      </div>
    </section>
  );
}