import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CarrinhoHeader } from '@/components/carrinho/CarrinhoHeader';
import { useCarrinho } from '@/store/carrinho';

const dolomita = { codigo: 'SAB08', nome: 'Sabonete de Dolomita', precoUnit: 17 };
const jasmin = { codigo: 'BS01', nome: 'Body Splash Jasmin', variante: '110ml', precoUnit: 60 };

beforeEach(() => useCarrinho.setState({ itens: [] }));

describe('CarrinhoHeader', () => {
  it('carrinho vazio: sem badge', () => {
    render(<CarrinhoHeader onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /carrinho/i })).toBeInTheDocument();
    expect(screen.queryByTestId('carrinho-badge')).not.toBeInTheDocument();
  });

  it('badge mostra o total de unidades e acompanha a store', () => {
    render(<CarrinhoHeader onClick={() => {}} />);
    act(() => {
      useCarrinho.getState().adicionar(dolomita);
      useCarrinho.getState().adicionar(dolomita);
      useCarrinho.getState().adicionar(jasmin);
    });
    expect(screen.getByTestId('carrinho-badge')).toHaveTextContent('3');

    act(() => useCarrinho.getState().remover('SAB08'));
    expect(screen.getByTestId('carrinho-badge')).toHaveTextContent('1');
  });

  it('clicar chama onClick', async () => {
    const onClick = vi.fn();
    render(<CarrinhoHeader onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: /carrinho/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
