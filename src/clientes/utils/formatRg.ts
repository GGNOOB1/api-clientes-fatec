export function formatRg(rg: string) {
  let valorFormatado = rg.replace(/[.-]/g, '');
  return valorFormatado;
}
