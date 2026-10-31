import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { BotaoAdicionar } from '@/components/carrinho/BotaoAdicionar';
import { MSG_QTD_MAXIMA, QTD_MAXIMA, useCarrinho } from '@/store/carrinho';

vi.mock('sonner', () => ({ toast: { success: vi.fn(), warning: vi.fn() } }));

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

describe('BotaoAdicionar — limite por item', () => {
  it('CA9: com qtd 99, clicar mostra toast.warning (e NÃO toast.success) e a qtd segue 99', async () => {
    useCarrinho.setState({ itens: [{ ...item, qtd: QTD_MAXIMA }] });
    render(<BotaoAdicionar item={item} />);
    await userEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(toast.warning).toHaveBeenCalledTimes(1);
    expect(toast.warning).toHaveBeenCalledWith(MSG_QTD_MAXIMA);
    expect(toast.success).not.toHaveBeenCalled();
    expect(useCarrinho.getState().itens[0].qtd).toBe(QTD_MAXIMA);
  });

  it('abaixo do limite: toast.success continua e não há aviso', async () => {
    useCarrinho.setState({ itens: [{ ...item, qtd: QTD_MAXIMA - 1 }] });
    render(<BotaoAdicionar item={item} />);
    await userEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.warning).not.toHaveBeenCalled();
    expect(useCarrinho.getState().itens[0].qtd).toBe(QTD_MAXIMA);
  });
});
