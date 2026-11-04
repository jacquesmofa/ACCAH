import type { ReactNode } from 'react';

type Props = {
  stamp: string;
  title: string;
  sub?: string;
  image: string;
  alt: string;
  tag?: string;
  children?: ReactNode;
};

export default function PageHero({ stamp, title, sub, image, alt, tag, children }: Props) {
  return (
    <section className="page-hero">
      <img className="page-hero-bg" src={image} alt={alt} width={2000} height={1125} fetchPriority="high" decoding="async" />
      <div className="page-hero-veil" aria-hidden="true"></div>
      <div className="page-hero-inner">
        <p className="stamp">{stamp}</p>
        {tag ? <span className="hero-tag">{tag}</span> : null}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {sub ? <p className="sub">{sub}</p> : null}
        {children ? <div className="hero-links">{children}</div> : null}
      </div>
    </section>
  );
}