import { formatarPreco } from '@/lib/preco';
import { totalValor, type ItemCarrinho } from '@/store/carrinho';

const WHATSAPP_NUMERO = '5519991743043';

export function linkWhatsApp(texto: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

export function rotuloItem(item: Pick<ItemCarrinho, 'nome' | 'variante'>): string {
  return item.variante ? `${item.nome} (${item.variante})` : item.nome;
}

export function montarMensagemPedido(itens: ItemCarrinho[]): string {
  const linhas = itens.map((i) => `- ${rotuloItem(i)} x${i.qtd} — ${formatarPreco(i.precoUnit * i.qtd)}`);
  return ['Olá! Quero finalizar meu pedido:', ...linhas, `Total: ${formatarPreco(totalValor(itens))}`].join('\n');
}

export function urlWhatsApp(itens: ItemCarrinho[]): string {
  return linkWhatsApp(montarMensagemPedido(itens));
}
