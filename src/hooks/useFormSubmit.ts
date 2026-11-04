import { useState, type FormEvent } from 'react';

export type FormStatus = 'idle' | 'sending' | 'success' | 'error';
export const HONEYPOT = 'website_alt';

/**
 * Submits a form as x-www-form-urlencoded to the built-in Forms endpoint.
 * validate() receives the FormData and returns a map of field errors (empty = valid).
 */
export default function useFormSubmit(url: string, validate: (fd: FormData) => Record<string, string>) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const trap = String(fd.get(HONEYPOT) || '').trim();
    if (trap) { setStatus('success'); return; }
    const errs = validate(fd);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    const body = new URLSearchParams();
    fd.forEach((v, k) => { if (k !== HONEYPOT && typeof v === 'string') body.append(k, v); });
    setStatus('sending'); setFormError('');
    try {
      const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      const responseText = await response.text();
      let parsed: { code?: string; message?: string; meta?: { message?: string; detail?: unknown } } | null = null;
      try { parsed = JSON.parse(responseText); } catch { parsed = null; }
      const serverMsg = String(parsed?.meta?.message || parsed?.message || (parsed?.meta?.detail ?? '') || responseText || '');
      if (response.ok && parsed?.code === 'OK' && !/spam/i.test(serverMsg)) {
        setStatus('success'); form.reset();
      } else {
        setFormError(serverMsg && serverMsg.length < 200 ? serverMsg : '');
        setStatus('error');
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '');
      setStatus('error');
    }
  };

  return { status, setStatus, formError, errors, onSubmit };
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);