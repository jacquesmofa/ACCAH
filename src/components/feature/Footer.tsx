import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import Rich from '@/components/base/Rich';
import { NAV, LangToggle, Logo } from '@/components/feature/Header';
import { EMAIL } from '@/components/feature/forms/FormBits';
import { SERVICE_KEYS } from '@/components/feature/forms/InquiryForm';

export default function Footer() {
  const { s, o } = useTx();
  const programs = o<{ title: string }[]>('programs');
  return (
    <footer style={{ background: 'color-mix(in srgb, var(--bg) 70%, #000)' }}>
      <div className="pattern-rule" />
      <div className="px-4 md:px-6 lg:px-[8vw] pt-20 pb-10">
        <Rich as="p" html={s('footer.line')} className="text-3xl md:text-5xl font-semibold tracking-tight mb-14 max-w-[20ch]" data-reveal />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div data-reveal>
            <Logo />
            <p className="mt-5 text-sm" style={{ color: 'var(--accent2)' }}>{s('tagline')}</p>
            <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>{s('footer.mission')}</p>
          </div>
          <div data-reveal>
            <h4 className="stamp mb-4">{s('footer.quick')}</h4>
            <ul className="grid gap-2 text-sm">{NAV.map((n) => <li key={n.to}><Link to={n.to} className="nav-link">{s(`nav.${n.key}`)}</Link></li>)}</ul>
          </div>
          <div data-reveal>
            <h4 className="stamp mb-4">{s('footer.programs')}</h4>
            <ul className="grid gap-2 text-sm">{programs.map((p, i) => <li key={p.title}><Link to={i === 5 ? '/cgirls' : `/services#${SERVICE_KEYS[i]}`} className="nav-link">{p.title}</Link></li>)}</ul>
          </div>
          <div data-reveal>
            <h4 className="stamp mb-4">{s('footer.contact')}</h4>
            <address className="not-italic text-sm grid gap-3" style={{ color: 'var(--muted)' }}>
              <span className="flex gap-2"><i className="ri-map-pin-line" style={{ color: 'var(--accent)' }} />6850 Milcreek Drive, Suite 101C, Mississauga, ON</span>
              <a href={`mailto:${EMAIL}`} className="flex gap-2 break-all hover:underline"><i className="ri-mail-line" style={{ color: 'var(--accent)' }} />{EMAIL}</a>
            </address>
          </div>
        </div>
        <div className="mt-16 pt-6 flex flex-col lg:flex-row gap-4 lg:items-center justify-between text-xs" style={{ borderTop: '1px solid color-mix(in srgb, var(--text) 10%, transparent)', color: 'var(--muted)' }}>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6"><span>{s('footer.rights')}</span><span>{s('footer.charity')}</span></div>
          <div className="flex items-center gap-4">
            <LangToggle small />
            {/* Social links: placeholders until the client provides URLs */}
            {['ri-instagram-line', 'ri-facebook-circle-line', 'ri-linkedin-box-line', 'ri-youtube-line'].map((ic) => (
              <a key={ic} href="#" aria-label={ic.replace('ri-', '').replace(/-.*/, '')} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:text-[var(--accent)]" style={{ background: 'var(--surface)' }}><i className={ic} /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}