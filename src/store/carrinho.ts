import { create } from 'zustand';

// Fonte única da regra: nenhum item passa deste limite, por qualquer caminho de entrada.
export const QTD_MAXIMA = 99;
export const MSG_QTD_MAXIMA = `Máximo de ${QTD_MAXIMA} unidades por item`;

export interface ItemCarrinho {
  codigo: string;
  nome: string;
  variante?: string;
  precoUnit: number;
  qtd: number;
  imagem?: string;
}

interface CarrinhoState {
  itens: ItemCarrinho[];
  /** true se aplicou; false se o item já estava em QTD_MAXIMA (estado inalterado). */
  adicionar: (item: Omit<ItemCarrinho, 'qtd'>) => boolean;
  /** true se aplicou; false se o item está em QTD_MAXIMA ou não existe (estado inalterado). */
  incrementar: (codigo: string) => boolean;
  decrementar: (codigo: string) => void;
  setQtd: (codigo: string, qtd: number) => void;
  remover: (codigo: string) => void;
  limpar: () => void;
}

const somarQtd = (itens: ItemCarrinho[], codigo: string, delta: number) =>
  itens
    .map((i) => (i.codigo === codigo ? { ...i, qtd: i.qtd + delta } : i))
    .filter((i) => i.qtd > 0);

export const useCarrinho = create<CarrinhoState>()((set, get) => ({
  itens: [],
  adicionar: (item) => {
    const atual = get().itens.find((i) => i.codigo === item.codigo);
    if (atual && atual.qtd >= QTD_MAXIMA) return false;
    set((s) =>
      atual
        ? { itens: somarQtd(s.itens, item.codigo, 1) }
        : { itens: [...s.itens, { ...item, qtd: 1 }] },
    );
    return true;
  },
  incrementar: (codigo) => {
    const atual = get().itens.find((i) => i.codigo === codigo);
    if (!atual || atual.qtd >= QTD_MAXIMA) return false;
    set((s) => ({ itens: somarQtd(s.itens, codigo, 1) }));
    return true;
  },
  decrementar: (codigo) => set((s) => ({ itens: somarQtd(s.itens, codigo, -1) })),
  setQtd: (codigo, qtd) =>
    set((s) => ({
      itens: s.itens
        .map((i) => (i.codigo === codigo ? { ...i, qtd: Math.min(qtd, QTD_MAXIMA) } : i))
        .filter((i) => i.qtd > 0),
    })),
  remover: (codigo) => set((s) => ({ itens: s.itens.filter((i) => i.codigo !== codigo) })),
  limpar: () => set({ itens: [] }),
}));

export const totalUnidades = (itens: ItemCarrinho[]): number =>
  itens.reduce((soma, i) => soma + i.qtd, 0);

export const totalValor = (itens: ItemCarrinho[]): number =>
  itens.reduce((soma, i) => soma + i.precoUnit * i.qtd, 0);
