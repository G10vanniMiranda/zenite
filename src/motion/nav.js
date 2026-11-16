// Nav some ao descer e volta ao subir; sempre visível no topo e ao receber foco.
export function iniciarNav(nav, { reduzido, fecho }) {
  let ultimo = scrollY;
  const atualizar = () => {
    const y = scrollY;
    if (y < 40) {
      nav.classList.remove('escondida');
      ultimo = y;
    } else if (y - ultimo > 4) {
      nav.classList.add('escondida');
      ultimo = y;
    } else if (ultimo - y > 4) {
      nav.classList.remove('escondida');
      ultimo = y;
    }
    // com movimento, quem pinta a nav de tinta é o palco (pelo progresso da saída)
    if (reduzido) nav.classList.toggle('tinta', fecho.getBoundingClientRect().top < nav.getBoundingClientRect().bottom);
  };
  addEventListener('scroll', atualizar, { passive: true });
  nav.addEventListener('focusin', () => nav.classList.remove('escondida'));
  atualizar();
}
