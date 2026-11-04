import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FORM_EMAIL, isEmail, readTrap, sendToInbox } from '@/hooks/useFormSubmit';

export type FormVariant = 'volunteer' | 'experience' | 'ambassador' | 'partner' | 'contact' | 'donation';

type Base = { name: string; label: string; required?: boolean; span2?: boolean };
type TextField = Base & { kind: 'text'; type?: string; autoComplete?: string; placeholder?: string };
type SelectField = Base & { kind: 'select'; options: string[]; preset?: boolean };
type CheckboxField = Base & { kind: 'checkboxes'; options: string[]; hint?: string };
type AreaField = Base & { kind: 'textarea'; placeholder?: string; max?: number };
type Field = TextField | SelectField | CheckboxField | AreaField;

const SUBJECTS: Record<FormVariant, string> = {
  volunteer: 'New Volunteer Application',
  experience: 'New Experience Submission',
  ambassador: 'New Ambassador Interest',
  partner: 'New Partnership Inquiry',
  contact: 'New Contact Message',
  donation: 'New Donation Interest',
};

type Props = {
  variant: FormVariant;
  presetField?: string;
  presetValue?: string;
};

export default function ArkForm({ variant, presetField, presetValue }: Props) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [preset, setPreset] = useState(presetValue || '');

  useEffect(() => { setPreset(presetValue || ''); }, [presetValue]);

  const fields = useMemo<Field[]>(() => {
    const name: Field = { kind: 'text', name: 'name', label: t('form.name'), required: true, autoComplete: 'name' };
    const email: Field = { kind: 'text', name: 'email', label: t('form.email'), required: true, type: 'email', autoComplete: 'email' };
    const phone: Field = { kind: 'text', name: 'phone', label: t('form.phone'), type: 'tel', autoComplete: 'tel' };
    const message: AreaField = { kind: 'textarea', name: 'message', label: t('form.message'), placeholder: t('f.msgPh'), span2: true, max: 500, required: true };
    const language: Field = {
      kind: 'select', name: 'preferred_language', label: t('form.preferred'),
      options: [t('form.english'), t('form.french')],
    };

    switch (variant) {
      case 'volunteer':
        return [
          name, email, phone,
          { kind: 'text', name: 'languages', label: t('form.languages'), placeholder: 'English, Français, …' },
          {
            kind: 'checkboxes', name: 'areas_of_interest', label: t('f.areas'), span2: true, hint: t('f.areasHint'),
            options: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`f.vo${n}`)),
          },
          { kind: 'text', name: 'availability', label: t('form.availability') },
          { kind: 'text', name: 'accessibility_needs', label: t('form.accessibility') },
          message,
        ];
      case 'experience':
        return [
          name, email, phone, language,
          {
            kind: 'textarea', name: 'barriers', label: t('f.barriers'), placeholder: t('f.barriersPh'),
            span2: true, max: 500, required: true,
          },
          { ...message, required: false },
        ];
      case 'ambassador':
        return [
          name, email, phone,
          { kind: 'text', name: 'languages', label: t('form.languages') },
          { kind: 'text', name: 'community_connections', label: t('f.connections'), placeholder: t('f.connectionsPh') },
          message,
        ];
      case 'partner':
        return [
          name,
          { kind: 'text', name: 'organization', label: t('form.organization'), autoComplete: 'organization', required: true },
          email, phone,
          { kind: 'text', name: 'expertise', label: t('f.expertise') },
          { kind: 'text', name: 'contribution', label: t('f.contribution'), placeholder: t('f.contributionPh') },
          message,
        ];
      case 'donation':
        return [
          name, email, phone,
          {
            kind: 'select', name: 'option', label: t('f.option'), required: true, preset: true,
            options: [1, 2, 3, 4, 5].map((n) => t(`dn.o${n}`)),
          },
          { ...message, required: false },
        ];
      case 'contact':
      default:
        return [
          name,
          { kind: 'text', name: 'organization', label: t('form.organization'), autoComplete: 'organization' },
          email, phone, language,
          {
            kind: 'select', name: 'reason', label: t('f.reason'), required: true, preset: true,
            options: [1, 2, 3, 4, 5, 6].map((n) => t(`cn.r${n}`)),
          },
          message,
        ];
    }
  }, [t, variant]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    if (readTrap(fd, 'website_alt')) {
      setStatus('success');
      setFormError('');
      return;
    }

    const nameValue = String(fd.get('name') || '').trim();
    const emailValue = String(fd.get('email') || '').trim();
    const missing = fields.find((f) => f.required && f.kind !== 'checkboxes' && !String(fd.get(f.name) || '').trim());

    if (!nameValue) { setStatus('error'); setFormError(t('form.vName')); return; }
    if (!isEmail(emailValue)) { setStatus('error'); setFormError(t('form.vEmail')); return; }
    if (missing) { setStatus('error'); setFormError(t('form.vRequired')); return; }
    const overflow = fields.find((f) => (f.kind === 'textarea') && String(fd.get(f.name) || '').length > 500);
    if (overflow) { setStatus('error'); setFormError(t('form.vMessage')); return; }
    if (!fd.get('consent')) { setStatus('error'); setFormError(t('form.vConsent')); return; }

    setStatus('sending');
    setFormError('');
    const result = await sendToInbox(fd, SUBJECTS[variant], emailValue);

    if (result.ok) {
      setStatus('success');
      setCounts({});
      form.reset();
    } else {
      setStatus('error');
      setFormError(result.message || t('form.err'));
    }
  };

  if (status === 'success') {
    return (
      <div className="form-card relative min-w-0">
        <div className="form-success" role="status">
          <span className="tick" aria-hidden="true"><i className="ri-check-line text-2xl"></i></span>
          <div>
            <p className="m-0 font-semibold text-base">{t('form.ok')}</p>
            <p className="form-fine mt-2 mb-0">{t('form.notice')}</p>
          </div>
        </div>
        <button type="button" className="cta-outline mt-5" onClick={() => { setStatus('idle'); setFormError(''); }}>
          {t('form.again')}
        </button>
      </div>
    );
  }

  return (
    <form id={`ark-form-${variant}`} data-readdy-form onSubmit={onSubmit} noValidate className="form-card relative min-w-0">
      <input type="text" name="website_alt" className="fld-aux" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly />
      <input type="checkbox" name="botcheck" className="fld-aux" tabIndex={-1} aria-hidden="true" />
      <p className="form-fine !mt-0 mb-4">{t('form.required')}</p>
      <div className="fgrid">
        {fields.map((f) => {
          if (f.kind === 'checkboxes') {
            return (
              <fieldset key={f.name} className={`fgroup border-0 p-0 m-0 min-w-0 ${f.span2 ? 'span2' : ''}`}>
                <legend className="flabel">{f.label}</legend>
                {f.hint ? <p className="form-fine !mt-0 mb-2">{f.hint}</p> : null}
                <div className="fcheck">
                  {f.options.map((o) => (
                    <label key={o}>
                      <input type="checkbox" name={f.name} value={o} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          }

          if (f.kind === 'textarea') {
            const typed = counts[f.name] || 0;
            return (
              <label key={f.name} className={`min-w-0 ${f.span2 ? 'span2' : ''}`}>
                <span className="flabel">{f.label}{f.required ? ' *' : ''}</span>
                <textarea
                  className="finput resize-none"
                  name={f.name}
                  rows={4}
                  maxLength={f.max || 500}
                  required={f.required}
                  placeholder={f.placeholder}
                  onChange={(e) => setCounts((c) => ({ ...c, [f.name]: e.target.value.length }))}
                />
                <span className="block text-right text-xs text-foreground-400 mt-1">{typed}/500</span>
              </label>
            );
          }

          if (f.kind === 'select') {
            const isPreset = Boolean(f.preset);
            return (
              <label key={f.name} className={`min-w-0 ${f.span2 ? 'span2' : ''}`}>
                <span className="flabel">{f.label}{f.required ? ' *' : ''}</span>
                {isPreset ? (
                  <select className="finput" name={f.name} value={preset || f.options[0]} onChange={(e) => setPreset(e.target.value)}>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <select className="finput" name={f.name} defaultValue={f.options[0]}>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                )}
              </label>
            );
          }

          return (
            <label key={f.name} className={`min-w-0 ${f.span2 ? 'span2' : ''}`}>
              <span className="flabel">{f.label}{f.required ? ' *' : ''}</span>
              <input
                className="finput"
                type={f.type || 'text'}
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
              />
            </label>
          );
        })}
        <label className="span2 flex items-start gap-3 text-sm text-foreground-200 cursor-pointer">
          <input type="checkbox" name="consent" value="Yes" className="mt-1 w-4 h-4 accent-primary-500" />
          <span>{t('form.consent')}</span>
        </label>
      </div>

      <button type="submit" className="cta w-full justify-center mt-5 whitespace-nowrap" disabled={status === 'sending'}>
        {status === 'sending' ? t('form.sending') : t('form.send')} <i className="ri-send-plane-line"></i>
      </button>

      <div aria-live="polite" className="mt-4 text-sm">
        {status === 'error' && formError ? (
          <p className="m-0 text-primary-300 flex items-start gap-2" role="alert">
            <i className="ri-error-warning-line mt-0.5"></i>
            <span>{formError}</span>
          </p>
        ) : null}
      </div>

      <p className="form-fine mt-3 mb-0">{t('form.notice')}</p>
      <p className="m-0 mt-2 text-xs text-foreground-500 break-all">
        <a className="text-foreground-400 hover:text-primary-500" href={`mailto:${FORM_EMAIL}`}>{FORM_EMAIL}</a>
      </p>
    </form>
  );
}

