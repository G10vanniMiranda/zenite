import './simulacao.css';
import { seta } from './icones.js';

export const CONTA_INICIAL = 780;

const SAIDAS = [
  ['paineis', 'Painéis'],
  ['kwp', 'Potência'],
  ['geracao', 'Geração'],
  ['area', 'Telhado'],
  ['ano', 'Economia no ano'],
  ['retorno', 'Retorno'],
];

export const simulacao = () => `
<section class="secao simulacao" id="simulacao" aria-labelledby="sim-titulo">
  <p class="rot mono" data-r>[ simulação ]</p>
  <h2 class="titulo-sec" id="sim-titulo" data-r>Arraste até o valor da sua conta.</h2>

  <div class="sim" data-r>
    <label class="sim-rot mono" for="sim-conta">Sua conta de luz por mês</label>
    <p class="sim-conta" aria-hidden="true"><span data-sim="conta">R$ 780</span> <span class="sim-seta">→</span> <span data-sim="nova">R$ 86</span></p>
    <input class="sim-range" id="sim-conta" type="range" min="200" max="2000" step="10" value="${CONTA_INICIAL}" />
    <div class="sim-escala mono" aria-hidden="true"><span>R$ 200</span><span>R$ 2.000</span></div>

    <dl class="sim-saidas" aria-live="polite">
      ${SAIDAS.map(([k, r]) => `<div><dt class="mono">${r}</dt><dd data-sim="${k}"></dd></div>`).join('')}
    </dl>

    <div class="sim-cta">
      <a class="pill" href="#contato" data-sim-pedir><span>Pedir orçamento com esse valor</span><span class="pill-c">${seta}</span></a>
      <p class="mono">Estimativa para casa em Goiânia, telhado sem sombra e tarifa de hoje. O número fechado sai na visita.</p>
    </div>
  </div>
</section>`;
