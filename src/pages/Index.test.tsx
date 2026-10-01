import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Index from '@/pages/Index';
import { useCarrinho } from '@/store/carrinho';

vi.mock('sonner', () => ({ toast: { success: vi.fn() } }));

beforeEach(() => useCarrinho.setState({ itens: [] }));

const itens = () => useCarrinho.getState().itens;
const primeiroAdicionar = () => screen.getAllByRole('button', { name: /^adicionar$/i })[0];

describe('Index — integração dos cards com o carrinho', () => {
  it('Sabonete: "Adicionar" põe o item certo (codigo, nome, preço numérico)', async () => {
    render(<Index />);
    await userEvent.click(primeiroAdicionar());

    expect(itens()).toEqual([
      { codigo: 'SAB01', nome: 'Sabonete de Amêndoa', precoUnit: 17, qtd: 1 },
    ]);
  });

  it('Body Splash: 110ml e 30ml viram itens distintos, cada um com seu código e preço', async () => {
    render(<Index />);
    await userEvent.click(screen.getByRole('button', { name: /body splash/i }));

    await userEvent.click(primeiroAdicionar());
    await userEvent.click(screen.getAllByRole('button', { name: '30ml' })[0]);
    await userEvent.click(primeiroAdicionar());

    expect(itens()).toEqual([
      { codigo: 'BS01', nome: 'Body Splash A Vida é Bela', variante: '110ml', precoUnit: 60, qtd: 1 },
      { codigo: 'BS02', nome: 'Body Splash A Vida é Bela', variante: '30ml', precoUnit: 30, qtd: 1 },
    ]);
  });

  it('Sais: o tamanho selecionado define código, variante e preço', async () => {
    render(<Index />);
    await userEvent.click(screen.getByRole('button', { name: /sais de banho/i }));

    await userEvent.click(screen.getAllByRole('button', { name: '100g' })[0]);
    await userEvent.click(primeiroAdicionar());

    expect(itens()).toEqual([
      { codigo: 'SAL02', nome: 'Sal de Banho Pitanga Preta', variante: '100g', precoUnit: 25, qtd: 1 },
    ]);
  });
});
