import './hero.css';
import { sistema, hora, kw } from '../data/sistema.js';
import { asterisco, seta } from './icones.js';

const letras = [...'Zênite'].map((c) => `<span class="l">${c}</span>`).join('');
const linhas = ['10 painéis pagam a conta de luz', 'de uma casa em Goiânia. Projeto,', 'instalação e homologação em 45 dias.'];
const { hud } = sistema;

// serra distante: base reta, desfeita por máscara no CSS
const serra = `<svg class="serra" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 120V62l40-7 45-15 35 6 50-16 45 8 45-12 40 8 40 16 50-6 40 8 50-16 40-14 40 8 40 14 50-4 50 14 50-8 40-14 40 6 50-10 50 14 40 6 30-4v76z"/></svg>`;

export const hero = () => `
<section class="hero" id="topo" aria-label="Zênite, energia solar em Goiânia">
  <div class="palco">
    <div class="camada c-ceu"><div class="camada-in" data-e><div class="ceu"></div>${serra}</div></div>
    <div class="camada c-longe"><div class="camada-in" data-e><div class="nuvens" data-nuvens="longe"></div></div></div>
    <div class="camada c-horizonte"><div class="camada-in" data-e><div class="nuvens" data-nuvens="horizonte"></div><div class="faixa faixa-h"></div></div></div>
    <div class="camada c-ilha">
      <div class="camada-in" data-e>
        <div class="ilha">
          <div class="ilha-nevoa"></div>
          <div class="ilha-flutua">
            <img src="/img/ilha.webp" width="1446" height="994" fetchpriority="high" decoding="async"
              alt="Casa caiada de porta azul com 10 painéis solares no telhado de barro, caixa d'água azul, mangueira, varal colorido, moto vermelha e um cachorro caramelo, sobre um pedaço de terra vermelha do cerrado flutuando no céu da manhã" />
            <div class="ilha-tom"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="camada c-frente"><div class="camada-in" data-e><div class="nuvens" data-nuvens="frente"></div><div class="faixa faixa-f"></div></div></div>
    <div class="sombra" aria-hidden="true"><div class="sombra-in" data-e><div class="sombra-pinta"></div></div></div>

    <div class="hud mono">
      <p class="hud-l" data-e>
        <span><span data-hud="hora">${hora(hud.minuto)}</span> · ${sistema.cidade} · ${sistema.latitude}</span>
        <span>Gerando agora <span data-hud="kw">${kw(hud.kw)}</span> kW</span>
      </p>
      <p class="hud-r" data-e>Hoje: <span data-hud="kwh">${kw(hud.kwh)}</span> de ${hud.kwhDia} kWh</p>
    </div>

    <div class="hero-texto">
      <div class="hero-grade">
        <h1 class="nome">
          <span class="sr">Zênite</span>
          <span class="nome-linha" aria-hidden="true" data-e>${letras}</span><span class="ast" aria-hidden="true" data-e>${asterisco('ast-svg')}</span>
        </h1>
        <div class="hero-lado">
          <p class="lead" data-e>${linhas.map((l) => `<span class="ln"><span>${l}</span></span>`).join(' ')}</p>
          <a class="pill" href="#simulacao" data-e><span>Simular minha conta</span><span class="pill-c">${seta}</span></a>
        </div>
      </div>
      <p class="dica mono" aria-hidden="true" data-e>[ role para ver o sistema ]</p>
    </div>

    <div class="camada c-muro" aria-hidden="true"><div class="nuvens" data-nuvens="muro"></div><div class="faixa faixa-m"></div></div>
    <div class="veu" aria-hidden="true"></div>
  </div>
</section>`;
