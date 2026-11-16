// Asterisco-sol: 8 raios arredondados.
const raios = Array.from(
  { length: 8 },
  (_, i) => `<rect x="-6.5" y="-48" width="13" height="48" rx="6.5" transform="rotate(${i * 45})"/>`,
).join('');
export const asterisco = (cls = '') =>
  `<svg class="${cls}" viewBox="-50 -50 100 100" fill="currentColor" aria-hidden="true" focusable="false">${raios}</svg>`;

export const seta = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5"/></svg>`;
