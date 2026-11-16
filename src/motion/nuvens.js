import { TAMANHOS, VELOCIDADE, DESFOQUE, LAYOUT } from '../data/nuvens.js';

const celular = matchMedia('(max-width: 760px)');

// Monta as nuvens de cada camada e calcula tamanho, posição e deriva em px.
export function montarNuvens(palco) {
  const caixas = [...palco.querySelectorAll('[data-nuvens]')];
  let modo = '';

  function montar() {
    const m = celular.matches ? 'celular' : 'desktop';
    if (m !== modo) {
      modo = m;
      for (const caixa of caixas) {
        caixa.innerHTML = LAYOUT[m][caixa.dataset.nuvens]
          .map(([n, , , , e, a = 1]) => {
            const [w, h] = TAMANHOS[n];
            return `<div class="nuvem"><img src="/img/nuvem-${n}.webp" width="${w}" height="${h}" alt="" decoding="async"${e ? ' class="e"' : ''}${a < 1 ? ` style="opacity:${a}"` : ''}></div>`;
          })
          .join('');
      }
    }
    posicionar();
  }

  function posicionar() {
    const L = palco.clientWidth;
    const A = palco.clientHeight;
    const u = (modo === 'celular' ? Math.max(L, 0.62 * A) : Math.min(L, 1.9 * A)) / 100;
    for (const caixa of caixas) {
      const camada = caixa.dataset.nuvens;
      caixa.closest('.camada').style.setProperty('--blur', `${((DESFOQUE[camada] * u) / 14).toFixed(2)}px`);
      LAYOUT[modo][camada].forEach(([n, x, cy, w], i) => {
        const el = caixa.children[i];
        const [nw, nh] = TAMANHOS[n];
        const W = w * u;
        const H = (W * nh) / nw;
        const inicio = -W - 90;
        const percurso = L + W + 180;
        const dur = percurso / (VELOCIDADE[camada] * u);
        const fase = (x * L - inicio) / percurso;
        // transform inline = posição parada (movimento reduzido); a animação CSS tem prioridade quando roda
        el.style.cssText =
          `width:${W.toFixed(1)}px;height:${H.toFixed(1)}px;top:${(cy * A - H / 2).toFixed(1)}px;` +
          `--de:${inicio.toFixed(1)}px;--ate:${(inicio + percurso).toFixed(1)}px;` +
          `animation-duration:${dur.toFixed(2)}s;animation-delay:${(-fase * dur).toFixed(2)}s;` +
          `transform:translate3d(${(x * L).toFixed(1)}px,0,0)`;
      });
    }
  }

  montar();
  let t;
  new ResizeObserver(() => {
    clearTimeout(t);
    t = setTimeout(montar, 120);
  }).observe(palco);
}
