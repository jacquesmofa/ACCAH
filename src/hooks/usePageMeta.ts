import { useEffect } from 'react';
import useTx from '@/hooks/useTx';

/** Sets the document title and meta description for the current route + language. */
export default function usePageMeta(key: string) {
  const { o, lang } = useTx();
  const [title, desc] = o<string[]>(`meta.${key}`);
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', desc);
  }, [title, desc, lang]);
}