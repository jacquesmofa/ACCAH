import useTx from '@/hooks/useTx';
import useFormSubmit, { isEmail } from '@/hooks/useFormSubmit';
import { Field, Trap, FormFeedback, SuccessCard } from '@/components/feature/forms/FormBits';

// Form C — Event RSVP.
const FORM_URL = 'https://readdy.ai/api/form/dblc6adb5pdo4itvs6n0';

export default function RsvpForm({ eventName }: { eventName: string }) {
  const { s } = useTx();
  const { status, formError, errors, onSubmit } = useFormSubmit(FORM_URL, (fd) => {
    const e: Record<string, string> = {};
    if (!String(fd.get('name') || '').trim()) e.name = s('form.required');
    const em = String(fd.get('email') || '').trim();
    if (!em) e.email = s('form.required'); else if (!isEmail(em)) e.email = s('form.invalidEmail');
    return e;
  });
  if (status === 'success') return <SuccessCard />;
  return (
    <form id="event-rsvp" data-readdy-form onSubmit={onSubmit} noValidate className="grid gap-4">
      <Trap />
      <input type="hidden" name="subject" value="New Event RSVP: CWFCS" />
      <input type="hidden" name="from_name" value="CWFCS Website" />
      <input type="hidden" name="event_name" value={eventName} />
      <Field reveal={false} id="rsvp-name" label={s('form.name')} required error={errors.name}><input id="rsvp-name" name="name" className="input" autoComplete="name" /></Field>
      <Field reveal={false} id="rsvp-email" label={s('form.email')} required error={errors.email}><input id="rsvp-email" name="email" type="email" className="input" autoComplete="email" /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field reveal={false} id="rsvp-phone" label={s('form.phone')}><input id="rsvp-phone" name="phone" type="tel" className="input" autoComplete="tel" /></Field>
        <Field reveal={false} id="rsvp-guests" label={s('form.guests')}><input id="rsvp-guests" name="number_of_guests" type="number" min={1} max={20} defaultValue={1} className="input" /></Field>
      </div>
      <button type="submit" className="btn btn-gold mt-2" disabled={status === 'sending'}>{status === 'sending' ? s('form.sending') : s('form.rsvp')}</button>
      <FormFeedback status={status} formError={formError} />
    </form>
  );
}