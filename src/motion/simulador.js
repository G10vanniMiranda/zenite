import { simular, reais, num, prazo } from '../data/simulacao.js';

// Liga o slider da simulação às saídas e leva o valor para o formulário de contato.
export function iniciarSimulador(secao, campoConta) {
  const range = secao.querySelector('#sim-conta');
  const out = Object.fromEntries([...secao.querySelectorAll('[data-sim]')].map((el) => [el.dataset.sim, el]));

  const atualizar = () => {
    const conta = Number(range.value);
    const r = simular(conta);
    out.conta.textContent = reais(conta);
    out.nova.textContent = reais(r.novaConta);
    out.paineis.textContent = `${r.paineis} × 550 W`;
    out.kwp.textContent = `${num(r.kwp, 2)} kWp`;
    out.geracao.textContent = `${num(r.geracao)} kWh/mês`;
    out.area.textContent = `${num(r.area)} m²`;
    out.ano.textContent = reais(r.economia * 12);
    out.retorno.textContent = prazo(r.meses);
    range.setAttribute('aria-valuetext', `${reais(conta)}: conta cai para ${reais(r.novaConta)}, ${r.paineis} painéis`);
    range.style.setProperty('--pos', `${((conta - range.min) / (range.max - range.min)) * 100}%`);
  };
  range.addEventListener('input', atualizar);
  atualizar();

  secao.querySelector('[data-sim-pedir]').addEventListener('click', () => {
    campoConta.value = range.value;
  });
}
