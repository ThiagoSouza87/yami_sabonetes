import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Index from '@/pages/Index';
import { useCarrinho } from '@/store/carrinho';

vi.mock('sonner', () => ({ toast: { success: vi.fn() } }));

const FOTO_BS_110 = '/assets/body_splash/a-vida-e-bela/a-vida-e-bela-110ml.jpg';
const FOTO_BS_30 = '/assets/body_splash/a-vida-e-bela/a-vida-e-bela-30ml.jpg';

beforeEach(() => useCarrinho.setState({ itens: [] }));

const itens = () => useCarrinho.getState().itens;
const primeiroAdicionar = () => screen.getAllByRole('button', { name: /^adicionar$/i })[0];

describe('Index — integração dos cards com o carrinho', () => {
  it('Sabonete: "Adicionar" põe o item certo (codigo, nome, preço numérico, 1ª foto)', async () => {
    render(<Index />);
    await userEvent.click(primeiroAdicionar());

    expect(itens()).toEqual([
      {
        codigo: 'SAB01',
        nome: 'Sabonete de Amêndoa',
        precoUnit: 17,
        qtd: 1,
        imagem: '/assets/sabonetes/amendoa/amendoa-1.jpg',
      },
    ]);
  });

  it('Body Splash: 110ml e 30ml viram itens distintos, cada um com seu código, preço e a foto do próprio tamanho', async () => {
    render(<Index />);
    await userEvent.click(screen.getByRole('button', { name: /body splash/i }));

    await userEvent.click(primeiroAdicionar());
    await userEvent.click(screen.getAllByRole('button', { name: '30ml' })[0]);
    await userEvent.click(primeiroAdicionar());

    expect(itens()).toEqual([
      { codigo: 'BS01', nome: 'Body Splash A Vida é Bela', variante: '110ml', precoUnit: 60, qtd: 1, imagem: FOTO_BS_110 },
      { codigo: 'BS02', nome: 'Body Splash A Vida é Bela', variante: '30ml', precoUnit: 30, qtd: 1, imagem: FOTO_BS_30 },
    ]);
  });

  it('Sais: o tamanho selecionado define código, variante, preço e a foto (100g → foto pequena)', async () => {
    render(<Index />);
    await userEvent.click(screen.getByRole('button', { name: /sais de banho/i }));

    await userEvent.click(screen.getAllByRole('button', { name: '100g' })[0]);
    await userEvent.click(primeiroAdicionar());

    expect(itens()).toEqual([
      {
        codigo: 'SAL02',
        nome: 'Sal de Banho Pitanga Preta',
        variante: '100g',
        precoUnit: 25,
        qtd: 1,
        imagem: '/assets/sais/pitanga_preta/pitanga_preta-pequeno.jpg',
      },
    ]);
  });
});
