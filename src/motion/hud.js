import { hora, kw } from '../data/sistema.js';

// Contagem da entrada e HUD vivo: relógio real a partir de 10:40, geração oscilando, total somando.
export function criarHud(raiz, { hud: d }) {
  const el = (k) => raiz.querySelector(`[data-hud="${k}"]`);
  const eHora = el('hora');
  const eKw = el('kw');
  const eKwh = el('kwh');

  const mostrar = (min, k, total) => {
    eHora.textContent = hora(min);
    eKw.textContent = kw(k);
    eKwh.textContent = kw(total);
  };

  return {
    // estado da contagem; o GSAP anima este objeto
    contador: { min: d.minutoInicio, kw: 0, kwh: 0 },
    mostrarContador() {
      mostrar(this.contador.min, this.contador.kw, this.contador.kwh);
    },
    zerar() {
      Object.assign(this.contador, { min: d.minutoInicio, kw: 0, kwh: 0 });
      this.mostrarContador();
    },
    vivo() {
      const t0 = performance.now();
      let antes = t0;
      let total = d.kwh;
      const meio = (d.kwMin + d.kwMax) / 2;
      const amp = (d.kwMax - d.kwMin) / 2;
      setInterval(() => {
        const agora = performance.now();
        const s = (agora - t0) / 1000;
        // duas ondas lentas: oscilação leve, sem padrão óbvio
        const k = meio + amp * (0.6 * Math.sin(s / 7) + 0.4 * Math.sin(s / 2.3 + 1));
        total += (k * (agora - antes)) / 3.6e6; // kW × ms → kWh
        antes = agora;
        mostrar(d.minuto + s / 60, k, total);
      }, 1000);
    },
  };
}
