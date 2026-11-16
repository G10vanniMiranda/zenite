import { empresa } from '../data/empresa.js';
import { simular, reais } from '../data/simulacao.js';

// Valida o formulário e abre o WhatsApp com a mensagem pronta. Nada vai para servidor.
export function iniciarFormulario(form) {
  const erro = form.querySelector('.form-erro');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const campos = [...form.elements].filter((el) => el.name);
    for (const el of campos) el.setAttribute('aria-invalid', String(!el.checkValidity() || !el.value.trim()));
    const ruim = campos.find((el) => el.getAttribute('aria-invalid') === 'true');
    if (ruim) {
      erro.textContent = ruim.name === 'conta' ? 'Coloque o valor da conta entre R$ 50 e R$ 50.000.' : 'Preencha nome e bairro.';
      erro.hidden = false;
      ruim.focus();
      return;
    }
    erro.hidden = true;

    const { nome, bairro, conta } = Object.fromEntries(new FormData(form));
    const r = simular(Number(conta));
    const msg =
      `Olá, sou ${nome.trim()}, do bairro ${bairro.trim()}. ` +
      `Minha conta de luz é ${reais(Number(conta))} por mês. ` +
      `A simulação do site deu ${r.paineis} painéis e conta de ${reais(r.novaConta)}. Quero marcar a visita.`;
    window.open(`https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
}
