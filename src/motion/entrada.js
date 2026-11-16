import { gsap } from 'gsap';

// Entrada em camadas. Escreve só a caixa de dentro de cada camada (a de fora é do palco.js).
// prepararEntrada aplica o estado inicial já no primeiro quadro e devolve a função que toca a entrada.
export function prepararEntrada({ palco, nav, hud }) {
  const q = (s) => palco.querySelector(s);
  const qa = (s) => palco.querySelectorAll(s);
  const A = palco.offsetHeight;

  const ceu = q('.c-ceu > .camada-in');
  const longe = q('.c-longe > .camada-in');
  const horizonte = q('.c-horizonte > .camada-in');
  const ilha = q('.c-ilha > .camada-in');
  const frente = q('.c-frente > .camada-in');
  const sombra = q('.sombra-in');
  const letras = qa('.nome .l');
  const ast = q('.ast');
  const lead = q('.lead');
  const linhas = qa('.lead .ln > span');
  const botao = q('.hero-lado .pill');
  const dica = q('.dica');
  const huds = qa('.hud-l, .hud-r');
  const navIn = nav.querySelector('.nav-in');

  gsap.set(ceu, { opacity: 0 });
  gsap.set(longe, { y: 40, opacity: 0 });
  gsap.set(horizonte, { y: 70, opacity: 0 });
  gsap.set(ilha, { y: 0.2 * A, scale: 0.94, opacity: 0 });
  gsap.set([frente, sombra], { y: 130, opacity: 0 });
  gsap.set(letras, { yPercent: 115 });
  gsap.set(ast, { scale: 0, rotation: -140 });
  gsap.set(linhas, { yPercent: 115 });
  gsap.set([navIn, ...huds], { opacity: 0, y: -10 });
  gsap.set(botao, { opacity: 0, y: 18 });
  gsap.set(dica, { opacity: 0 });
  hud.zerar();

  return function tocar() {
    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onComplete() {
        lead.classList.add('solto');
        gsap.set([ceu, longe, horizonte, ilha, frente, sombra, ast, navIn, ...huds, botao], { clearProps: 'transform' });
        hud.vivo();
      },
    });
    tl.to(ceu, { opacity: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
      .to(longe, { y: 0, opacity: 1, duration: 2.4 }, 0.3)
      .to(horizonte, { y: 0, opacity: 1, duration: 2.4 }, 0.45)
      .to(ilha, { y: 0, scale: 1, duration: 2.8, ease: 'power3.out' }, 0.6)
      .to(ilha, { opacity: 1, duration: 1.4, ease: 'power2.out' }, 0.6)
      .to([frente, sombra], { y: 0, opacity: 1, duration: 2.4 }, 0.8)
      .to(letras, { yPercent: 0, duration: 1.4, stagger: 0.065 }, 1.15)
      .to([navIn, ...huds], { opacity: 1, y: 0, duration: 1.2 }, 1.3)
      .to(hud.contador, { min: '+=300', kw: 4.1, kwh: 9.8, duration: 1.9, ease: 'power2.out', onUpdate: () => hud.mostrarContador() }, 1.3)
      .to(linhas, { yPercent: 0, duration: 1.2, stagger: 0.09 }, 1.4)
      .to(ast, { scale: 1, rotation: 0, duration: 1.6 }, 1.55)
      .to(botao, { opacity: 1, y: 0, duration: 1.2 }, 1.7)
      .to(dica, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 2.3);
  };
}

// Espera ilha, nuvens e fontes (no máximo 3 s).
export function esperarCena(palco) {
  const imagens = [...palco.querySelectorAll('img')].map((img) => img.decode().catch(() => {}));
  return Promise.race([
    Promise.all([...imagens, document.fonts.ready]),
    new Promise((r) => setTimeout(r, 3000)),
  ]);
}
