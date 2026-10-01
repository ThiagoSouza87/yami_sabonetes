import { describe, expect, it } from 'vitest';
import { formatarPreco, precoParaNumero } from '@/lib/preco';

describe('precoParaNumero', () => {
  it('converte "R$ 17,00" em 17', () => {
    expect(precoParaNumero('R$ 17,00')).toBe(17);
  });

  it('trata separador de milhar: "R$ 1.234,56" em 1234.56', () => {
    expect(precoParaNumero('R$ 1.234,56')).toBe(1234.56);
  });
});

describe('formatarPreco', () => {
  it('formata 17 como "R$ 17,00"', () => {
    expect(formatarPreco(17)).toBe('R$ 17,00');
  });

  it('formata milhar e centavos: 1234.5 como "R$ 1.234,50"', () => {
    expect(formatarPreco(1234.5)).toBe('R$ 1.234,50');
  });
});
