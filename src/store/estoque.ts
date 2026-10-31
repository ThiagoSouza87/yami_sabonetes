import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import { z } from 'zod';

export const ESTOQUE_MAX = 99999;
export const ESTOQUE_STORAGE_KEY = 'yami-estoque-v1';

// localStorage pode estar bloqueado ou cheio (modo privado, quota): a tela segue em memória.
const storageSeguro: StateStorage = {
  getItem: (nome) => {
    try { return localStorage.getItem(nome); } catch { return null; }
  },
  setItem: (nome, valor) => {
    try { localStorage.setItem(nome, valor); } catch { /* sem persistência nesta sessão */ }
  },
  removeItem: (nome) => {
    try { localStorage.removeItem(nome); } catch { /* idem */ }
  },
};

const quantidadeSchema = z.number().int().min(0).max(ESTOQUE_MAX);
const persistidoSchema = z.object({ quantidades: z.record(quantidadeSchema) });

interface EstoqueState {
  quantidades: Record<string, number>;
  quantidade: (codigo: string) => number;
  definir: (codigo: string, qtd: number) => void;
  ajustar: (codigo: string, delta: number) => void;
}

export const useEstoque = create<EstoqueState>()(
  persist(
    (set, get) => ({
      quantidades: {},
      quantidade: (codigo) => get().quantidades[codigo] ?? 0,
      definir: (codigo, qtd) => {
        const valida = quantidadeSchema.safeParse(qtd);
        if (!valida.success) return;
        set((s) => ({ quantidades: { ...s.quantidades, [codigo]: valida.data } }));
      },
      ajustar: (codigo, delta) => {
        if (!Number.isInteger(delta)) return;
        const novo = Math.min(ESTOQUE_MAX, Math.max(0, get().quantidade(codigo) + delta));
        set((s) => ({ quantidades: { ...s.quantidades, [codigo]: novo } }));
      },
    }),
    {
      name: ESTOQUE_STORAGE_KEY,
      storage: createJSONStorage(() => storageSeguro),
      partialize: (s) => ({ quantidades: s.quantidades }),
      // Conteúdo salvo com formato inesperado/corrompido → recomeça vazio.
      merge: (persistido, atual) => {
        const lido = persistidoSchema.safeParse(persistido);
        return lido.success ? { ...atual, quantidades: lido.data.quantidades } : atual;
      },
    },
  ),
);
