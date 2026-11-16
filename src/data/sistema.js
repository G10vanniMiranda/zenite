// Números da casa. Troque aqui para outra obra.
export const sistema = {
  cidade: 'Goiânia',
  latitude: '16°40′S',
  hud: {
    minutoInicio: 5 * 60 + 40, // 05:40, início da contagem
    minuto: 10 * 60 + 40, // 10:40
    kw: 4.1, // gerando agora
    kwMin: 4.0,
    kwMax: 4.2,
    kwh: 9.8, // gerado hoje
    kwhDia: 27,
  },
  dados: [
    ['Painéis', '10 × 550 W'],
    ['Potência', '5,5 kWp'],
    ['Geração', '27 kWh/dia'],
    ['No mês', '810 kWh'],
    ['Conta', 'R$ 780 → R$ 86'],
    ['Retorno', '2 anos e 9 meses'],
  ],
};

export const kw = (v) => v.toFixed(1).replace('.', ',');
export const hora = (min) => {
  const m = Math.floor(min) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
