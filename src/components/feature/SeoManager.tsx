import useSeo from '@/hooks/useSeo';

/** Route-level head manager. Renders nothing. */
export default function SeoManager() {
  useSeo();
  return null;
}