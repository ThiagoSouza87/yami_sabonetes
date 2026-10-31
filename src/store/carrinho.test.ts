import { beforeEach, describe, expect, it } from 'vitest';
import { MSG_QTD_MAXIMA, QTD_MAXIMA, totalUnidades, totalValor, useCarrinho } from '@/store/carrinho';

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

describe('imagem (thumbnail)', () => {
  const comImagem = { ...dolomita, imagem: '/assets/sabonetes/dolomita/1.jpg' };

  it('adicionar guarda a imagem do item', () => {
    acoes().adicionar(comImagem);
    expect(itens()).toEqual([{ ...comImagem, qtd: 1 }]);
  });

  it('adicionar de novo mantém a imagem original e incrementa a qtd', () => {
    acoes().adicionar(comImagem);
    acoes().adicionar({ ...comImagem, imagem: '/outra.jpg' });
    expect(itens()).toEqual([{ ...comImagem, qtd: 2 }]);
  });

  it('item sem imagem continua válido', () => {
    acoes().adicionar(dolomita);
    expect(itens()[0].imagem).toBeUndefined();
  });
});

describe('limite por item (QTD_MAXIMA)', () => {
  const noLimite = (item = dolomita) => {
    acoes().adicionar(item);
    acoes().setQtd(item.codigo, QTD_MAXIMA);
  };

  it('o limite é 99 e a mensagem usa o limite', () => {
    expect(QTD_MAXIMA).toBe(99);
    expect(MSG_QTD_MAXIMA).toBe('Máximo de 99 unidades por item');
  });

  it('CA1: com qtd 98, incrementar leva a 99 e retorna true', () => {
    acoes().adicionar(dolomita);
    acoes().setQtd('S01', 98);
    expect(acoes().incrementar('S01')).toBe(true);
    expect(itens()[0].qtd).toBe(99);
  });

  it('CA2: com qtd 99, incrementar mantém 99 e retorna false', () => {
    noLimite();
    expect(acoes().incrementar('S01')).toBe(false);
    expect(itens()[0].qtd).toBe(99);
  });

  it('CA3: com qtd 99, adicionar o mesmo código mantém 99 e retorna false', () => {
    noLimite();
    expect(acoes().adicionar(dolomita)).toBe(false);
    expect(itens()).toHaveLength(1);
    expect(itens()[0].qtd).toBe(99);
  });

  it('CA4: item novo entra com qtd 1 e retorna true', () => {
    expect(acoes().adicionar(dolomita)).toBe(true);
    expect(itens()).toEqual([{ ...dolomita, qtd: 1 }]);
  });

  it('adicionar item já existente abaixo do limite incrementa e retorna true', () => {
    acoes().adicionar(dolomita);
    expect(acoes().adicionar(dolomita)).toBe(true);
    expect(itens()[0].qtd).toBe(2);
  });

  it('CA5: setQtd acima do limite vira 99', () => {
    acoes().adicionar(dolomita);
    acoes().setQtd('S01', 5);
    acoes().setQtd('S01', 150);
    expect(itens()[0].qtd).toBe(99);
  });

  it('CA6: setQtd(99) fica em 99 (limite inclusivo)', () => {
    acoes().adicionar(dolomita);
    acoes().setQtd('S01', 5);
    acoes().setQtd('S01', 99);
    expect(itens()[0].qtd).toBe(99);
  });

  it('CA7: variantes são independentes — uma em 99 não trava a outra', () => {
    noLimite(jasmin110);
    acoes().adicionar(jasmin30);
    expect(acoes().incrementar('BS01')).toBe(false);
    expect(acoes().incrementar('BS02')).toBe(true);
    expect(itens().find((i) => i.codigo === 'BS02')!.qtd).toBe(2);
  });

  it('decrementar a partir de 99 volta a permitir incrementar', () => {
    noLimite();
    acoes().decrementar('S01');
    expect(itens()[0].qtd).toBe(98);
    expect(acoes().incrementar('S01')).toBe(true);
    expect(itens()[0].qtd).toBe(99);
  });

  it('setQtd com 0 ou negativo continua removendo o item', () => {
    acoes().adicionar(dolomita);
    acoes().setQtd('S01', 0);
    expect(itens()).toEqual([]);
    acoes().adicionar(dolomita);
    acoes().setQtd('S01', -3);
    expect(itens()).toEqual([]);
  });

  it('incrementar um código que não está no carrinho não cria item e retorna false', () => {
    expect(acoes().incrementar('NAO_EXISTE')).toBe(false);
    expect(itens()).toEqual([]);
  });
});
