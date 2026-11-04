import type { ReactNode } from 'react';

interface PanelProps {
  id?: string;
  side?: 'left' | 'right' | 'bottom' | 'full';
  img: string;
  alt: string;
  accent?: string;
  accentPos?: string;
  wide?: boolean;
  children: ReactNode;
}

/** Full-screen image panel: picture lags behind the scroll, copy rides slightly ahead and follows the mouse. */
export default function Panel({ id, side = 'left', img, alt, accent, accentPos = 'right-[8vw] top-[14%]', wide, children }: PanelProps) {
  return (
    <section className="panel" data-side={side} id={id}>
      <img className="panel-bg" src={img} alt={alt} title={alt} data-parallax="0.32" />
      <div className="panel-veil" aria-hidden="true" />
      {accent && <span className={`panel-accent ${accentPos}`} aria-hidden="true" data-parallax="0.55">{accent}</span>}
      <div className={`panel-copy${wide ? ' panel-copy--wide' : ''}`} data-parallax="-0.08">{children}</div>
    </section>
  );
}