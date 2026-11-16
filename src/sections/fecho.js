import './fecho.css';
import { sistema } from '../data/sistema.js';
import { asterisco, seta } from './icones.js';

export const fecho = () => `
<section class="fecho" id="sistema" aria-labelledby="fecho-titulo">
  <p class="fecho-rot mono">[ o sistema dessa casa ]</p>
  <h2 class="fecho-titulo" id="fecho-titulo">A conta de luz caiu<br />de R$&nbsp;780 para R$&nbsp;86.</h2>
  <dl class="dados">
    ${sistema.dados.map(([r, v]) => `<div class="dado"><dt class="mono">${r}</dt><dd>${v.replaceAll('R$ ', () => 'R$&nbsp;')}</dd></div>`).join('')}
  </dl>
  <div class="fecho-cta">
    <a class="pill pill--tinta" href="#sistema"><span>Simular minha conta</span><span class="pill-c">${seta}</span></a>
    <p>Com a sua conta de luz em mãos, a simulação leva dois minutos.</p>
  </div>
  <footer class="rodape mono">
    <span class="marca">Zênite${asterisco('ast-mini')}</span>
    <span>Energia solar · Goiânia, GO</span>
    <span>Projeto, instalação e homologação</span>
  </footer>
</section>`;
