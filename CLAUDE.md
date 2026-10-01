# CLAUDE.md — Yami Sabonetes

Contexto que o Claude Code carrega em toda sessão. Mantenha curto e verdadeiro.

## Visão geral

Storefront (SPA React) da **Yami Sabonetes** — sabonetes artesanais. Vitrine de
produtos, páginas de conteúdo (Clube, Cuidados da Pele, Rotina), um **carrinho**
(finaliza o pedido pelo WhatsApp) e uma **calculadora de frete** que chama uma
função serverless. Deploy na **Vercel**.

## Stack

- **Build/UI:** Vite 5, React 19, TypeScript 5, Tailwind CSS 3, **shadcn/ui** (Radix) em `@/components/ui`
- **Estado / dados:** Zustand (estado global), TanStack React Query (data fetching)
- **Formulários / validação:** react-hook-form + **zod**
- **Rotas:** react-router-dom · **Animação:** framer-motion · **Toasts:** sonner
- **Serverless:** funções em `api/` (Vercel) — hoje `api/frete.js`
- **Dados:** `@supabase/supabase-js` está nas dependências, mas **confirme antes de assumir que está integrado** — hoje só vi `SUPERFRETE_TOKEN` em uso.

## Comandos (gerenciador: **pnpm** — não use npm/yarn)

```bash
pnpm i             # instalar dependências
pnpm run dev       # ambiente local (Vite)
pnpm run build     # build de produção
pnpm run lint      # eslint em ./src
pnpm run preview   # servir o build
pnpm test          # testes (Vitest, uma execução)
pnpm run test:watch # testes em modo watch
```

> **Testes:** Vitest 2 + @testing-library/react (+ jest-dom, user-event), ambiente
> `jsdom`. Config no bloco `test` de `vite.config.ts`; setup em `src/test/setup.ts`.
> Testes ficam **ao lado do código** (`*.test.ts` / `*.test.tsx`). Mocke só fronteiras
> externas (ex.: `sonner`, `window.open`), nunca a store ou módulos internos.
> `jsdom` está **fixado em 25** (o 30 quebra no Node 20) e `vitest` em 2 (compatível
> com Vite 5) — não atualize sem testar.

## Estrutura

- `@/` é alias para `src/`.
- `src/pages/` — páginas (`Index`, `ClubeSabonete`, `CuidadosDaPele`, `RotinaCuidados`, `NotFound`)
- `src/components/` — componentes; `src/components/ui` = shadcn (não editar à toa)
- `src/components/carrinho/` — carrinho: `BotaoAdicionar`, `CarrinhoHeader`, `CarrinhoModal` (Dialog centralizado) e `ItemThumbnail`
- `src/store/carrinho.ts` — store Zustand `useCarrinho` (em memória, sem `persist`) + seletores `totalUnidades`/`totalValor`
- `src/lib/preco.ts` (`precoParaNumero`, `formatarPreco`) · `src/lib/pedido.ts` (`linkWhatsApp`, `rotuloItem`, `montarMensagemPedido`, `urlWhatsApp`; **fonte única** do número do WhatsApp da loja)
- `src/test/` — setup do Vitest
- `src/hooks/`, `src/lib/utils.ts` (helper `cn`)
- `api/frete.js` — serverless de frete
- `public/` — imagens/assets · `dist/` — build (gerado)

## Convenções

- **TypeScript** em tudo; componentes **funcionais + hooks**.
- UI via **shadcn** (`@/components/ui`) + **classes Tailwind** — evite CSS solto novo.
- **Validação com zod**; **data fetching com React Query**; **estado global com Zustand**.
- Imports pelo alias **`@/`**. Não re-exporte tipos que você já está importando.
- **Carrinho:** item identificado por `codigo` (cada variante tem o seu). Preços do catálogo
  ainda são strings (`"R$ 17,00"`) — converta com `precoParaNumero`. Links `wa.me` novos
  usam `linkWhatsApp` de `@/lib/pedido`, não o número solto no código.
- **Windows:** ao editar arquivos por script, grave **UTF-8 com LF** (`encoding='utf8', newline=''`).
- Design responsivo, tons naturais (verde suave, bege, dourado/mel).

## Serverless & segredos (importante)

- `api/frete.js` (Vercel): **POST** `{ cep }` → cotações via **SuperFrete**.
  - Origem fixa **CEP 13827118**; caixa padrão **12×18×13 cm, 0,3 kg** (1 sabonete).
  - O token fica **só no servidor**, em `SUPERFRETE_TOKEN` (painel da Vercel).
  - **Nunca** exponha `SUPERFRETE_TOKEN` (nem outros segredos) no frontend.

## Definition of Done

- [ ] `pnpm run lint` sem erros
- [ ] `pnpm run build` compila sem erros de tipo
- [ ] Responsivo (mobile + desktop)
- [ ] Nenhum segredo/token no bundle do client
- [ ] `pnpm test` verde

## Git

- Repositório **pessoal** `github.com/ThiagoSouza87/yami_sabonetes`. Nesta máquina,
  o push exige a conta pessoal ativa no `gh` (ver memória do Claude). **Só commitar
  quando solicitado.**

## Como trabalhamos aqui: Spec-Driven Development

Antes de codar algo não-trivial, siga o fluxo (specs ficam em `docs/specs/`):

1. **Afinar** o pedido (perguntas / `/grill-me`) — remover ambiguidade.
2. **Escrever a spec** a partir de `docs/specs/_TEMPLATE.md` (`/to-spec`): objetivo,
   **não-objetivos**, contrato, **critérios de aceite**, casos de borda.
3. **Plan Mode** — apresentar plano para aprovação **antes** de editar código.
4. **Implementar** contra os critérios de aceite (`/tdd` quando houver testes).
5. **Verificar** com `/code-review` (eixo Spec) — o código faz o que a spec pediu?
6. Mudou o requisito? **Atualize a spec primeiro**, depois o código.

Regras de ouro: sempre defina "done when…", declare os **não-objetivos**, e prefira
**incrementos pequenos e verificáveis**.
