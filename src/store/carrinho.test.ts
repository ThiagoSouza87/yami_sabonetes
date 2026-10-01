import { beforeEach, describe, expect, it } from 'vitest';
import { totalUnidades, totalValor, useCarrinho } from '@/store/carrinho';

const dolomita = { codigo: 'S01', nome: 'Sabonete de Dolomita', precoUnit: 17 };
const jasmin110 = { codigo: 'BS01', nome: 'Body Splash Jasmin', variante: '110ml', precoUnit: 60 };
const jasmin30 = { codigo: 'BS02', nome: 'Body Splash Jasmin', variante: '30ml', precoUnit: 25 };

const itens = () => useCarrinho.getState().itens;
const acoes = () => useCarrinho.getState();

beforeEach(() => useCarrinho.setState({ itens: [] }));

describe('adicionar', () => {
  it('item novo entra com qtd 1', () => {
    acoes().adicionar(dolomita);
    expect(itens()).toEqual([{ ...dolomita, qtd: 1 }]);
  });
});

describe('adicionar (repetido / variantes)', () => {
  it('mesmo codigo incrementa a qtd em vez de duplicar', () => {
    acoes().adicionar(dolomita);
    acoes().adicionar(dolomita);
    expect(itens()).toEqual([{ ...dolomita, qtd: 2 }]);
  });

  it('variantes distintas viram itens distintos', () => {
    acoes().adicionar(jasmin110);
    acoes().adicionar(jasmin30);
    expect(itens()).toHaveLength(2);
    expect(itens().map((i) => i.codigo)).toEqual(['BS01', 'BS02']);
  });
});

describe('incrementar / decrementar', () => {
  it('incrementar soma 1 à qtd', () => {
    acoes().adicionar(dolomita);
    acoes().incrementar('S01');
    expect(itens()[0].qtd).toBe(2);
  });

  it('decrementar subtrai 1 da qtd', () => {
    acoes().adicionar(dolomita);
    acoes().incrementar('S01');
    acoes().decrementar('S01');
    expect(itens()[0].qtd).toBe(1);
  });

  it('decrementar até 0 remove o item', () => {
    acoes().adicionar(dolomita);
    acoes().decrementar('S01');
    expect(itens()).toEqual([]);
  });
});

describe('setQtd / remover / limpar', () => {
  it('setQtd define a qtd exata', () => {
    acoes().adicionar(dolomita);
    acoes().setQtd('S01', 5);
    expect(itens()[0].qtd).toBe(5);
  });

  it('setQtd com 0 ou negativo remove o item', () => {
    acoes().adicionar(dolomita);
    acoes().setQtd('S01', 0);
    expect(itens()).toEqual([]);
    acoes().adicionar(dolomita);
    acoes().setQtd('S01', -2);
    expect(itens()).toEqual([]);
  });

  it('remover tira só o item indicado', () => {
    acoes().adicionar(dolomita);
    acoes().adicionar(jasmin110);
    acoes().remover('S01');
    expect(itens().map((i) => i.codigo)).toEqual(['BS01']);
  });

  it('limpar esvazia o carrinho', () => {
    acoes().adicionar(dolomita);
    acoes().adicionar(jasmin110);
    acoes().limpar();
    expect(itens()).toEqual([]);
  });
});

describe('seletores', () => {
  it('carrinho vazio: 0 unidades e R$ 0', () => {
    expect(totalUnidades([])).toBe(0);
    expect(totalValor([])).toBe(0);
  });

  it('totalUnidades soma as qtd; totalValor soma precoUnit*qtd', () => {
    acoes().adicionar(dolomita);
    acoes().adicionar(dolomita);
    acoes().adicionar(jasmin110);
    expect(totalUnidades(itens())).toBe(3);
    expect(totalValor(itens())).toBe(94); // 2x17 + 1x60 (exemplo da spec)
  });
});
