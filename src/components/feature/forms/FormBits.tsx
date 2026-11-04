import type { ReactNode } from 'react';
import useTx from '@/hooks/useTx';
import { HONEYPOT, type FormStatus } from '@/hooks/useFormSubmit';

export const EMAIL = 'crownedwomencommunityservices@gmail.com';

/** Labelled field wrapper with required mark, helper text and inline error. */
export function Field({ id, label, required, help, error, children, reveal = true }: { id: string; label: string; required?: boolean; help?: string; error?: string; children: ReactNode; reveal?: boolean }) {
  const { s } = useTx();
  return (
    <div className="field min-w-0" data-reveal={reveal ? '' : undefined}>
      <label htmlFor={id}>{label}{required && <span className="req" aria-label={s('form.requiredMark')}>*</span>}</label>
      {children}
      {help && <p className="help" id={`${id}-help`}>{help}</p>}
      {error && <p className="err" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

/** Off-screen anti-spam field. */
export function Trap() {
  return <input type="text" name={HONEYPOT} className="fx-aux" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly onFocus={(e) => e.currentTarget.removeAttribute('readonly')} />;
}

/** Success card / error message / privacy line under every form. */
export function FormFeedback({ status, formError }: { status: FormStatus; formError: string }) {
  const { s } = useTx();
  return (
    <>
      {status === 'error' && (
        <p className="text-sm mt-4" role="alert" style={{ color: 'var(--accent)' }}>
          {formError ? `${formError} · ` : ''}{s('form.error')} <a href={`mailto:${EMAIL}`} className="underline break-all">{EMAIL}</a>.
        </p>
      )}
      <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>{s('form.privacy')}</p>
    </>
  );
}

export function SuccessCard() {
  const { s } = useTx();
  return (
    <div className="form-card flex flex-col items-center text-center gap-4 py-12" role="status">
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>
        <i className="ri-check-line text-3xl" />
      </div>
      <p className="max-w-[40ch] text-base leading-relaxed">{s('form.success')}</p>
    </div>
  );
}