// Simulação da conta. Calibrada para bater com a casa do topo:
// R$ 780 → R$ 86, 10 painéis de 550 W, 810 kWh/mês, retorno em 2 anos e 9 meses.
// shortcut: tarifa única e custo linear por kWp (sistema pequeno custa mais por kWp); trocar pela tabela de preços real.
export const PARAM = {
  tarifa: 0.963, // R$ por kWh com impostos (780 / 810)
  compensa: 0.857, // R$ por kWh compensado, já sem o Fio B
  kwhPorKwpMes: 147.3, // Goiânia: 27 kWh/dia em 5,5 kWp, 30 dias
  painelW: 550,
  painelM2: 2.6,
  custoKwp: 4164, // R$ por kWp instalado
  piso: 60, // R$: custo de disponibilidade + iluminação pública
  minPaineis: 4,
};

export function simular(conta, P = PARAM) {
  const consumo = conta / P.tarifa;
  const porPainel = (P.kwhPorKwpMes * P.painelW) / 1000;
  const paineis = Math.max(P.minPaineis, Math.round(consumo / porPainel));
  const kwp = (paineis * P.painelW) / 1000;
  const geracao = kwp * P.kwhPorKwpMes;
  const novaConta = Math.max(P.piso, conta - Math.min(geracao, consumo) * P.compensa);
  const economia = conta - novaConta;
  const custo = kwp * P.custoKwp;
  return {
    consumo,
    paineis,
    kwp,
    geracao,
    area: paineis * P.painelM2,
    novaConta,
    economia,
    custo,
    meses: Math.round(custo / economia),
  };
}

const fmt = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 });
export const reais = (v) => `R$ ${fmt.format(Math.round(v))}`;
export const num = (v, casas = 0) => v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
export const prazo = (meses) => {
  const a = Math.floor(meses / 12);
  const m = meses % 12;
  const ta = a ? `${a} ${a === 1 ? 'ano' : 'anos'}` : '';
  const tm = m ? `${m} ${m === 1 ? 'mês' : 'meses'}` : '';
  return ta && tm ? `${ta} e ${tm}` : ta || tm;
};
