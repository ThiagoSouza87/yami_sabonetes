import { bodySplashGrupos, saisGrupos, sabonetes, type BodySplashGrupo } from '@/data/catalogo';

export type Categoria = 'sabonetes' | 'bodySplash' | 'sais';

export interface Sku {
  codigo: string;
  nome: string;
  variante?: string;
  categoria: Categoria;
}

const skusDoGrupo = (grupo: BodySplashGrupo, categoria: Categoria): Sku[] =>
  grupo.tamanhos.map((t) => ({ codigo: t.codigo, nome: grupo.nome, variante: t.label, categoria }));

// Lista plana de itens vendáveis (1 por sabonete; 1 por tamanho em Body Splash e Sais).
export function listarSkus(): Sku[] {
  return [
    ...sabonetes.map((s): Sku => ({ codigo: s.codigo, nome: s.nome, categoria: 'sabonetes' })),
    ...bodySplashGrupos.flatMap((g) => skusDoGrupo(g, 'bodySplash')),
    ...saisGrupos.flatMap((g) => skusDoGrupo(g, 'sais')),
  ];
}
