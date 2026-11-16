// Cursor + saída no scroll, por quadro. Escreve só a caixa de fora de cada camada.
const CAMADAS = [
  // nome, profundidade, saída (× A), escala no fim
  ['ceu', 0.05, 0.06, 0],
  ['longe', 0.18, 0.16, 0],
  ['horizonte', 0.34, 0.32, 0],
  ['ilha', 0.58, 0.6, -0.14],
  ['frente', 1, 1.25, 0.38],
];

const limita = (v) => Math.min(1, Math.max(0, v));
const suave = (a, b, x) => {
  const t = limita((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function iniciarPalco({ hero, palco, nav }) {
  const camadas = CAMADAS.map(([n, prof, saida, escala]) => ({ el: palco.querySelector(`.c-${n}`), prof, saida, escala }));
  const ilha = palco.querySelector('.c-ilha');
  const muro = palco.querySelector('.c-muro');
  const veu = palco.querySelector('.veu');
  const sombra = palco.querySelector('.sombra-pinta');
  const texto = palco.querySelector('.hero-texto');
  const hud = palco.querySelector('.hud');

  let A = palco.offsetHeight;
  let curso = hero.offsetHeight - A;
  let alvoX = 0, alvoY = 0, mx = 0, my = 0;
  let alvoP = 0, p = 0;
  let chave = '';
  let antes = performance.now();
  let ativo = true;
  let raf = 0;

  const lerScroll = () => {
    alvoP = curso > 0 ? limita((scrollY - hero.offsetTop) / curso) : 0;
  };
  addEventListener('scroll', lerScroll, { passive: true });
  addEventListener('resize', () => {
    A = palco.offsetHeight;
    curso = hero.offsetHeight - A;
    lerScroll();
  });
  addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return; // parallax só com mouse
      alvoX = (e.clientX / innerWidth) * 2 - 1;
      alvoY = (e.clientY / innerHeight) * 2 - 1;
    },
    { passive: true },
  );
  lerScroll();
  p = alvoP;

  function escrever() {
    for (const c of camadas) {
      const s = c.escala ? ` scale(${(1 + p * c.escala).toFixed(4)})` : '';
      c.el.style.transform = `translate3d(${(-mx * 26 * c.prof).toFixed(2)}px,${(-my * 14 * c.prof - p * c.saida * A).toFixed(2)}px,0)${s}`;
    }
    ilha.style.opacity = (1 - suave(0.28, 0.58, p)).toFixed(3);
    muro.style.transform = `translate3d(${(-mx * 26 * 1.3).toFixed(2)}px,${((1.16 - 1.62 * p) * A).toFixed(2)}px,0)`;
    veu.style.opacity = suave(0.5, 0.9, p).toFixed(3);
    sombra.style.opacity = (1 - suave(0.02, 0.3, p)).toFixed(3);
    texto.style.transform = `translate3d(0,${(-p * 0.62 * A).toFixed(2)}px,0)`;
    texto.style.opacity = (1 - suave(0.02, 0.3, p)).toFixed(3);
    texto.style.visibility = p > 0.32 ? 'hidden' : '';
    hud.style.opacity = (1 - suave(0, 0.22, p)).toFixed(3);
    nav.classList.toggle('tinta', p > 0.82);
  }

  function quadro(t) {
    const passos = Math.min(4, (t - antes) / (1000 / 60)); // corrige pelo tempo do quadro
    antes = t;
    const k5 = 1 - Math.pow(1 - 0.05, passos);
    const k16 = 1 - Math.pow(1 - 0.16, passos);
    mx += (alvoX - mx) * k5;
    my += (alvoY - my) * k5;
    p += (alvoP - p) * k16;
    if (Math.abs(alvoP - p) < 1e-4) p = alvoP;

    const nova = `${mx.toFixed(3)}|${my.toFixed(3)}|${p.toFixed(4)}|${A}`;
    if (nova !== chave) {
      chave = nova;
      escrever();
    }
    raf = ativo ? requestAnimationFrame(quadro) : 0;
  }
  raf = requestAnimationFrame(quadro);

  // fora da tela: para o laço e pausa deriva, flutuação e giro
  new IntersectionObserver(([e]) => {
    ativo = e.isIntersecting;
    hero.classList.toggle('parado', !ativo);
    if (ativo && !raf) {
      antes = performance.now();
      raf = requestAnimationFrame(quadro);
    }
  }).observe(hero);
}
