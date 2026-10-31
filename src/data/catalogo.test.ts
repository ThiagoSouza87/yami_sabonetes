import { describe, expect, it } from 'vitest';
import { bodySplashGrupos, saisGrupos, sabonetes } from '@/data/catalogo';

describe('catálogo', () => {
  it('tem 30 sabonetes, 8 grupos de Body Splash e 4 de Sais', () => {
    expect(sabonetes).toHaveLength(30);
    expect(bodySplashGrupos).toHaveLength(8);
    expect(saisGrupos).toHaveLength(4);
  });

  it('sabonete: primeiro item com código, nome e preço do catálogo', () => {
    expect(sabonetes[0]).toMatchObject({ codigo: 'SAB01', nome: 'Sabonete de Amêndoa', preco: 'R$ 17,00' });
  });

  it('body splash: cada grupo tem 110ml e 30ml, com códigos próprios', () => {
    const [primeiro] = bodySplashGrupos;
    expect(primeiro.nome).toBe('Body Splash A Vida é Bela');
    expect(primeiro.tamanhos.map((t) => [t.tamanho, t.codigo])).toEqual([
      ['110ml', 'BS01'],
      ['30ml', 'BS02'],
    ]);
    for (const g of bodySplashGrupos) expect(g.tamanhos.map((t) => t.tamanho)).toEqual(['110ml', '30ml']);
  });

  it('sais: cada grupo tem 300g e 100g, com códigos próprios', () => {
    const [primeiro] = saisGrupos;
    expect(primeiro.nome).toBe('Sal de Banho Pitanga Preta');
    expect(primeiro.tamanhos.map((t) => [t.tamanho, t.codigo])).toEqual([
      ['300g', 'SAL01'],
      ['100g', 'SAL02'],
    ]);
    for (const g of saisGrupos) expect(g.tamanhos.map((t) => t.tamanho)).toEqual(['300g', '100g']);
  });
});
