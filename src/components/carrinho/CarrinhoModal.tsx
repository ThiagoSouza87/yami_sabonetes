import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ItemThumbnail } from '@/components/carrinho/ItemThumbnail';
import { urlWhatsApp } from '@/lib/pedido';
import { formatarPreco } from '@/lib/preco';
import { totalUnidades, totalValor, useCarrinho } from '@/store/carrinho';

const PINK = '#c26072';

interface CarrinhoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CarrinhoModal({ open, onOpenChange }: CarrinhoModalProps) {
  const itens = useCarrinho((s) => s.itens);
  const incrementar = useCarrinho((s) => s.incrementar);
  const decrementar = useCarrinho((s) => s.decrementar);
  const remover = useCarrinho((s) => s.remover);
  const limpar = useCarrinho((s) => s.limpar);
  const unidades = totalUnidades(itens);

  // Só limpa/fecha se a janela abriu; com pop-up bloqueado (null) o pedido é preservado.
  const finalizar = () => {
    const janela = window.open(urlWhatsApp(itens), '_blank');
    if (!janela) return;
    limpar();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90dvh] w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="space-y-1 border-b px-6 pb-4 pt-6 pr-12 text-left">
          <DialogTitle style={{ fontFamily: 'Floane, serif', color: PINK }} className="text-xl">
            Seu carrinho
          </DialogTitle>
          <DialogDescription>
            Revise os itens antes de finalizar o pedido.
            {unidades > 0 && (
              <span data-testid="contagem" className="ml-2 font-medium text-gray-700">
                {unidades} {unidades === 1 ? 'unidade' : 'unidades'}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          {itens.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <ShoppingBag size={40} className="text-gray-300" />
              <p className="text-sm font-medium text-gray-700">Seu carrinho está vazio.</p>
              <p className="text-xs text-gray-500">Adicione produtos pela vitrine para montar seu pedido.</p>
            </div>
          )}
          <ul className="divide-y">
            {itens.map((item) => (
              <li key={item.codigo} data-testid={`item-${item.codigo}`} className="flex items-start gap-3 py-4">
                <ItemThumbnail src={item.imagem} alt={item.nome} />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-800">{item.nome}</p>
                  {item.variante && <p className="text-xs text-gray-500">{item.variante}</p>}
                  {item.qtd > 1 && (
                    <p data-testid="preco-unit" className="text-xs text-gray-400">
                      {formatarPreco(item.precoUnit)} cada
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 rounded-full"
                      aria-label={`Diminuir quantidade de ${item.nome}`}
                      onClick={() => decrementar(item.codigo)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span data-testid="qtd" className="w-6 text-center text-sm font-medium">{item.qtd}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 rounded-full"
                      aria-label={`Aumentar quantidade de ${item.nome}`}
                      onClick={() => incrementar(item.codigo)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end justify-between self-stretch">
                  <span className="text-sm font-semibold" style={{ color: PINK }}>
                    {formatarPreco(item.precoUnit * item.qtd)}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remover ${item.nome}`}
                    className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    onClick={() => remover(item.codigo)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <DialogFooter className="flex-col gap-3 border-t bg-[#faf6f0] px-6 py-5 sm:flex-col sm:space-x-0">
          {itens.length > 0 && (
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-600">Total</span>
              <span data-testid="total" className="text-2xl font-bold" style={{ color: PINK }}>
                {formatarPreco(totalValor(itens))}
              </span>
            </div>
          )}
          <Button
            disabled={itens.length === 0}
            className="h-11 w-full text-base text-white hover:opacity-90"
            style={{ backgroundColor: PINK }}
            onClick={finalizar}
          >
            Finalizar no WhatsApp
          </Button>
          {itens.length > 0 && (
            <button
              type="button"
              className="mx-auto text-xs text-gray-500 underline-offset-2 transition-colors hover:text-red-500 hover:underline"
              onClick={limpar}
            >
              Limpar carrinho
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
