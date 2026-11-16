import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-mono/400.css';
import './styles/tokens.css';
import './styles/base.css';

import { sistema } from './data/sistema.js';
import { nav } from './sections/nav.js';
import { hero } from './sections/hero.js';
import { fecho } from './sections/fecho.js';
import { montarNuvens } from './motion/nuvens.js';
import { iniciarPalco } from './motion/palco.js';
import { prepararEntrada, esperarCena } from './motion/entrada.js';
import { criarHud } from './motion/hud.js';
import { iniciarNav } from './motion/nav.js';
import { iniciarGrao } from './motion/grao.js';

const raiz = document.documentElement;
const reduzido = raiz.classList.contains('rm');

document.getElementById('app').innerHTML = `${nav()}<main>${hero()}${fecho()}</main>`;

const elNav = document.getElementById('nav');
const elHero = document.querySelector('.hero');
const palco = elHero.querySelector('.palco');
const hud = criarHud(palco.querySelector('.hud'), sistema);

montarNuvens(palco);
iniciarGrao();
iniciarNav(elNav, { reduzido, fecho: document.getElementById('sistema') });

if (reduzido) {
  hud.vivo();
} else {
  const tocar = prepararEntrada({ palco, nav: elNav, hud });
  raiz.classList.add('pronto');
  iniciarPalco({ hero: elHero, palco, nav: elNav });
  esperarCena(palco).then(tocar);
}
