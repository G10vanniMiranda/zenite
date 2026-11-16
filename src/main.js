import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-mono/400.css';
import './styles/tokens.css';
import './styles/base.css';

import { sistema } from './data/sistema.js';
import { nav } from './sections/nav.js';
import { hero } from './sections/hero.js';
import { fecho } from './sections/fecho.js';
import { etapas } from './sections/etapas.js';
import { simulacao } from './sections/simulacao.js';
import { sistemas } from './sections/sistemas.js';
import { duvidas } from './sections/duvidas.js';
import { contato } from './sections/contato.js';
import { montarNuvens } from './motion/nuvens.js';
import { iniciarPalco } from './motion/palco.js';
import { prepararEntrada, esperarCena } from './motion/entrada.js';
import { criarHud } from './motion/hud.js';
import { iniciarNav } from './motion/nav.js';
import { iniciarGrao } from './motion/grao.js';
import { iniciarRevelar } from './motion/revelar.js';
import { iniciarSimulador } from './motion/simulador.js';
import { iniciarFormulario } from './motion/formulario.js';

const raiz = document.documentElement;
const reduzido = raiz.classList.contains('rm');

document.getElementById('app').innerHTML = `${nav()}<main>${hero()}${fecho()}${etapas()}${simulacao()}${sistemas()}${duvidas()}${contato()}</main>`;

const elNav = document.getElementById('nav');
const elHero = document.querySelector('.hero');
const palco = elHero.querySelector('.palco');
const hud = criarHud(palco.querySelector('.hud'), sistema);

montarNuvens(palco);
iniciarGrao();
iniciarNav(elNav, { reduzido, fecho: document.getElementById('sistema') });
const form = document.getElementById('form-contato');
iniciarSimulador(document.getElementById('simulacao'), form.elements.conta);
iniciarFormulario(form);
if (!reduzido) iniciarRevelar();

if (reduzido) {
  hud.vivo();
} else {
  const tocar = prepararEntrada({ palco, nav: elNav, hud });
  raiz.classList.add('pronto');
  iniciarPalco({ hero: elHero, palco, nav: elNav });
  esperarCena(palco).then(tocar);
}
