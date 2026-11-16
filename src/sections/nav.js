import './nav.css';

const LINKS = [
  ['#como-funciona', 'Como funciona'],
  ['#simulacao', 'Simulação'],
  ['#sistemas', 'Sistemas'],
  ['#duvidas', 'Dúvidas'],
];

export const nav = () => `
<header class="nav" id="nav">
  <nav class="nav-in" aria-label="Principal" data-e>
    <ul>${LINKS.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
  </nav>
</header>`;
