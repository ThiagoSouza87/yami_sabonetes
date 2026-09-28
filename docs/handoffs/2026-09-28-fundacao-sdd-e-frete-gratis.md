# Handoff — 2026-09-28 · Fundação SDD + Frete grátis no modal

Nota para retomar o contexto em outra sessão (ex.: a sessão dedicada da Yami).

## O que foi feito

1. **Fundação de Spec-Driven Development** — commit `be133d8`
   - `CLAUDE.md` (raiz): stack, comandos **pnpm**, convenções, Definition of Done e o fluxo SDD.
   - `docs/specs/_TEMPLATE.md` + `docs/specs/README.md`.
2. **Feature: aviso de "frete grátis acima de R$150" no modal de frete** — commit `de7426f`
   - Spec: `docs/specs/frete-gratis-acima-150.md` (status `aprovada`).
   - Código: `src/pages/Index.tsx` → `FreteModal` (~L738) — destaque verde sempre visível.

## Decisões tomadas (etapa grill)

- O site **não tem carrinho nem subtotal**; o frete é um **estimador por CEP** (caixa fixa, até 4 sabonetes) em `api/frete.js`.
- Por isso, "frete grátis acima de R$150" ficou **apenas informativo, dentro do modal** — **sem** carrinho, **sem** alterar o cálculo (`api/frete.js` intacto), **sem** banner global.
- Valor **R$150,00 fixo no texto** (marketing).

## Estado atual

- `pnpm run lint` limpo · `pnpm run build` ok · mensagem presente no bundle.
- `main` sincronizada com `origin` (github.com/ThiagoSouza87/yami_sabonetes).

## Possíveis próximos passos

- Se a promoção virar regra **dinâmica**, extrair `R$150` para uma constante/config.
- Introduzir **Vitest + @testing-library/react** (não há runner hoje) e cobrir o modal.
- Só se for evoluir para **frete grátis calculado de verdade**: aí sim entra carrinho/subtotal (feature grande — nova spec).

## Gotchas do projeto (ver também `CLAUDE.md`)

- Gerenciador: **pnpm** (não npm/yarn).
- Push: **repo pessoal** — exige `gh auth switch --user ThiagoSouza87` antes (senão 403); restaurar a conta de trabalho depois.
- `SUPERFRETE_TOKEN` **só no servidor** (Vercel) — nunca no client.
- **Sem runner de testes** ainda.

## Como retomar

Abra o projeto na sessão desejada e peça para ler: `CLAUDE.md`, `docs/specs/` e este handoff. O contexto essencial está todo versionado.
