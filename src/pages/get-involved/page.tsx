import { Link, useSearchParams } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import usePageMeta from '@/hooks/usePageMeta';
import Rich from '@/components/base/Rich';
import Panel from '@/components/feature/Panel';
import VolunteerForm from '@/components/feature/forms/VolunteerForm';
import { IMG } from '@/mocks/media';

interface CardItem { t: string; d: string; icon: string; href: string }

export default function GetInvolved() {
  usePageMeta('involved');
  const { s, o } = useTx();
  const cards = o<CardItem[]>('involved.cards');
  const [params] = useSearchParams();
  const preset = params.get('area') === 'partnership' ? 4 : undefined;

  return (
    <>
      <Panel side="left" img={IMG.involvedHero} alt="Volunteers setting a long table with gold place cards and candles" wide>
        <div className="max-w-[820px] flex flex-col gap-4">
          <p className="stamp" data-reveal>{s('involved.stamp')}</p>
          <Rich as="h1" html={s('involved.title')} data-reveal />
          <p className="sub max-w-[52ch]" data-reveal>{s('involved.sub')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {cards.map((c) => {
              const inner = (
                <>
                  <span className="w-11 h-11 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}><i className={`${c.icon} text-lg`} /></span>
                  <h2 className="text-lg font-semibold mt-4 mb-1">{c.t}</h2>
                  <p className="text-sm m-0" style={{ color: 'var(--muted)' }}>{c.d}</p>
                  <span className="gold-line" />
                </>
              );
              return c.href.startsWith('#')
                ? <a key={c.t} href={c.href} className="card p-5 no-underline cursor-pointer" data-reveal>{inner}</a>
                : <Link key={c.t} to={c.href} className="card p-5 no-underline cursor-pointer" data-reveal>{inner}</Link>;
            })}
          </div>
        </div>
      </Panel>

      <Panel id="join" side="full" img={IMG.aboutValues} alt="Women applauding a graduate in a warm hall" wide>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center w-full max-w-[1200px] mx-auto">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <p className="stamp" data-reveal>{s('involved.formStamp')}</p>
            <Rich as="h2" html={s('involved.formTitle')} data-reveal />
            <p className="sub" data-reveal>{s('form.supportHelp')}</p>
          </div>
          <div className="lg:col-span-3"><VolunteerForm preset={preset} /></div>
        </div>
      </Panel>

      <Panel id="donate" side="left" img={IMG.donate} alt="Hands of women of different generations holding a glowing candle together" accent="♛">
        <p className="stamp" data-reveal>{s('involved.donateStamp')}</p>
        <Rich as="h2" html={s('involved.donateTitle')} data-reveal />
        <p className="sub" data-reveal>{s('involved.donate')}</p>
        <div data-reveal>
          {/* TODO: connect to CanadaHelps / Stripe / client's donation processor */}
          <a href="#donate" className="btn btn-gold !min-h-[56px] !px-8 text-base">{s('common.donateNow')} <i className="ri-heart-fill" /></a>
        </div>
        <p className="text-xs" style={{ color: 'var(--muted)' }} data-reveal>{s('involved.receipt')}</p>
      </Panel>
    </>
  );
}