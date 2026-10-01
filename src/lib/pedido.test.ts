import { describe, expect, it } from 'vitest';
import { linkWhatsApp, montarMensagemPedido, rotuloItem, urlWhatsApp } from '@/lib/pedido';

const itens = [
  { codigo: 'SAB08', nome: 'Sabonete de Dolomita', precoUnit: 17, qtd: 2 },
  { codigo: 'BS01', nome: 'Body Splash Jasmin', variante: '110ml', precoUnit: 60, qtd: 1 },
];

describe('montarMensagemPedido', () => {
  it('monta lista + total no formato da spec', () => {
    expect(montarMensagemPedido(itens)).toBe(
      [
        'Olá! Quero finalizar meu pedido:',
        '- Sabonete de Dolomita x2 — R$ 34,00',
        '- Body Splash Jasmin (110ml) x1 — R$ 60,00',
        'Total: R$ 94,00',
      ].join('\n'),
    );
  });
});

describe('urlWhatsApp', () => {
  it('aponta para wa.me/5519991743043 com a mensagem codificada', () => {
    const url = new URL(urlWhatsApp(itens));
    expect(url.origin + url.pathname).toBe('https://wa.me/5519991743043');
    expect(url.searchParams.get('text')).toBe(montarMensagemPedido(itens));
  });
});

describe('rotuloItem', () => {
  it('sem variante: só o nome', () => {
    expect(rotuloItem({ nome: 'Sabonete de Dolomita' })).toBe('Sabonete de Dolomita');
  });

  it('com variante: nome (variante)', () => {
    expect(rotuloItem({ nome: 'Body Splash Jasmin', variante: '110ml' })).toBe('Body Splash Jasmin (110ml)');
  });
});

describe('linkWhatsApp', () => {
  it('monta o link do número da loja com o texto codificado', () => {
    const url = new URL(linkWhatsApp('Olá! Código: SAB01\nObrigado'));
    expect(url.origin + url.pathname).toBe('https://wa.me/5519991743043');
    expect(url.searchParams.get('text')).toBe('Olá! Código: SAB01\nObrigado');
  });
});
