import { listarSkus, type Categoria, type Sku } from '@/data/skus';

export const SKUS = listarSkus();

export const SKUS_POR_CATEGORIA: Record<Categoria, Sku[]> = {
  sabonetes: SKUS.filter((s) => s.categoria === 'sabonetes'),
  bodySplash: SKUS.filter((s) => s.categoria === 'bodySplash'),
  sais: SKUS.filter((s) => s.categoria === 'sais'),
};
