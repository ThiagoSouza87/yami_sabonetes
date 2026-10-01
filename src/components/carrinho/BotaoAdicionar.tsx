import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { rotuloItem } from '@/lib/pedido';
import { useCarrinho, type ItemCarrinho } from '@/store/carrinho';

interface BotaoAdicionarProps {
  item: Omit<ItemCarrinho, 'qtd'>;
  color?: string;
}

export function BotaoAdicionar({ item, color }: BotaoAdicionarProps) {
  const adicionar = useCarrinho((s) => s.adicionar);

  return (
    <Button
      size="sm"
      variant="outline"
      className="text-xs px-3 py-1 h-7"
      style={color ? { borderColor: color, color } : undefined}
      onClick={() => {
        adicionar(item);
        toast.success(`${rotuloItem(item)} adicionado ao carrinho`);
      }}
    >
      Adicionar
    </Button>
  );
}
