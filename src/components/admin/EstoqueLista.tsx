import { EstoqueLinha } from '@/components/admin/EstoqueLinha';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SKUS_POR_CATEGORIA } from '@/data/skusPorCategoria';
import type { Categoria } from '@/data/skus';

const CATEGORIAS: { key: Categoria; rotulo: string }[] = [
  { key: 'sabonetes', rotulo: 'Sabonetes' },
  { key: 'bodySplash', rotulo: 'Body Splash' },
  { key: 'sais', rotulo: 'Sais de Banho' },
];

export function EstoqueLista() {
  return (
    <Tabs defaultValue="sabonetes">
      <TabsList className="grid w-full grid-cols-3">
        {CATEGORIAS.map(({ key, rotulo }) => (
          <TabsTrigger key={key} value={key}>
            {rotulo} ({SKUS_POR_CATEGORIA[key].length})
          </TabsTrigger>
        ))}
      </TabsList>
      {CATEGORIAS.map(({ key }) => (
        <TabsContent key={key} value={key}>
          <ul className="divide-y">
            {SKUS_POR_CATEGORIA[key].map((sku) => (
              <EstoqueLinha key={sku.codigo} sku={sku} />
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}
