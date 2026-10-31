import { describe, expect, it } from 'vitest';
import { listarSkus } from '@/data/skus';

const skus = listarSkus();
const porCategoria = (c: string) => skus.filter((s) => s.categoria === c);

describe('listarSkus', () => {
  it('retorna 54 SKUs com código único', () => {
    expect(skus).toHaveLength(54);
    expect(new Set(skus.map((s) => s.codigo)).size).toBe(54);
  });

  it('divide em 30 sabonetes, 16 body splash e 8 sais', () => {
    expect(porCategoria('sabonetes')).toHaveLength(30);
    expect(porCategoria('bodySplash')).toHaveLength(16);
    expect(porCategoria('sais')).toHaveLength(8);
  });

  it('sabonete: um SKU por produto, sem variante', () => {
    expect(skus[0]).toEqual({
      codigo: 'SAB01',
      nome: 'Sabonete de Amêndoa',
      categoria: 'sabonetes',
    });
    expect(porCategoria('sabonetes').every((s) => s.variante === undefined)).toBe(true);
  });

  it('body splash: um SKU por tamanho, com a variante preenchida', () => {
    const vidaBela = skus.filter((s) => s.nome === 'Body Splash A Vida é Bela');
    expect(vidaBela).toEqual([
      { codigo: 'BS01', nome: 'Body Splash A Vida é Bela', variante: '110ml', categoria: 'bodySplash' },
      { codigo: 'BS02', nome: 'Body Splash A Vida é Bela', variante: '30ml', categoria: 'bodySplash' },
    ]);
  });

  it('sais: um SKU por tamanho (300g/100g)', () => {
    const pitanga = skus.filter((s) => s.nome === 'Sal de Banho Pitanga Preta');
    expect(pitanga).toEqual([
      { codigo: 'SAL01', nome: 'Sal de Banho Pitanga Preta', variante: '300g', categoria: 'sais' },
      { codigo: 'SAL02', nome: 'Sal de Banho Pitanga Preta', variante: '100g', categoria: 'sais' },
    ]);
  });

  it('ordem estável: sabonetes, depois body splash, depois sais', () => {
    const ordem = skus.map((s) => s.categoria);
    expect(ordem.indexOf('bodySplash')).toBe(30);
    expect(ordem.indexOf('sais')).toBe(46);
  });
});
