import './nav.css';

const LINKS = ['Como funciona', 'Simulação', 'Obras', 'Dúvidas'];

export const nav = () => `
<header class="nav" id="nav">
  <nav class="nav-in" aria-label="Principal" data-e>
    <ul>${LINKS.map((t) => `<li><a href="#sistema">${t}</a></li>`).join('')}</ul>
  </nav>
</header>`;
