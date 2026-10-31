import { Card, CardContent } from '@/components/ui/card';
import { SKUS } from '@/data/skusPorCategoria';
import { useEstoque } from '@/store/estoque';

export function EstoqueResumo() {
  const quantidades = useEstoque((s) => s.quantidades);
  // Só conta os SKUs do catálogo atual (SKU antigo guardado no storage é ignorado).
  const zerados = SKUS.filter((s) => (quantidades[s.codigo] ?? 0) === 0).length;
  const unidades = SKUS.reduce((soma, s) => soma + (quantidades[s.codigo] ?? 0), 0);

  const itens: { id: string; rotulo: string; valor: number }[] = [
    { id: 'resumo-itens', rotulo: 'Itens cadastrados', valor: SKUS.length },
    { id: 'resumo-zerados', rotulo: 'Itens zerados', valor: zerados },
    { id: 'resumo-unidades', rotulo: 'Total de unidades', valor: unidades },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {itens.map(({ id, rotulo, valor }) => (
        <Card key={id}>
          <CardContent className="p-4">
            <p className="text-xs text-gray-500">{rotulo}</p>
            <p data-testid={id} className="text-2xl font-bold tabular-nums text-gray-800">{valor}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
