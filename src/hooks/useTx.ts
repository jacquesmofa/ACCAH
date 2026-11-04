import { useTranslation } from 'react-i18next';

/** Typed access to dictionary entries (strings, arrays or objects). */
export default function useTx() {
  const { t, i18n } = useTranslation();
  const s = (key: string): string => t(key) as string;
  const o = <T,>(key: string): T => t(key, { returnObjects: true }) as unknown as T;
  return { s, o, lang: i18n.language === 'fr' ? 'fr' : 'en' as 'en' | 'fr' };
}