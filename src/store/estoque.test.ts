import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEstoque } from '@/store/estoque';

const acoes = () => useEstoque.getState();

beforeEach(() => {
  localStorage.clear();
  useEstoque.setState({ quantidades: {} });
});

describe('quantidade', () => {
  it('SKU sem registro conta como 0', () => {
    expect(acoes().quantidade('SAB01')).toBe(0);
  });
});

describe('definir', () => {
  it('grava a quantidade exata do SKU', () => {
    acoes().definir('SAB01', 12);
    expect(acoes().quantidade('SAB01')).toBe(12);
    expect(acoes().quantidade('SAB02')).toBe(0);
  });

  it('aceita 0 e o limite 99999', () => {
    acoes().definir('SAB01', 5);
    acoes().definir('SAB01', 0);
    expect(acoes().quantidade('SAB01')).toBe(0);
    acoes().definir('SAB01', 99999);
    expect(acoes().quantidade('SAB01')).toBe(99999);
  });

  it.each([-3, 2.5, NaN, Infinity, 100000, '7' as unknown as number])(
    'valor inválido (%s) não altera o estoque salvo',
    (invalido) => {
      acoes().definir('SAB01', 8);
      acoes().definir('SAB01', invalido);
      expect(acoes().quantidade('SAB01')).toBe(8);
    },
  );
});

describe('ajustar', () => {
  it('soma o delta à quantidade atual', () => {
    acoes().definir('BS01', 10);
    acoes().ajustar('BS01', 1);
    acoes().ajustar('BS01', -4);
    expect(acoes().quantidade('BS01')).toBe(7);
  });

  it('nunca fica negativo', () => {
    acoes().ajustar('BS01', -1);
    expect(acoes().quantidade('BS01')).toBe(0);
    acoes().definir('BS01', 2);
    acoes().ajustar('BS01', -50);
    expect(acoes().quantidade('BS01')).toBe(0);
  });

  it('não passa de 99999', () => {
    acoes().definir('BS01', 99998);
    acoes().ajustar('BS01', 10);
    expect(acoes().quantidade('BS01')).toBe(99999);
  });

  it('delta inválido (decimal/NaN) é ignorado', () => {
    acoes().definir('BS01', 4);
    acoes().ajustar('BS01', 0.5);
    acoes().ajustar('BS01', NaN);
    expect(acoes().quantidade('BS01')).toBe(4);
  });
});

// "Recarregar a página": zera a memória e relê o que estava no localStorage.
// (setState em store persistida regrava o storage, então o conteúdo cru é recolocado antes.)
const CHAVE = 'yami-estoque-v1';
const recarregar = async (conteudoCru: string | null = localStorage.getItem(CHAVE)) => {
  useEstoque.setState({ quantidades: {} });
  if (conteudoCru === null) localStorage.removeItem(CHAVE);
  else localStorage.setItem(CHAVE, conteudoCru);
  await useEstoque.persist.rehydrate();
};

describe('persistência (localStorage)', () => {
  afterEach(() => vi.restoreAllMocks());

  it('grava na chave yami-estoque-v1 e restaura ao recarregar', async () => {
    acoes().definir('SAB01', 12);
    acoes().definir('BS02', 3);

    expect(JSON.parse(localStorage.getItem('yami-estoque-v1')!).state.quantidades).toEqual({ SAB01: 12, BS02: 3 });

    await recarregar();
    expect(acoes().quantidade('SAB01')).toBe(12);
    expect(acoes().quantidade('BS02')).toBe(3);
  });

  it('JSON corrompido no storage: começa vazio, sem erro', async () => {
    await expect(recarregar('{isso não é json')).resolves.not.toThrow();
    expect(acoes().quantidades).toEqual({});
    expect(acoes().quantidade('SAB01')).toBe(0);
  });

  it.each([
    ['quantidade negativa', { SAB01: -5 }],
    ['quantidade decimal', { SAB01: 1.5 }],
    ['quantidade texto', { SAB01: 'muitos' }],
    ['acima do limite', { SAB01: 100000 }],
  ])('formato inesperado (%s): começa vazio', async (_nome, quantidades) => {
    await recarregar(JSON.stringify({ state: { quantidades }, version: 0 }));
    expect(acoes().quantidades).toEqual({});
  });

  it('estrutura sem "quantidades": começa vazio', async () => {
    await recarregar(JSON.stringify({ state: { outra: 1 }, version: 0 }));
    expect(acoes().quantidades).toEqual({});
  });

  it('storage cheio (setItem lança): a tela segue funcionando em memória', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('cheio', 'QuotaExceededError');
    });
    expect(() => acoes().definir('SAB01', 4)).not.toThrow();
    expect(acoes().quantidade('SAB01')).toBe(4);
  });

  it('SKU que não existe mais no catálogo continua guardado, sem quebrar a leitura', async () => {
    acoes().definir('SKU_ANTIGO', 7);
    await recarregar();
    expect(acoes().quantidade('SKU_ANTIGO')).toBe(7);
    expect(acoes().quantidade('SAB01')).toBe(0);
  });
});
