import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { urlWhatsApp } from '@/lib/pedido';
import { formatarPreco } from '@/lib/preco';
import { totalValor, useCarrinho } from '@/store/carrinho';

interface CarrinhoDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CarrinhoDrawer({ open, onOpenChange }: CarrinhoDrawerProps) {
  const itens = useCarrinho((s) => s.itens);
  const incrementar = useCarrinho((s) => s.incrementar);
  const decrementar = useCarrinho((s) => s.decrementar);
  const remover = useCarrinho((s) => s.remover);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Seu carrinho</SheetTitle>
          <SheetDescription>Revise os itens antes de finalizar o pedido.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          {itens.length === 0 && (
            <p className="text-center text-sm text-gray-500">Seu carrinho está vazio.</p>
          )}
          <ul className="space-y-4">
            {itens.map((item) => (
              <li key={item.codigo} data-testid={`item-${item.codigo}`} className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{item.nome}</p>
                  {item.variante && <p className="text-xs text-gray-500">{item.variante}</p>}
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      aria-label={`Diminuir quantidade de ${item.nome}`}
                      onClick={() => decrementar(item.codigo)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span data-testid="qtd" className="w-6 text-center text-sm">{item.qtd}</span>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      aria-label={`Aumentar quantidade de ${item.nome}`}
                      onClick={() => incrementar(item.codigo)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-semibold">{formatarPreco(item.precoUnit * item.qtd)}</span>
                  <button
                    type="button"
                    aria-label={`Remover ${item.nome}`}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => remover(item.codigo)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SheetFooter className="flex-col gap-3 sm:flex-col sm:space-x-0">
          {itens.length > 0 && (
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total</span>
              <span data-testid="total">{formatarPreco(totalValor(itens))}</span>
            </div>
          )}
          <Button
            disabled={itens.length === 0}
            className="w-full"
            onClick={() => window.open(urlWhatsApp(itens), '_blank')}
          >
            Finalizar no WhatsApp
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
