import { ShoppingCart } from 'lucide-react';
import { totalUnidades, useCarrinho } from '@/store/carrinho';

interface CarrinhoHeaderProps {
  onClick: () => void;
  color?: string;
}

export function CarrinhoHeader({ onClick, color }: CarrinhoHeaderProps) {
  const unidades = useCarrinho((s) => totalUnidades(s.itens));

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={unidades > 0 ? `Abrir carrinho (${unidades} itens)` : 'Abrir carrinho'}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/60 transition-colors"
    >
      <ShoppingCart size={22} style={color ? { color } : undefined} />
      {unidades > 0 && (
        <span
          data-testid="carrinho-badge"
          className="absolute -right-1 -top-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold leading-[18px] text-center"
        >
          {unidades}
        </span>
      )}
    </button>
  );
}
