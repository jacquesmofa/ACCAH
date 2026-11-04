import { useEffect, useState } from 'react';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import Panel from '@/components/feature/Panel';
import RsvpForm from '@/components/feature/forms/RsvpForm';
import { IMG } from '@/mocks/media';

interface EventItem { id: string; type: string; day: string; month: string; date: string; title: string; venue: string; action: string }
const FILTERS = ['all', 'festival', 'workshop', 'panel'];

export default function Events() {
  usePageMeta('events');
  const { s, o } = useTx();
  const list = o<EventItem[]>('events.list');
  const [filter, setFilter] = useState('all');
  const [rsvp, setRsvp] = useState<EventItem | null>(null);
  const shown = list.filter((e) => filter === 'all' || e.type === filter);

  useEffect(() => {
    if (!rsvp) return undefined;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setRsvp(null); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [rsvp]);

  return (
    <>
      <Panel side="left" img={IMG.eventsHero} alt="Women in leadership panel on a warmly lit library stage" accent="18" wide>
        <div className="max-w-[760px] flex flex-col gap-4">
          <p className="stamp" data-reveal>{s('events.stamp')}</p>
          <Rich as="h1" html={s('events.title')} data-reveal />
          <p className="sub" data-reveal>{s('events.sub')}</p>
          <div className="inline-flex flex-wrap gap-1 p-1 rounded-full w-fit mt-2" role="tablist" aria-label="Filter events" style={{ background: 'color-mix(in srgb, var(--surface) 80%, transparent)', border: '1px solid color-mix(in srgb, var(--text) 12%, transparent)' }} data-reveal>
            {FILTERS.map((f) => (
              <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer transition-colors"
                style={filter === f ? { background: 'var(--accent)', color: 'var(--bg)' } : { color: 'var(--text)' }}>{s(`events.filters.${f}`)}</button>
            ))}
          </div>
          <div className="grid gap-3 mt-2">
            {shown.map((e) => (
              <article key={e.id} className="card flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                <span className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0" style={{ border: '1px solid var(--accent)' }}>
                  <span className="text-[10px] tracking-widest" style={{ fontFamily: 'var(--font-label)', color: 'var(--accent2)' }}>{e.month}</span>
                  <span className="text-2xl font-semibold leading-none">{e.day}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <span className="tag mb-2">{s(`events.filters.${e.type}`)}</span>
                  <h2 className="text-lg md:text-xl font-semibold m-0 mt-2">{e.title}</h2>
                  <p className="text-sm m-0 mt-1 flex flex-wrap gap-x-4" style={{ color: 'var(--muted)' }}><span><i className="ri-calendar-line mr-1" />{e.date}</span><span><i className="ri-map-pin-line mr-1" />{e.venue}</span></p>
                </div>
                {e.action === 'tickets'
                  ? <a href="#" className="btn btn-gold">{s('events.tickets')} <i className="ri-arrow-right-up-line" /></a>
                  : <button type="button" className="btn btn-outline" onClick={() => setRsvp(e)}>{s('events.rsvp')}</button>}
                <span className="gold-line" />
              </article>
            ))}
          </div>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{s('events.soon')}</p>
        </div>
      </Panel>

      {rsvp && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="rsvp-title">
          <button type="button" aria-label={s('events.close')} className="absolute inset-0 cursor-pointer" style={{ background: 'color-mix(in srgb, var(--bg) 80%, transparent)', backdropFilter: 'blur(6px)' }} onClick={() => setRsvp(null)} />
          <div className="form-card relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto page-fade">
            <button type="button" aria-label={s('events.close')} onClick={() => setRsvp(null)} className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center cursor-pointer"><i className="ri-close-line text-xl" /></button>
            <p className="stamp">{s('events.modalTitle')}</p>
            <h2 id="rsvp-title" className="text-2xl font-semibold mt-2 mb-6 pr-10">{rsvp.title}</h2>
            <RsvpForm eventName={rsvp.title} />
          </div>
        </div>
      )}
    </>
  );
}