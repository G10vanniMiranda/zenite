import './etapas.css';

// [dia de início, dia de fim, título, texto]
const ETAPAS = [
  [1, 5, 'Visita e projeto', 'Um técnico sobe no telhado, mede a área, confere sombra e quadro de luz. Você recebe o projeto com o número de painéis e o preço fechado.'],
  [6, 25, 'Pedido na distribuidora', 'Mandamos o projeto e a ART para a Equatorial Goiás e acompanhamos o parecer de acesso. Você não precisa ir a lugar nenhum.'],
  [26, 30, 'Instalação', 'Estrutura, painéis, inversor e proteção no quadro, em um ou dois dias de obra. A luz da casa só desliga na hora de ligar o inversor.'],
  [31, 45, 'Vistoria e medidor', 'A distribuidora vistoria e troca o medidor. A partir daí, o que sobra de dia vira crédito para a noite.'],
];
const TOTAL = 45;

export const etapas = () => `
<section class="secao etapas" id="como-funciona" aria-labelledby="etapas-titulo">
  <p class="rot mono" data-r>[ como funciona ]</p>
  <h2 class="titulo-sec" id="etapas-titulo" data-r>Do orçamento ao medidor novo: 45 dias.</h2>
  <ol class="linha-dias">
    ${ETAPAS.map(
      ([de, ate, t, txt], i) => `
    <li class="etapa" style="--i:${i}" data-r>
      <span class="etapa-barra" aria-hidden="true"></span>
      <p class="etapa-dia mono">Dia ${de}${ate > de ? `–${ate}` : ''}</p>
      <h3>${t}</h3>
      <p>${txt}</p>
    </li>`,
    ).join('')}
  </ol>
  <p class="etapas-pe mono" data-r><span>Dia 1</span><span>Dia ${TOTAL}: gerando</span></p>
</section>`;
