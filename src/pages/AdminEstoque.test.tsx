import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminEstoque from '@/pages/AdminEstoque';
import { useEstoque } from '@/store/estoque';

const abrirLogado = () => {
  sessionStorage.setItem('yami-admin-ok', '1');
  return render(<AdminEstoque />);
};
const linhas = () => screen.getAllByTestId(/^sku-/);
const trocarAba = (nome: RegExp) => userEvent.click(screen.getByRole('tab', { name: nome }));

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
  useEstoque.setState({ quantidades: {} });
});

describe('AdminEstoque — acesso', () => {
  it('sem sessão: só o login, nenhuma linha de estoque', () => {
    render(<AdminEstoque />);
    expect(screen.getByRole('heading', { name: /acesso restrito/i })).toBeInTheDocument();
    expect(screen.queryByTestId(/^sku-/)).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /^estoque$/i })).not.toBeInTheDocument();
  });

  it('com sessão: mostra o cabeçalho "Estoque" e o botão Sair, que volta ao login', async () => {
    abrirLogado();
    expect(screen.getByRole('heading', { name: /^estoque$/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /sair/i }));
    expect(screen.getByRole('heading', { name: /acesso restrito/i })).toBeInTheDocument();
    expect(screen.queryByTestId(/^sku-/)).not.toBeInTheDocument();
    expect(sessionStorage.getItem('yami-admin-ok')).toBeNull();
  });
});

describe('AdminEstoque — lista agrupada por categoria', () => {
  it('abas com a contagem de cada categoria (30 · 16 · 8)', () => {
    abrirLogado();
    expect(screen.getByRole('tab', { name: /sabonetes.*30/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /body splash.*16/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /sais de banho.*8/i })).toBeInTheDocument();
  });

  it('Sabonetes: 30 linhas com nome e código, sem variante', () => {
    abrirLogado();
    expect(linhas()).toHaveLength(30);
    const primeira = screen.getByTestId('sku-SAB01');
    expect(within(primeira).getByText('Sabonete de Amêndoa')).toBeInTheDocument();
    expect(within(primeira).getByText('SAB01')).toBeInTheDocument();
  });

  it('Body Splash: 16 linhas, uma por tamanho (110ml e 30ml)', async () => {
    abrirLogado();
    await trocarAba(/body splash/i);
    expect(linhas()).toHaveLength(16);
    const g = screen.getByTestId('sku-BS01');
    expect(within(g).getByText('Body Splash A Vida é Bela')).toBeInTheDocument();
    expect(within(g).getByText('110ml')).toBeInTheDocument();
    expect(within(screen.getByTestId('sku-BS02')).getByText('30ml')).toBeInTheDocument();
  });

  it('Sais de Banho: 8 linhas, uma por tamanho (300g e 100g)', async () => {
    abrirLogado();
    await trocarAba(/sais de banho/i);
    expect(linhas()).toHaveLength(8);
    expect(within(screen.getByTestId('sku-SAL01')).getByText('300g')).toBeInTheDocument();
    expect(within(screen.getByTestId('sku-SAL02')).getByText('100g')).toBeInTheDocument();
  });

  it('estoque inicial: todas as linhas aparecem como "Zerado"', () => {
    abrirLogado();
    expect(within(screen.getByTestId('sku-SAB01')).getByText('Zerado')).toBeInTheDocument();
  });
});

describe('AdminEstoque — resumo', () => {
  it('inicial: 54 itens, 54 zerados, 0 unidades', () => {
    abrirLogado();
    expect(screen.getByTestId('resumo-itens')).toHaveTextContent('54');
    expect(screen.getByTestId('resumo-zerados')).toHaveTextContent('54');
    expect(screen.getByTestId('resumo-unidades')).toHaveTextContent('0');
  });

  it('reflete quantidades já salvas e ignora SKU que saiu do catálogo', () => {
    useEstoque.setState({ quantidades: { SAB01: 10, BS02: 5, SKU_ANTIGO: 999 } });
    abrirLogado();
    expect(screen.getByTestId('resumo-zerados')).toHaveTextContent('52');
    expect(screen.getByTestId('resumo-unidades')).toHaveTextContent('15');
  });
});

const campo = (codigo: string) => within(screen.getByTestId(`sku-${codigo}`)).getByRole('textbox');
const mais = (codigo: string) => within(screen.getByTestId(`sku-${codigo}`)).getByRole('button', { name: /aumentar/i });
const menos = (codigo: string) => within(screen.getByTestId(`sku-${codigo}`)).getByRole('button', { name: /diminuir/i });
const digitar = async (codigo: string, texto: string) => {
  await userEvent.clear(campo(codigo));
  if (texto) await userEvent.type(campo(codigo), texto);
};

describe('AdminEstoque — +/− (salvam na hora)', () => {
  it('+ soma 1, tira o selo "Zerado" e atualiza o resumo', async () => {
    abrirLogado();
    await userEvent.click(mais('SAB01'));

    expect(campo('SAB01')).toHaveValue('1');
    expect(useEstoque.getState().quantidade('SAB01')).toBe(1);
    expect(within(screen.getByTestId('sku-SAB01')).queryByText('Zerado')).not.toBeInTheDocument();
    expect(screen.getByTestId('resumo-zerados')).toHaveTextContent('53');
    expect(screen.getByTestId('resumo-unidades')).toHaveTextContent('1');
  });

  it('− subtrai 1 e volta a "Zerado" ao chegar em 0; em 0 fica desabilitado', async () => {
    useEstoque.setState({ quantidades: { SAB01: 1 } });
    abrirLogado();
    await userEvent.click(menos('SAB01'));

    expect(campo('SAB01')).toHaveValue('0');
    expect(within(screen.getByTestId('sku-SAB01')).getByText('Zerado')).toBeInTheDocument();
    expect(menos('SAB01')).toBeDisabled();
  });

  it('o estoque fica salvo no localStorage', async () => {
    abrirLogado();
    await userEvent.click(mais('SAB02'));
    expect(JSON.parse(localStorage.getItem('yami-estoque-v1')!).state.quantidades).toEqual({ SAB02: 1 });
  });
});

describe('AdminEstoque — valor exato (grava ao sair do campo ou Enter)', () => {
  beforeEach(() => useEstoque.setState({ quantidades: { SAB01: 8 } }));

  it('digitar 25 e sair do campo grava 25 e atualiza o resumo', async () => {
    abrirLogado();
    await digitar('SAB01', '25');
    expect(useEstoque.getState().quantidade('SAB01')).toBe(8); // ainda não gravou
    await userEvent.tab();

    expect(useEstoque.getState().quantidade('SAB01')).toBe(25);
    expect(campo('SAB01')).toHaveValue('25');
    expect(screen.getByTestId('resumo-unidades')).toHaveTextContent('25');
  });

  it('Enter também grava', async () => {
    abrirLogado();
    await digitar('SAB01', '40');
    await userEvent.keyboard('{Enter}');
    expect(useEstoque.getState().quantidade('SAB01')).toBe(40);
  });

  it('digitar 0 grava 0 e mostra "Zerado"', async () => {
    abrirLogado();
    await digitar('SAB01', '0');
    await userEvent.tab();
    expect(useEstoque.getState().quantidade('SAB01')).toBe(0);
    expect(within(screen.getByTestId('sku-SAB01')).getByText('Zerado')).toBeInTheDocument();
  });

  it('zeros à esquerda são normalizados (007 → 7)', async () => {
    abrirLogado();
    await digitar('SAB01', '007');
    await userEvent.tab();
    expect(useEstoque.getState().quantidade('SAB01')).toBe(7);
    expect(campo('SAB01')).toHaveValue('7');
  });

  it.each(['', 'abc', '-1', '3.5', '3,5', '100000', '12abc', ' '])(
    'valor inválido (%j): mantém o salvo e o campo volta a 8',
    async (invalido) => {
      abrirLogado();
      await digitar('SAB01', invalido);
      await userEvent.tab();

      expect(useEstoque.getState().quantidade('SAB01')).toBe(8);
      expect(campo('SAB01')).toHaveValue('8');
    },
  );

  it('Esc descarta o que foi digitado', async () => {
    abrirLogado();
    await digitar('SAB01', '99');
    await userEvent.keyboard('{Escape}');
    expect(campo('SAB01')).toHaveValue('8');
    expect(useEstoque.getState().quantidade('SAB01')).toBe(8);
  });

  it('+ logo depois de digitar: o blur grava o digitado (50) e então soma 1', async () => {
    abrirLogado();
    await digitar('SAB01', '50');
    await userEvent.click(mais('SAB01'));
    expect(useEstoque.getState().quantidade('SAB01')).toBe(51);
    expect(campo('SAB01')).toHaveValue('51');
  });
});
