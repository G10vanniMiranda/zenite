import './duvidas.css';

const DUVIDAS = [
  ['A conta zera?', 'Não. Sobra o custo de disponibilidade (o mínimo que toda ligação paga), a iluminação pública e a parte do uso da rede (Fio B) que a Lei 14.300 manda cobrar. Na casa do topo, isso dá R$ 86.'],
  ['E à noite, ou em dia nublado?', 'De dia, o que os painéis geram e a casa não usa vai para a rede e vira crédito em kWh. À noite e nos dias fracos, a casa gasta esses créditos. A conta fecha no mês, e o crédito que sobrar vale por 60 meses.'],
  ['Meu telhado aguenta?', 'Dez painéis pesam perto de 280 kg, espalhados em uns 26 m². Na visita, conferimos madeiramento e telhas antes de fechar o projeto. Se precisar de reforço, ele entra no orçamento.'],
  ['Quanto tempo duram os painéis?', 'Os fabricantes costumam garantir o desempenho dos painéis por 25 anos. O inversor trabalha mais e costuma ser trocado uma vez nesse período.'],
  ['Precisa limpar?', 'De outubro a abril, a chuva limpa. Na seca, a poeira derruba a geração: uma lavagem com água e pano macio entre junho e setembro resolve.'],
  ['Dá para parcelar?', 'Sim. A simulação sai à vista e parcelada, para você comparar a parcela com o que deixa de pagar de luz.'],
  ['E se eu mudar de casa?', 'O sistema é desmontado e reinstalado no telhado novo, com um novo pedido na distribuidora.'],
];

export const duvidas = () => `
<section class="secao duvidas" id="duvidas" aria-labelledby="duv-titulo">
  <div class="duvidas-grade">
    <div class="duvidas-cab">
      <p class="rot mono" data-r>[ dúvidas ]</p>
      <h2 class="titulo-sec" id="duv-titulo" data-r>O que todo mundo pergunta antes de fechar.</h2>
    </div>
    <div class="faq">
      ${DUVIDAS.map(
        ([q, a], i) => `<details style="--i:${Math.min(i, 3)}" data-r>
        <summary><span>${q}</span><span class="faq-mais" aria-hidden="true"></span></summary>
        <p>${a.replaceAll('R$ ', 'R$&nbsp;')}</p>
      </details>`,
      ).join('')}
    </div>
  </div>
</section>`;
