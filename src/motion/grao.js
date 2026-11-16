// Um grão só, por cima de tudo: ladrilho de ruído cinza de 180 px gerado em canvas.
export function iniciarGrao() {
  const lado = 180;
  const c = document.createElement('canvas');
  c.width = c.height = lado;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(lado, lado);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);

  const grao = document.createElement('div');
  grao.className = 'grao';
  grao.setAttribute('aria-hidden', 'true');
  grao.style.backgroundImage = `url(${c.toDataURL('image/png')})`;
  document.body.append(grao);
}
