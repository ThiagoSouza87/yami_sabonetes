import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { BotaoAdicionar } from '@/components/carrinho/BotaoAdicionar';
import { useCarrinho } from '@/store/carrinho';

vi.mock('sonner', () => ({ toast: { success: vi.fn() } }));

const item = { codigo: 'SAB08', nome: 'Sabonete de Dolomita', precoUnit: 17 };

beforeEach(() => {
  useCarrinho.setState({ itens: [] });
  vi.clearAllMocks();
});

describe('BotaoAdicionar', () => {
  it('clicar adiciona o item com qtd 1 e mostra toast', async () => {
    render(<BotaoAdicionar item={item} />);
    await userEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(useCarrinho.getState().itens).toEqual([{ ...item, qtd: 1 }]);
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith(expect.stringContaining('Sabonete de Dolomita'));
  });

  it('clicar de novo incrementa a qtd (não duplica)', async () => {
    render(<BotaoAdicionar item={item} />);
    const botao = screen.getByRole('button', { name: /adicionar/i });
    await userEvent.click(botao);
    await userEvent.click(botao);

    expect(useCarrinho.getState().itens).toEqual([{ ...item, qtd: 2 }]);
  });

  it('variantes (110ml e 30ml) viram itens distintos e o toast cita a variante', async () => {
    const g = { codigo: 'BS01', nome: 'Body Splash Jasmin', variante: '110ml', precoUnit: 60 };
    const p = { codigo: 'BS02', nome: 'Body Splash Jasmin', variante: '30ml', precoUnit: 25 };
    const { unmount } = render(<BotaoAdicionar item={g} />);
    await userEvent.click(screen.getByRole('button', { name: /adicionar/i }));
    unmount();
    render(<BotaoAdicionar item={p} />);
    await userEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(useCarrinho.getState().itens.map((i) => i.codigo)).toEqual(['BS01', 'BS02']);
    expect(toast.success).toHaveBeenLastCalledWith(expect.stringContaining('30ml'));
  });
});
