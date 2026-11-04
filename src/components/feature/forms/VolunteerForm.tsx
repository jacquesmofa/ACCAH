import { Link } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import useFormSubmit, { isEmail } from '@/hooks/useFormSubmit';
import { Field, Trap, FormFeedback, SuccessCard } from '@/components/feature/forms/FormBits';

// Form A — Volunteer / Join Our Network.
const FORM_URL = 'https://readdy.ai/api/form/dblc6adb5pdo4itvs6mg';

export default function VolunteerForm({ preset }: { preset?: number }) {
  const { s, o } = useTx();
  const areas = o<string[]>('form.areas');
  const { status, formError, errors, onSubmit } = useFormSubmit(FORM_URL, (fd) => {
    const e: Record<string, string> = {};
    ['first_name', 'last_name', 'email', 'phone', 'area_of_interest'].forEach((k) => { if (!String(fd.get(k) || '').trim()) e[k] = s('form.required'); });
    const em = String(fd.get('email') || '').trim();
    if (em && !isEmail(em)) e.email = s('form.invalidEmail');
    if (String(fd.get('message') || '').length > 500) e.message = s('form.tooLong');
    return e;
  });
  if (status === 'success') return <SuccessCard />;
  const inv = (n: string) => (errors[n] ? { 'aria-invalid': true, 'aria-describedby': `vol-${n}-err` } : {});

  return (
    <form id="volunteer-network" data-readdy-form className="form-card" onSubmit={onSubmit} noValidate>
      <Trap />
      <input type="hidden" name="subject" value="New Volunteer / Network Sign-up: CWFCS" />
      <input type="hidden" name="from_name" value="CWFCS Website" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="vol-first_name" label={s('form.firstName')} required error={errors.first_name}><input id="vol-first_name" name="first_name" className="input" autoComplete="given-name" {...inv('first_name')} /></Field>
        <Field id="vol-last_name" label={s('form.lastName')} required error={errors.last_name}><input id="vol-last_name" name="last_name" className="input" autoComplete="family-name" {...inv('last_name')} /></Field>
        <Field id="vol-email" label={s('form.email')} required error={errors.email}><input id="vol-email" name="email" type="email" className="input" autoComplete="email" {...inv('email')} /></Field>
        <Field id="vol-phone" label={s('form.phone')} required error={errors.phone}><input id="vol-phone" name="phone" type="tel" className="input" autoComplete="tel" {...inv('phone')} /></Field>
      </div>
      <div className="mt-4 grid gap-4">
        <Field id="vol-area_of_interest" label={s('form.area')} required help={s('form.areaHelp')} error={errors.area_of_interest}>
          <select key={preset} id="vol-area_of_interest" name="area_of_interest" className="input" defaultValue={preset !== undefined ? areas[preset] : ''} {...inv('area_of_interest')}>
            <option value="">{s('form.choose')}</option>
            {areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </Field>
        <Field id="vol-message" label={s('form.support')} help={s('form.supportHelp')} error={errors.message}>
          <textarea id="vol-message" name="message" maxLength={500} className="input" {...inv('message')} />
        </Field>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6" data-reveal>
        <button type="submit" className="btn btn-gold" disabled={status === 'sending'}>{status === 'sending' ? s('form.sending') : s('form.submit')}</button>
        <button type="submit" className="btn btn-outline" disabled={status === 'sending'}>{s('form.join')}</button>
        <Link to="/partners" className="btn btn-surface">{s('common.becomePartner')}</Link>
      </div>
      <FormFeedback status={status} formError={formError} />
    </form>
  );
}