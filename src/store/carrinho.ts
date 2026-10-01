import { create } from 'zustand';

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
  adicionar: (item: Omit<ItemCarrinho, 'qtd'>) => void;
  incrementar: (codigo: string) => void;
  decrementar: (codigo: string) => void;
  setQtd: (codigo: string, qtd: number) => void;
  remover: (codigo: string) => void;
  limpar: () => void;
}

const somarQtd = (itens: ItemCarrinho[], codigo: string, delta: number) =>
  itens
    .map((i) => (i.codigo === codigo ? { ...i, qtd: i.qtd + delta } : i))
    .filter((i) => i.qtd > 0);

export const useCarrinho = create<CarrinhoState>()((set) => ({
  itens: [],
  adicionar: (item) =>
    set((s) =>
      s.itens.some((i) => i.codigo === item.codigo)
        ? { itens: somarQtd(s.itens, item.codigo, 1) }
        : { itens: [...s.itens, { ...item, qtd: 1 }] },
    ),
  incrementar: (codigo) => set((s) => ({ itens: somarQtd(s.itens, codigo, 1) })),
  decrementar: (codigo) => set((s) => ({ itens: somarQtd(s.itens, codigo, -1) })),
  setQtd: (codigo, qtd) =>
    set((s) => ({
      itens: s.itens
        .map((i) => (i.codigo === codigo ? { ...i, qtd } : i))
        .filter((i) => i.qtd > 0),
    })),
  remover: (codigo) => set((s) => ({ itens: s.itens.filter((i) => i.codigo !== codigo) })),
  limpar: () => set({ itens: [] }),
}));

export const totalUnidades = (itens: ItemCarrinho[]): number =>
  itens.reduce((soma, i) => soma + i.qtd, 0);

export const totalValor = (itens: ItemCarrinho[]): number =>
  itens.reduce((soma, i) => soma + i.precoUnit * i.qtd, 0);
