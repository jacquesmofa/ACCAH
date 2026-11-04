import { useSearchParams } from 'react-router-dom';
import useTx from '@/hooks/useTx';
import useFormSubmit, { isEmail } from '@/hooks/useFormSubmit';
import { Field, Trap, FormFeedback, SuccessCard } from '@/components/feature/forms/FormBits';

// Form B — Service Inquiry.
const FORM_URL = 'https://readdy.ai/api/form/dblc6adb5pdo4itvs6m0';
export const SERVICE_KEYS = ['counseling', 'mentorship', 'newcomer', 'shl', 'board', 'cgirls', 'general'];

export default function InquiryForm({ idSuffix = 'main' }: { idSuffix?: string }) {
  const { s, o } = useTx();
  const [params] = useSearchParams();
  const services = o<string[]>('form.services');
  const preIdx = SERVICE_KEYS.indexOf(params.get('service') || '');
  const isPartnership = params.get('subject') === 'cgirls-partnership';
  const subject = isPartnership ? 'CGIRLS Partnership: CWFCS' : 'New Service Inquiry: CWFCS';

  const { status, formError, errors, onSubmit } = useFormSubmit(FORM_URL, (fd) => {
    const e: Record<string, string> = {};
    ['first_name', 'last_name', 'email', 'phone', 'service_interest', 'message'].forEach((k) => { if (!String(fd.get(k) || '').trim()) e[k] = s('form.required'); });
    const em = String(fd.get('email') || '').trim();
    if (em && !isEmail(em)) e.email = s('form.invalidEmail');
    if (String(fd.get('message') || '').length > 500) e.message = s('form.tooLong');
    return e;
  });

  if (status === 'success') return <SuccessCard />;
  const id = (n: string) => `inq-${idSuffix}-${n}`;
  const inv = (n: string) => (errors[n] ? { 'aria-invalid': true, 'aria-describedby': `${id(n)}-err` } : {});

  return (
    <form id={`service-inquiry-${idSuffix}`} data-readdy-form className="form-card" onSubmit={onSubmit} noValidate>
      <Trap />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="from_name" value="CWFCS Website" />
      {isPartnership && <p className="stamp mb-4">{s('form.partnershipNote')}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id={id('first_name')} label={s('form.firstName')} required error={errors.first_name}><input id={id('first_name')} name="first_name" className="input" autoComplete="given-name" {...inv('first_name')} /></Field>
        <Field id={id('last_name')} label={s('form.lastName')} required error={errors.last_name}><input id={id('last_name')} name="last_name" className="input" autoComplete="family-name" {...inv('last_name')} /></Field>
        <Field id={id('email')} label={s('form.email')} required error={errors.email}><input id={id('email')} name="email" type="email" className="input" autoComplete="email" {...inv('email')} /></Field>
        <Field id={id('phone')} label={s('form.phone')} required error={errors.phone}><input id={id('phone')} name="phone" type="tel" className="input" autoComplete="tel" {...inv('phone')} /></Field>
      </div>
      <div className="mt-4 grid gap-4">
        <Field id={id('service_interest')} label={s('form.service')} required error={errors.service_interest}>
          <select key={preIdx} id={id('service_interest')} name="service_interest" className="input" defaultValue={preIdx >= 0 ? services[preIdx] : (isPartnership ? services[5] : '')} {...inv('service_interest')}>
            <option value="">{s('form.choose')}</option>
            {services.map((sv) => <option key={sv} value={sv}>{sv}</option>)}
          </select>
        </Field>
        <Field id={id('message')} label={s('form.message')} required error={errors.message}>
          <textarea id={id('message')} name="message" maxLength={500} className="input" {...inv('message')} />
        </Field>
      </div>
      <button type="submit" className="btn btn-gold w-full sm:w-auto mt-6" disabled={status === 'sending'} data-reveal>
        {status === 'sending' ? s('form.sending') : s('form.send')} <i className="ri-arrow-right-line" />
      </button>
      <FormFeedback status={status} formError={formError} />
    </form>
  );
}