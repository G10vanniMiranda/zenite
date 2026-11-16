// Seções depois do hero: cada [data-r] sobe e aparece uma vez, ao entrar na tela.
export function iniciarRevelar(raiz = document) {
  const els = raiz.querySelectorAll('[data-r]');
  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('visto');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  els.forEach((el) => io.observe(el));
}
