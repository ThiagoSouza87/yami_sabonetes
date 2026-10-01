# Spec: Carrinho de compras (adicionar item + finalizar no WhatsApp)

> Status: `aprovada`
> Autor: Thiago · Data: 2026-10-01

## 1. Contexto / Problema
A loja lista produtos, mas não permite montar um pedido com vários itens — hoje a
compra é item a item (botão "Comprar" por card, abre WhatsApp). Falta um **carrinho**
para juntar produtos e finalizar de uma vez. (A spec `frete-gratis-acima-150.md` já
registrava "hoje não há carrinho nem subtotal".)

## 2. Objetivo
Permitir adicionar produtos a um carrinho (ajustar/remover) e **finalizar o pedido
pelo WhatsApp** com a lista e o total prontos.

## 3. Não-objetivos (fora de escopo)
- Pagamento online / checkout próprio.
- Persistência entre sessões (recarregar pode zerar) — fica para outra spec.
- Estoque, cupom ou frete **dentro** do carrinho (frete tem feature própria).
- Carrinho fora da loja (Clube/Cuidados/Rotina) — **só na Index** nesta entrega.

## 4. Experiência / UX
- Botão **"Adicionar"** em cada card visível: **Sabonetes, Body Splash, Sais**.
- Clicar adiciona 1; repetir **incrementa**. **Toast** de confirmação (sonner).
- Header da loja: ícone **carrinho** (lucide `ShoppingCart`) + **badge** com total de unidades.
- **Drawer** (vaul/shadcn) à direita: lista (nome · variante · qtd · subtotal), **+/−**,
  remover; estado **vazio**; **total**; botão **"Finalizar no WhatsApp"**.
- Responsivo (mobile + desktop).

## 5. Contrato / Interface
- **Store Zustand** `useCarrinho` — `src/store/carrinho.ts` (memória):
  ```ts
  interface ItemCarrinho { codigo: string; nome: string; variante?: string; precoUnit: number; qtd: number }
  adicionar(item: Omit<ItemCarrinho,"qtd">): void // existe → qtd+1; senão push qtd=1
  incrementar(codigo): void · decrementar(codigo): void // chega a 0 → remove
  setQtd(codigo, qtd): void // <=0 → remove · remover(codigo) · limpar()
  // seletores puros (exportados p/ teste e UI):
  totalUnidades(itens): number // Σ qtd
  totalValor(itens): number    // Σ precoUnit*qtd
  ```
- **Helpers de preço** — `src/lib/preco.ts`: `precoParaNumero("R$ 17,00")→17`, `formatarPreco(17)→"R$ 17,00"`.
- **Componentes** — `src/components/carrinho/`: `BotaoAdicionar`, `CarrinhoHeader`, `CarrinhoDrawer`.
- **Integração** — `src/pages/Index.tsx`: `SaboneteCard`, `BodySplashCard` (Body Splash **e** Sais), header da Index.
- Sem API nova. Item identificado por **`codigo`** (variante BS.. vira item distinto).

## 6. Regras de negócio
- Mesmo `codigo` → incrementa qtd. Variantes diferentes → itens distintos.
- `qtd <= 0` → remove o item.
- Total de unidades = Σ qtd; total em R$ = Σ `precoUnit * qtd`.
- Finalizar monta mensagem para `wa.me/5519991743043` com lista + total:
  ```
  Olá! Quero finalizar meu pedido:
  - Sabonete de Dolomita x2 — R$ 34,00
  - Body Splash Jasmin (110ml) x1 — R$ 60,00
  Total: R$ 94,00
  ```

## 7. Critérios de aceite (Given / When / Then)
- [ ] **Dado** um card, **quando** clico "Adicionar", **então** o item entra com qtd 1 e aparece **toast**.
- [ ] **Dado** um item já no carrinho, **quando** clico "Adicionar" de novo, **então** a qtd **incrementa** (não duplica).
- [ ] **Dado** Body Splash/Sal com variante, **quando** adiciono 110ml e 30ml, **então** viram **2 itens distintos**.
- [ ] **Dado** itens no carrinho, **então** o header da loja mostra o **total de unidades**.
- [ ] **Dado** o drawer aberto, **quando** uso +/−/remover, **então** lista e total atualizam; **qtd 0 remove**.
- [ ] **Dado** carrinho vazio, **então** o drawer mostra "vazio" e **finalizar fica desabilitado**.
- [ ] **Dado** itens no carrinho, **quando** clico "Finalizar", **então** abre `wa.me` com **lista + total** corretos.
- [ ] `pnpm run lint` e `pnpm run build` sem erros; testes da store/preço **verdes**.

## 8. Casos de borda
- Variantes distintas = itens separados.
- `qtd 0` remove o item.
- Carrinho vazio → mensagem + finalizar desabilitado.
- Preço string (`"R$ 17,00"`, `"R$ 1.234,56"`) → parse robusto (milhar + vírgula).
- Recarregar a página **zera** (esperado — não-objetivo).

## 9. Dependências & ambiente
- Já instalados: **Zustand**, **sonner**, **vaul**/shadcn (Drawer).
- **Novo (devDeps):** `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
- Sem env, sem serverless, **sem segredos** no client.

## 10. Plano de teste
- Infra: Vitest + RTL (`environment: jsdom`; script `test`).
- **Unit (TDD):** `preco` (parse/format, incl. milhar); `store` (adicionar novo/existente,
  variantes distintas, `setQtd 0` remove, decrementar→0 remove, `totalUnidades`/`totalValor`).
- **Componente (RTL leve):** badge reflete a store; clicar "Adicionar" incrementa.
- DoD: `pnpm lint` + `pnpm build` verdes; testes verdes; responsivo.

### Ordem de implementação (tasks)
1. Infra de testes (Vitest + RTL)
2. `src/lib/preco.ts` (TDD)
3. `src/store/carrinho.ts` (TDD)
4. `BotaoAdicionar` + integração nos cards + toast
5. `CarrinhoHeader` (ícone + badge) no header da Index
6. `CarrinhoDrawer` (listar, +/−, remover, vazio, total)
7. Finalizar no WhatsApp (mensagem + total)
8. Verificação (lint/build/testes + `/code-review` eixo Spec)

## 11. Riscos & decisões
- Projeto sem runner → esta feature adiciona **Vitest + RTL**.
- Cards vivem em `Index.tsx`; integrar **sem quebrar os carrosséis** existentes.
- `codigo` como chave (único por variante) → simples e cobre o caso de borda.
- Em memória (Zustand sem `persist`) → atende o não-objetivo; menos complexidade.
- Parsing de preço frágil se o formato mudar → mitigado por função pura testada.

## 12. Referências
- `src/pages/Index.tsx` — `SaboneteCard`, `BodySplashCard`, header da loja.
- `docs/specs/frete-gratis-acima-150.md` — contexto ("hoje não há carrinho").
- Decisões (grill): carrinho só na loja · Vitest+RTL sim · toast sim · produtos Sabonetes+Body Splash+Sais.
