import { useRef, useState, type KeyboardEvent } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Sku } from '@/data/skus';
import { useEstoque } from '@/store/estoque';

const rotulo = (sku: Sku) => (sku.variante ? `${sku.nome} (${sku.variante})` : sku.nome);

export function EstoqueLinha({ sku }: { sku: Sku }) {
  const qtd = useEstoque((s) => s.quantidades[sku.codigo] ?? 0);
  const definir = useEstoque((s) => s.definir);
  const ajustar = useEstoque((s) => s.ajustar);
  // Rascunho do campo: null = espelha o valor salvo. O digitado só vira estoque no blur/Enter.
  const [rascunho, setRascunho] = useState<string | null>(null);
  const descartar = useRef(false); // Esc: o blur que ele provoca não pode gravar o rascunho

  const gravar = () => {
    const texto = (rascunho ?? '').trim();
    if (!descartar.current && rascunho !== null && /^\d+$/.test(texto)) definir(sku.codigo, Number(texto));
    descartar.current = false;
    setRascunho(null); // inválido (ou fora do limite): o campo volta ao valor salvo
  };

  const aoTeclar = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur();
    if (e.key === 'Escape') {
      descartar.current = true;
      e.currentTarget.blur();
    }
  };

  return (
    <li
      data-testid={`sku-${sku.codigo}`}
      className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-800">{sku.nome}</p>
        <p className="flex items-center gap-2 text-xs text-gray-500">
          {sku.variante && <span>{sku.variante}</span>}
          <span className="font-mono">{sku.codigo}</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        {qtd === 0 && <Badge variant="outline" className="border-red-200 text-red-600">Zerado</Badge>}
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="h-9 w-9"
          aria-label={`Diminuir estoque de ${rotulo(sku)}`}
          disabled={qtd === 0}
          onClick={() => ajustar(sku.codigo, -1)}
        >
          <Minus size={16} />
        </Button>
        <Input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          aria-label={`Quantidade em estoque de ${rotulo(sku)}`}
          className="h-9 w-20 text-center tabular-nums"
          value={rascunho ?? String(qtd)}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => setRascunho(e.target.value)}
          onBlur={gravar}
          onKeyDown={aoTeclar}
        />
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="h-9 w-9"
          aria-label={`Aumentar estoque de ${rotulo(sku)}`}
          onClick={() => ajustar(sku.codigo, 1)}
        >
          <Plus size={16} />
        </Button>
      </div>
    </li>
  );
}
