import './contato.css';
import { empresa } from '../data/empresa.js';
import { asterisco, seta } from './icones.js';
import { CONTA_INICIAL } from './simulacao.js';

const LINKS = [
  ['#como-funciona', 'Como funciona'],
  ['#simulacao', 'Simulação'],
  ['#sistemas', 'Sistemas'],
  ['#duvidas', 'Dúvidas'],
];

// fim da página: volta para o céu da manhã, com o sol (asterisco) e duas nuvens paradas
export const contato = () => `
<section class="secao contato" id="contato" aria-labelledby="cont-titulo">
  <div class="contato-ceu" aria-hidden="true">
    <span class="contato-sol">${asterisco('contato-sol-svg')}</span>
    <img class="contato-nuvem n-a" src="/img/nuvem-4.webp" width="434" height="255" alt="" loading="lazy" decoding="async" />
    <img class="contato-nuvem n-b" src="/img/nuvem-1.webp" width="1110" height="240" alt="" loading="lazy" decoding="async" />
  </div>

  <div class="contato-grade">
    <div class="contato-cab">
      <p class="rot mono" data-r>[ contato ]</p>
      <h2 class="titulo-sec" id="cont-titulo" data-r>Mande o valor da sua conta.</h2>
      <p class="sub-sec" data-r>Com a conta e o bairro, a gente volta com o número de painéis, o preço fechado e o dia da visita.</p>
    </div>

    <form class="form" id="form-contato" novalidate data-r>
      <label class="campo">
        <span class="mono">Seu nome</span>
        <input name="nome" autocomplete="name" required maxlength="80" />
      </label>
      <label class="campo">
        <span class="mono">Bairro</span>
        <input name="bairro" autocomplete="address-level3" required maxlength="80" />
      </label>
      <label class="campo">
        <span class="mono">Conta de luz por mês (R$)</span>
        <input name="conta" type="number" inputmode="numeric" min="50" max="50000" step="1" value="${CONTA_INICIAL}" required />
      </label>
      <p class="form-erro" role="alert" hidden></p>
      <button class="pill pill--tinta" type="submit"><span>Enviar pelo WhatsApp</span><span class="pill-c">${seta}</span></button>
      <p class="form-nota mono">Abre o WhatsApp com a mensagem pronta. Nada fica salvo neste site.</p>
    </form>
  </div>

  <footer class="rodape-fim mono">
    <span class="marca">${empresa.nome}${asterisco('ast-mini')}</span>
    <nav aria-label="Rodapé"><ul>${LINKS.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></nav>
    <span>Energia solar · ${empresa.cidade}</span>
    <span>© ${new Date().getFullYear()} ${empresa.nome}</span>
  </footer>
</section>`;
