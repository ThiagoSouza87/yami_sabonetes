# docs/specs — Spec-Driven Development

Aqui ficam as **specs** que guiam o desenvolvimento. A spec descreve **o QUE**
construir (e o que **não**), antes do código. Os testes são a forma executável
dela.

## Dois templates

- **`_BRIEF.md`** — curto, alto sinal. **Default do dia a dia** (features pequenas/médias).
- **`_TEMPLATE.md`** — completo (UX, riscos, plano de teste). Para features grandes.

## Atalho: `/spec`

Rode **`/spec <ideia da feature>`** que o Claude gera o brief para você — explora o
código, faz o **grill** das decisões em aberto e salva em `docs/specs/<slug>.md`.
Você gasta energia **decidindo**; o Claude, **escrevendo**.

## Como usar (manual)

1. Copie `_BRIEF.md` (ou `_TEMPLATE.md`) para `docs/specs/<nome-da-feature>.md` (kebab-case).
   > ex.: `docs/specs/cupom-desconto.md`
2. Preencha — foque em **objetivo**, **não-objetivos** e **critérios de aceite**.
3. Marque `Status: aprovada` quando estiver alinhada.
4. Implemente contra os critérios; ao terminar, marque `implementada`.

## Ciclo

```
rascunho → (revisão/alinhamento) → aprovada → (implementação + testes) → implementada
```

Mudou o requisito? **Edite a spec primeiro**, depois o código.

## Fluxo com o Claude Code

`/spec` (ou `/grill-me` → `/to-spec`) → **Plan Mode** (aprovar plano) →
`/tdd` ou `/implement` → `/code-review` (eixo Spec).

Convenções do repo e comandos: veja o **`CLAUDE.md`** na raiz.
Handoffs entre sessões: `docs/handoffs/`.
