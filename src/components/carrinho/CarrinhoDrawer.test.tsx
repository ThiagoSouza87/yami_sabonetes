import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CarrinhoDrawer } from '@/components/carrinho/CarrinhoDrawer';
import { useCarrinho } from '@/store/carrinho';

const dolomita = { codigo: 'SAB08', nome: 'Sabonete de Dolomita', precoUnit: 17 };
const jasmin = { codigo: 'BS01', nome: 'Body Splash Jasmin', variante: '110ml', precoUnit: 60 };

const abrir = () => render(<CarrinhoDrawer open onOpenChange={() => {}} />);
const adicionar = (item: typeof dolomita | typeof jasmin, vezes = 1) =>
  act(() => {
    for (let i = 0; i < vezes; i++) useCarrinho.getState().adicionar(item);
  });

beforeEach(() => useCarrinho.setState({ itens: [] }));

describe('CarrinhoDrawer — vazio', () => {
  it('mostra mensagem de vazio e desabilita o finalizar', () => {
    abrir();
    expect(screen.getByText(/carrinho está vazio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finalizar no whatsapp/i })).toBeDisabled();
  });
});

describe('CarrinhoDrawer — lista e total', () => {
  it('lista nome, variante, qtd e subtotal de cada item, e o total', () => {
    abrir();
    adicionar(dolomita, 2);
    adicionar(jasmin);

    const linha1 = screen.getByTestId('item-SAB08');
    expect(within(linha1).getByText('Sabonete de Dolomita')).toBeInTheDocument();
    expect(within(linha1).getByTestId('qtd')).toHaveTextContent('2');
    expect(within(linha1).getByText('R$ 34,00')).toBeInTheDocument();

    const linha2 = screen.getByTestId('item-BS01');
    expect(within(linha2).getByText('110ml')).toBeInTheDocument();
    expect(within(linha2).getByText('R$ 60,00')).toBeInTheDocument();

    expect(screen.getByTestId('total')).toHaveTextContent('R$ 94,00');
    expect(screen.queryByText(/carrinho está vazio/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finalizar no whatsapp/i })).toBeEnabled();
  });
});

describe('CarrinhoDrawer — ajustes', () => {
  it('+ incrementa, − decrementa; lista e total atualizam', async () => {
    abrir();
    adicionar(dolomita);
    const linha = screen.getByTestId('item-SAB08');

    await userEvent.click(within(linha).getByRole('button', { name: /aumentar/i }));
    expect(within(linha).getByTestId('qtd')).toHaveTextContent('2');
    expect(screen.getByTestId('total')).toHaveTextContent('R$ 34,00');

    await userEvent.click(within(linha).getByRole('button', { name: /diminuir/i }));
    expect(within(linha).getByTestId('qtd')).toHaveTextContent('1');
    expect(screen.getByTestId('total')).toHaveTextContent('R$ 17,00');
  });

  it('− com qtd 1 (chega a 0) remove o item e volta ao estado vazio', async () => {
    abrir();
    adicionar(dolomita);
    await userEvent.click(screen.getByRole('button', { name: /diminuir/i }));

    expect(screen.queryByTestId('item-SAB08')).not.toBeInTheDocument();
    expect(screen.getByText(/carrinho está vazio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finalizar no whatsapp/i })).toBeDisabled();
  });

  it('remover tira só aquele item e recalcula o total', async () => {
    abrir();
    adicionar(dolomita, 2);
    adicionar(jasmin);
    await userEvent.click(
      within(screen.getByTestId('item-SAB08')).getByRole('button', { name: /remover/i }),
    );

    expect(screen.queryByTestId('item-SAB08')).not.toBeInTheDocument();
    expect(screen.getByTestId('item-BS01')).toBeInTheDocument();
    expect(screen.getByTestId('total')).toHaveTextContent('R$ 60,00');
  });
});

describe('CarrinhoDrawer — finalizar', () => {
  it('abre o wa.me com a lista e o total do carrinho', async () => {
    const abrirJanela = vi.spyOn(window, 'open').mockReturnValue(null);
    abrir();
    adicionar(dolomita, 2);
    adicionar(jasmin);
    await userEvent.click(screen.getByRole('button', { name: /finalizar no whatsapp/i }));

    expect(abrirJanela).toHaveBeenCalledTimes(1);
    const [url, alvo] = abrirJanela.mock.calls[0];
    expect(alvo).toBe('_blank');
    const link = new URL(String(url));
    expect(link.origin + link.pathname).toBe('https://wa.me/5519991743043');
    const texto = link.searchParams.get('text');
    expect(texto).toContain('- Sabonete de Dolomita x2 — R$ 34,00');
    expect(texto).toContain('- Body Splash Jasmin (110ml) x1 — R$ 60,00');
    expect(texto).toContain('Total: R$ 94,00');
    abrirJanela.mockRestore();
  });

  it('com carrinho vazio, clicar não abre nada', async () => {
    const abrirJanela = vi.spyOn(window, 'open').mockReturnValue(null);
    abrir();
    await userEvent.click(screen.getByRole('button', { name: /finalizar no whatsapp/i }));
    expect(abrirJanela).not.toHaveBeenCalled();
    abrirJanela.mockRestore();
  });
});
