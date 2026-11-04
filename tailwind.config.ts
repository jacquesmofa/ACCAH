/** @type {import('tailwindcss').Config} */
const scale = (role: string) => {
  const out: Record<string, string> = {};
  ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].forEach((k) => {
    out[k] = `oklch(var(--${role}-${k}) / <alpha-value>)`;
  });
  return out;
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: scale('background'),
        foreground: scale('foreground'),
        primary: scale('primary'),
        accent: scale('accent'),
        secondary: scale('secondary'),
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        body: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
        display: ['var(--font-heading)'],
        serif: ['var(--font-heading)'],
        label: ['var(--font-label)'],
      },
    },
  },
  plugins: [],
};