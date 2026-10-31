# Spec: Tela de controle de estoque (`/admin/estoque`)

> Status: `implementada`
> Autor: Thiago · Data: 2026-10-31

## 1. Contexto / Problema
A loja tem 54 itens vendáveis (30 sabonetes, 8 Body Splash × 2 tamanhos, 4 Sais × 2 tamanhos)
e **nenhum controle de quantidade**: o estoque vive na cabeça de quem administra. Falta uma
tela interna para registrar e ajustar quanto há de cada item.

## 2. Objetivo
Uma tela protegida por senha em **`/admin/estoque`** onde o dono da loja vê todos os 54 itens
agrupados por categoria e **ajusta a quantidade de cada um** (+/− e valor exato).

## 3. Não-objetivos (fora de escopo)
- **Efeito na vitrine:** a loja pública **não** lê o estoque (sem "Esgotado", sem bloqueio de
  Adicionar/Comprar, sem limite de quantidade no carrinho).
- **Persistência compartilhada/servidor:** o estoque fica no `localStorage` **do navegador** de
  quem usa (decisão de protótipo). Sem Supabase, sem KV, sem sincronização entre dispositivos.
- Histórico/movimentações (entrada/saída com motivo), estoque mínimo/alerta de "baixo estoque",
  busca e filtros, importação/exportação.
- Baixa automática ao finalizar pedido (o pedido sai pelo WhatsApp).
- Contas/usuários múltiplos, recuperação de senha, 2FA.
- Cadastro/edição de produtos, preços ou fotos (o catálogo continua em código).
- Link para o admin na navegação pública.

## 4. Experiência / UX
- **Rota** `/admin/estoque` (sem link público; URL conhecida só pelo dono).
- **Sem sessão:** formulário simples "Acesso restrito" com campo de senha e botão **Entrar**
  (erro inline: "Senha incorreta."; estado de carregamento no botão).
- **Com sessão:** cabeçalho "Estoque" + botão **Sair**; **resumo** (itens cadastrados, itens
  zerados, total de unidades); lista **agrupada por categoria** (Sabonetes · Body Splash · Sais de
  Banho) — shadcn `Tabs` ou `Accordion`. Cada linha: **nome**, variante (110ml/30ml, 300g/100g),
  **código**, controle **− [ número ] +** e selo **"Zerado"** quando 0.
- **+/−** salvam **na hora**. O **valor digitado** no campo é gravado ao **sair do campo (blur) ou Enter**
  (nunca a cada tecla, para não gravar valores parciais como `3` ao digitar `3.5`); **Esc** descarta o que foi digitado.
- Responsivo (mobile + desktop): linha vira bloco empilhado no mobile.
- Tons naturais e componentes shadcn (`Card`, `Input`, `Button`, `Badge`).

## 5. Contrato / Interface
- **Catálogo único** — `src/data/catalogo.ts` (**extraído** de `Index.tsx`, sem mudar a vitrine):
  exporta `sabonetes`, `bodySplashGrupos`, `saisGrupos` (+ tipos). `Index.tsx` passa a importá-los.
- **SKUs** — `listarSkus()` (puro) deriva a lista plana:
  ```ts
  type Categoria = 'sabonetes' | 'bodySplash' | 'sais';
  interface Sku { codigo: string; nome: string; variante?: string; categoria: Categoria }
  ```
  (54 itens; `codigo` único. Body Splash/Sais geram 1 SKU por tamanho.)
- **Store Zustand** `useEstoque` — `src/store/estoque.ts`, com `persist` no `localStorage`
  (chave `yami-estoque-v1`), formato `{ quantidades: Record<codigo, number> }`:
  ```ts
  quantidade(codigo): number   // ausente → 0
  definir(codigo, qtd): void   // inteiro 0..99999; qualquer outro valor é REJEITADO (estoque não muda)
  ajustar(codigo, delta): void // delta inteiro; resultado limitado a 0..99999 (clampa); delta inválido é ignorado
  ```
  Validação com **zod** (inteiro, 0..99999); conteúdo corrompido no storage → recomeça vazio.
- **Páginas/componentes:** `src/pages/AdminEstoque.tsx`; `src/components/admin/AdminGate.tsx`
  (login + guarda), `EstoqueLista.tsx`/`EstoqueLinha.tsx`. Rota em `src/App.tsx`.
- **API serverless** — `api/admin-login.js` (Vercel):
  - `POST { senha }` → compara com `process.env.ADMIN_PASSWORD` em tempo constante
    (`crypto.timingSafeEqual`) → `200 { ok: true }`; senha errada/ausente → `401`;
    método ≠ POST → `405`; env ausente → `500`.
  - A senha **nunca** vai para o bundle do client.
- **Sessão no client:** só libera com **`200` E corpo `{ ok: true }`** (um 200 com HTML/JSON diferente, como uma
  reescrita devolvendo `index.html`, **não** libera). Após isso, `sessionStorage['yami-admin-ok']='1'` (some ao fechar a aba);
  **Sair** limpa.

## 6. Regras de negócio
- Quantidade é **inteiro ≥ 0**; − em 0 não vai a negativo; valor inválido no campo (vazio,
  negativo, decimal, texto) **não altera** o estoque salvo (campo volta ao valor atual ao sair). Zeros à esquerda
  são normalizados (`007` → 7).
- Item sem registro conta como **0** (estoque inicial de todos os 54 = 0).
- Itens do `localStorage` que não existem mais no catálogo são **ignorados** (não aparecem, não quebram).
- Resumo: "zerados" = SKUs com quantidade 0; "total de unidades" = Σ quantidades dos 54 SKUs.
- Segurança: a senha só dá acesso à **tela**; os dados são por navegador (ver §11).

## 7. Critérios de aceite (Given / When / Then)
- [x] **Dado** o catálogo, **então** `listarSkus()` retorna **54** SKUs com `codigo` únicos (30 sabonetes, 16 Body Splash, 8 Sais).
- [x] **Dado** um Body Splash/Sal com 2 tamanhos, **então** viram **2 SKUs** distintos (variante preenchida).
- [x] **Dado** a vitrine, **quando** o catálogo é extraído para `catalogo.ts`, **então** a Index se comporta igual (testes existentes verdes).
- [x] **Dado** um SKU sem registro, **então** `quantidade` = 0.
- [x] **Dado** `definir(codigo, 12)`, **então** a quantidade é 12 e **persiste** após recarregar a store a partir do `localStorage`.
- [x] **Dado** `ajustar(codigo, -1)` em 0, **então** continua 0 (nunca negativo).
- [x] **Dado** valores inválidos (`-3`, `2.5`, `NaN`, `100000`), **então** `definir` não altera o estoque salvo.
- [x] **Dado** `localStorage` com JSON corrompido ou formato inesperado, **então** a store inicia vazia, sem erro.
- [x] **Dado** `POST /api/admin-login` com a senha correta, **então** `200 { ok: true }`; errada/ausente → `401`; método ≠ POST → `405`; sem `ADMIN_PASSWORD` → `500`.
- [x] **Dado** acesso a `/admin/estoque` **sem sessão**, **então** mostra só o login (nenhum dado de estoque).
- [x] **Dado** senha incorreta no login, **então** mostra "Senha incorreta." e continua sem sessão.
- [x] **Dado** resposta `200` cujo corpo não é `{ ok: true }` (HTML, JSON vazio, `{ ok: false }`), **então** NÃO libera o acesso e mostra a mensagem de indisponibilidade.
- [x] **Dado** senha correta, **então** a tela de estoque aparece; **Sair** volta ao login.
- [x] **Dado** a tela de estoque, **então** lista os 54 itens agrupados por categoria, com nome, variante e código.
- [x] **Dado** +/− numa linha, **então** a quantidade, o selo "Zerado" e o **resumo** atualizam na hora; "−" fica desabilitado em 0.
- [x] **Dado** um valor exato digitado, **quando** o campo perde o foco ou Enter, **então** o estoque vira esse valor; valor inválido (vazio, texto, negativo, decimal, ≥ 100000) **mantém** o salvo e o campo volta a ele.
- [x] **Dado** a rota `/admin/estoque`, **então** não há link para ela na navegação pública; `SUPERFRETE_TOKEN`/`ADMIN_PASSWORD` não aparecem no bundle.
- [x] `pnpm test`, `pnpm run lint` e `pnpm run build` sem erros; responsivo (mobile + desktop).

## 8. Casos de borda
- Digitar `""`, `"abc"`, `-1`, `3.7` no campo → mantém o valor salvo.
- Quantidade muito grande (≥ 100000) → rejeitada.
- `localStorage` indisponível/cheio (modo privado) → a tela funciona em memória nesta sessão, sem quebrar.
- Duas abas abertas → a última escrita vence (sem sincronização; aceitável no protótipo).
- Catálogo ganha/perde produto → SKU novo entra com 0; SKU removido é ignorado.
- Sessão expira ao fechar a aba (`sessionStorage`); recarregar na mesma aba **mantém** a sessão.
- `ADMIN_PASSWORD` não configurada → login falha com mensagem genérica (sem vazar o motivo).
- Tentativas repetidas de senha: **sem rate limit** nesta versão (risco aceito, ver §11).

## 9. Dependências & ambiente
- **Env (só servidor):** `ADMIN_PASSWORD` no painel da Vercel (e no `.env.local` p/ dev). **Nunca** no frontend.
- **Libs:** nenhuma nova (Zustand `persist`, zod, react-hook-form, shadcn já instalados).
- **Dev local:** `pnpm run dev` (Vite) **não serve `api/`**; para testar o login de ponta a ponta use
  `vercel dev` (ou valide só pelos testes, que mockam `fetch`). A função em si é testada importando o handler.
- Config de testes: ampliar `include` do Vitest para cobrir `tests/**/*.test.js`. Os testes da API ficam em
  `tests/api/` (**não** em `api/`: na Vercel todo arquivo de `api/` vira uma função serverless publicada).

## 10. Plano de teste
- **Unit (TDD):** `listarSkus` (54, únicos, por categoria); store (`definir`/`ajustar`/inválidos/persistência/corrompido).
- **API:** handler `admin-login` com `req/res` simulados (200/401/405/500; comparação em tempo constante).
- **Componente (RTL):** `AdminGate` (sem sessão → login; senha errada → mensagem; certa → conteúdo; Sair);
  `EstoqueLinha`/lista (+/−/input, selo "Zerado", resumo).
- **Integração:** `Index.test.tsx` segue verde após extrair o catálogo.
- **Verificação visual** no navegador (desktop + 375px).

### Ordem de implementação (tasks)
1. Extrair o catálogo de `Index.tsx` → `src/data/catalogo.ts` (testes existentes verdes)
2. `listarSkus()` (TDD)
3. Store `useEstoque` com `persist` + zod (TDD)
4. `api/admin-login.js` + ajuste do `include` do Vitest (TDD)
5. `AdminGate` (login + sessão) (TDD)
6. `AdminEstoque` (lista agrupada, +/−/input, selo "Zerado", resumo) (TDD)
7. Rota `/admin/estoque` em `App.tsx` + conferência de que não há link público
8. Verificação (test/lint/build, visual, `/code-review` eixo Spec) e atualizar `CLAUDE.md`

## 11. Riscos & decisões
- **Segurança é parcial (decisão consciente):** estoque no `localStorage` + senha no servidor ⇒ a senha
  protege o **acesso à tela**, mas os dados são por navegador e editáveis via DevTools **no próprio navegador**.
  A flag de sessão no client também é contornável. Serve para protótipo/uso pessoal; vira proteção real
  só ao migrar para um banco (Supabase) com as escritas validadas no servidor.
- **Migração futura:** a store expõe `quantidade/definir/ajustar`; trocar a persistência por Supabase não
  deveria mudar a UI (por isso a regra fica na store e não nos componentes).
- **Sem rate limit** no login: aceitável com senha forte; revisitar se o admin for exposto/divulgado.
- **Extrair o catálogo** toca `Index.tsx` (arquivo grande, 1100+ linhas): risco de regressão mitigado por
  `Index.test.tsx` e por mover o código sem alterá-lo.
- **Estoque inicial = 0** para todos: o dono precisa preencher os 54 itens na primeira vez.
- **Admin sem link** na navegação: segurança por obscuridade **não** substitui a senha, só reduz ruído.
- **Pendências conhecidas (fora do escopo desta entrega):** sem rate limit no login; sem `noindex` na rota; alvos de toque
  dos botões ± com 36px (< 44px recomendado); erros do formulário de login sem `aria-describedby`/`aria-invalid`;
  sem `aria-live` ao mudar quantidade; valor digitado inválido volta ao salvo sem aviso.
- Alternativas descartadas por ora: Supabase/KV (persistência real), Supabase Auth, vitrine reativa ao estoque.

## 12. Referências
- `src/pages/Index.tsx` (catálogo: `sabonetes`, `bodySplashGrupos`, `saisGrupos`) · `api/frete.js` (padrão de função serverless)
- `docs/specs/carrinho.md`, `docs/specs/carrinho-modal.md` (convenções e fluxo)
- Decisões (perguntas): persistência = `localStorage` (protótipo) · acesso = senha única no servidor ·
  vitrine = sem mudanças · operações = ajustar quantidade (+/− e valor exato).
