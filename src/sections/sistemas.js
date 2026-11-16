import './sistemas.css';
import { simular, reais, num, prazo } from '../data/simulacao.js';

const FAIXAS = [400, 600, 780, 1000, 1500];
const CASA = 780;

const INCLUSO = [
  ['Projeto elétrico e ART', 'Assinado por engenheiro, com o desenho do telhado e do quadro.'],
  ['Painéis de 550 W', 'Monocristalinos, presos em estrutura de alumínio própria para o tipo de telha.'],
  ['Inversor e proteção', 'Inversor, disjuntor e protetor de surto no quadro, já dimensionados para a casa.'],
  ['Telha de barro, fibrocimento ou laje', 'A estrutura muda conforme o telhado. Telha quebrada na obra é trocada na hora.'],
  ['Papelada da distribuidora', 'Pedido de acesso, acompanhamento do parecer e vistoria na Equatorial Goiás.'],
  ['Geração no celular', 'O mesmo painel do topo da página: quanto está gerando agora e quanto já gerou no dia.'],
];

export const sistemas = () => `
<section class="secao sistemas" id="sistemas" aria-labelledby="sist-titulo">
  <p class="rot mono" data-r>[ sistemas ]</p>
  <h2 class="titulo-sec" id="sist-titulo" data-r>Quanto de sistema cada conta pede.</h2>
  <p class="sub-sec" data-r>Mesma conta da simulação, para as faixas que mais aparecem nos orçamentos.</p>

  <div class="tabela-rolo" data-r>
    <table class="tabela">
      <thead class="mono">
        <tr><th scope="col">Conta hoje</th><th scope="col">Painéis</th><th scope="col">Potência</th><th scope="col">Telhado</th><th scope="col">Conta depois</th><th scope="col">Retorno</th></tr>
      </thead>
      <tbody>
        ${FAIXAS.map((c) => {
          const r = simular(c);
          const casa = c === CASA;
          return `<tr${casa ? ' class="casa"' : ''}>
          <th scope="row">${reais(c)}${casa ? '<span class="tag mono">a casa do topo</span>' : ''}</th>
          <td data-l="Painéis">${r.paineis}</td><td data-l="Potência">${num(r.kwp, 2)} kWp</td><td data-l="Telhado">${num(r.area)} m²</td><td data-l="Conta depois">${reais(r.novaConta)}</td><td data-l="Retorno">${prazo(r.meses)}</td>
        </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>

  <h3 class="incluso-titulo" data-r>O que vem no preço</h3>
  <ul class="incluso">
    ${INCLUSO.map(([t, txt], i) => `<li style="--i:${i % 3}" data-r><h4>${t}</h4><p>${txt}</p></li>`).join('')}
  </ul>
</section>`;
