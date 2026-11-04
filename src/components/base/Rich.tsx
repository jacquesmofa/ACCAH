import type { ElementType } from 'react';

/** Converts dictionary markers into markup: [[word]] → italic-serif accent, || → line break. */
export const fmt = (str: string) => String(str)
  .replace(/\[\[(.+?)\]\]/g, '<em class="accent">$1</em>')
  .replace(/\|\|/g, '<br>');

interface RichProps { html: string; as?: ElementType; className?: string; [key: string]: unknown }

/** Renders dictionary strings that contain accent / line-break markers. */
export default function Rich({ html, as: Tag = 'span', className, ...rest }: RichProps) {
  return <Tag className={className} {...rest} dangerouslySetInnerHTML={{ __html: fmt(html) }} />;
}