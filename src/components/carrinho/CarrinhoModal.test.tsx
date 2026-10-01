import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CarrinhoModal } from '@/components/carrinho/CarrinhoModal';
import { useCarrinho } from '@/store/carrinho';

const dolomita = { codigo: 'SAB08', nome: 'Sabonete de Dolomita', precoUnit: 17 };
const jasmin = { codigo: 'BS01', nome: 'Body Splash Jasmin', variante: '110ml', precoUnit: 60 };

const abrir = () => render(<CarrinhoModal open onOpenChange={() => {}} />);
const adicionar = (item: typeof dolomita | typeof jasmin, vezes = 1) =>
  act(() => {
    for (let i = 0; i < vezes; i++) useCarrinho.getState().adicionar(item);
  });

beforeEach(() => useCarrinho.setState({ itens: [] }));

describe('CarrinhoModal — vazio', () => {
  it('mostra mensagem de vazio e desabilita o finalizar', () => {
    abrir();
    expect(screen.getByText(/carrinho está vazio/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finalizar no whatsapp/i })).toBeDisabled();
  });
});

describe('CarrinhoModal — lista e total', () => {
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

describe('CarrinhoModal — ajustes', () => {
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

describe('CarrinhoModal — finalizar', () => {
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

describe('CarrinhoModal — comportamento de modal', () => {
  it('é um dialog com título e fecha com Esc', async () => {
    const onOpenChange = vi.fn();
    render(<CarrinhoModal open onOpenChange={onOpenChange} />);

    expect(screen.getByRole('dialog', { name: /seu carrinho/i })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('fechado, não renderiza o dialog', () => {
    render(<CarrinhoModal open={false} onOpenChange={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('CarrinhoModal — thumbnail', () => {
  const comFoto = { ...dolomita, imagem: '/assets/sabonetes/dolomita/dolomita-1.jpg' };

  it('item com imagem mostra o thumbnail (alt = nome), sem placeholder', () => {
    abrir();
    adicionar(comFoto);
    const linha = screen.getByTestId('item-SAB08');

    const foto = within(linha).getByRole('img', { name: 'Sabonete de Dolomita' });
    expect(foto).toHaveAttribute('src', '/assets/sabonetes/dolomita/dolomita-1.jpg');
    expect(within(linha).queryByTestId('thumb-placeholder')).not.toBeInTheDocument();
  });

  it('item sem imagem mostra o placeholder', () => {
    abrir();
    adicionar(dolomita);
    const linha = screen.getByTestId('item-SAB08');

    expect(within(linha).getByTestId('thumb-placeholder')).toBeInTheDocument();
    expect(within(linha).queryByRole('img')).not.toBeInTheDocument();
  });

  it('imagem que falha ao carregar troca para o placeholder', () => {
    abrir();
    adicionar(comFoto);
    const linha = screen.getByTestId('item-SAB08');

    fireEvent.error(within(linha).getByRole('img', { name: 'Sabonete de Dolomita' }));

    expect(within(linha).getByTestId('thumb-placeholder')).toBeInTheDocument();
    expect(within(linha).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('CarrinhoModal — preço e contagem', () => {
  it('qtd 1: só o subtotal, sem preço unitário', () => {
    abrir();
    adicionar(dolomita);
    const linha = screen.getByTestId('item-SAB08');

    expect(within(linha).getByText('R$ 17,00')).toBeInTheDocument();
    expect(within(linha).queryByTestId('preco-unit')).not.toBeInTheDocument();
  });

  it('qtd > 1: mostra preço unitário e subtotal', () => {
    abrir();
    adicionar(dolomita, 2);
    const linha = screen.getByTestId('item-SAB08');

    expect(within(linha).getByTestId('preco-unit')).toHaveTextContent('R$ 17,00');
    expect(within(linha).getByText('R$ 34,00')).toBeInTheDocument();
  });

  it('cabeçalho conta as unidades (singular/plural) e some quando vazio', () => {
    abrir();
    expect(screen.queryByTestId('contagem')).not.toBeInTheDocument();

    adicionar(dolomita);
    expect(screen.getByTestId('contagem')).toHaveTextContent('1 unidade');

    adicionar(dolomita);
    adicionar(jasmin);
    expect(screen.getByTestId('contagem')).toHaveTextContent('3 unidades');
  });
});

describe('CarrinhoModal — limpar e vazio', () => {
  it('"Limpar carrinho" esvazia tudo e mostra o estado vazio', async () => {
    abrir();
    adicionar(dolomita, 2);
    adicionar(jasmin);
    await userEvent.click(screen.getByRole('button', { name: /limpar carrinho/i }));

    expect(useCarrinho.getState().itens).toEqual([]);
    expect(screen.queryByTestId('item-SAB08')).not.toBeInTheDocument();
    expect(screen.getByText(/carrinho está vazio/i)).toBeInTheDocument();
  });

  it('vazio: mostra dica, esconde "Limpar" e mantém finalizar desabilitado', () => {
    abrir();
    expect(screen.getByText(/adicione produtos/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /limpar carrinho/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finalizar no whatsapp/i })).toBeDisabled();
  });

  it('com itens: mostra "Limpar" e esconde a dica de vazio', () => {
    abrir();
    adicionar(dolomita);
    expect(screen.getByRole('button', { name: /limpar carrinho/i })).toBeInTheDocument();
    expect(screen.queryByText(/adicione produtos/i)).not.toBeInTheDocument();
  });
});

describe('CarrinhoModal — depois de finalizar', () => {
  const finalizar = () => userEvent.click(screen.getByRole('button', { name: /finalizar no whatsapp/i }));

  it('janela do WhatsApp abriu: limpa o carrinho e fecha o modal', async () => {
    const abrirJanela = vi.spyOn(window, 'open').mockReturnValue({} as Window);
    const onOpenChange = vi.fn();
    render(<CarrinhoModal open onOpenChange={onOpenChange} />);
    adicionar(dolomita, 2);
    await finalizar();

    expect(abrirJanela).toHaveBeenCalledTimes(1);
    expect(useCarrinho.getState().itens).toEqual([]);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    abrirJanela.mockRestore();
  });

  it('pop-up bloqueado (window.open → null): preserva o carrinho e mantém o modal aberto', async () => {
    const abrirJanela = vi.spyOn(window, 'open').mockReturnValue(null);
    const onOpenChange = vi.fn();
    render(<CarrinhoModal open onOpenChange={onOpenChange} />);
    adicionar(dolomita, 2);
    await finalizar();

    expect(abrirJanela).toHaveBeenCalledTimes(1);
    expect(useCarrinho.getState().itens).toEqual([{ ...dolomita, qtd: 2 }]);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByTestId('item-SAB08')).toBeInTheDocument();
    abrirJanela.mockRestore();
  });
});
