export const WEB3_KEY = '687b6788-72db-43ea-9b30-5358c1311f65';
export const FORM_EMAIL = 'african.canadian.arkofhope@gmail.com';
const WEB3_URL = 'https://api.web3forms.com/submit';

export type SendResult = { ok: boolean; message: string };

const readMessage = (parsed: Record<string, unknown> | null): string => {
  if (!parsed) return '';
  const candidates = [parsed.message, parsed.meta];
  for (const c of candidates) {
    if (typeof c === 'string' && c) return c;
    if (c && typeof c === 'object') {
      const detail = (c as Record<string, unknown>).message || (c as Record<string, unknown>).detail;
      if (typeof detail === 'string' && detail) return detail;
    }
  }
  return '';
};

/**
 * Sends any website form straight to the organization inbox through Web3Forms.
 * Every form uses its own hidden subject line so the inbox stays easy to triage.
 */
export async function sendToInbox(fd: FormData, subject: string, replyEmail?: string): Promise<SendResult> {
  const body = new URLSearchParams();
  body.append('access_key', WEB3_KEY);
  body.append('subject', subject);
  body.append('from_name', 'Ark of Hope Website');
  if (replyEmail) body.append('replyto', replyEmail);

  fd.forEach((value, key) => {
    if (key === 'website_alt' || key === 'botcheck') return;
    const text = String(value).trim();
    if (text) body.append(key, text);
  });

  try {
    const response = await fetch(WEB3_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: body.toString(),
    });
    const responseText = await response.text();
    let parsed: Record<string, unknown> | null = null;
    try {
      parsed = JSON.parse(responseText) as Record<string, unknown>;
    } catch {
      parsed = null;
    }
    const message = readMessage(parsed);
    const succeeded = response.ok && parsed?.success === true;
    if (succeeded) return { ok: true, message: '' };
    return { ok: false, message };
  } catch {
    return { ok: false, message: '' };
  }
}

export const isEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const readTrap = (fd: FormData, name: string): boolean => String(fd.get(name) || '').trim().length > 0;