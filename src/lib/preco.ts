export function precoParaNumero(preco: string): number {
  return parseFloat(preco.replace('R$', '').trim().replace(/\./g, '').replace(',', '.'));
}

const formatador = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatarPreco(valor: number): string {
  // Intl usa espaço não separável após "R$"; normaliza para espaço comum.
  return formatador.format(valor).replace(/\u00a0/g, ' ');
}
