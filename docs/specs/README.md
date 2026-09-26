# docs/specs — Spec-Driven Development

Aqui ficam as **specs** que guiam o desenvolvimento. A spec descreve **o QUE**
construir (e o que **não**), antes do código. Os testes são a forma executável
dela.

## Como usar

1. Copie `_TEMPLATE.md` para `docs/specs/<nome-da-feature>.md` (kebab-case).
   > ex.: `docs/specs/cupom-desconto.md`
2. Preencha — foque em **objetivo**, **não-objetivos** e **critérios de aceite**.
3. Marque `Status: aprovada` quando estiver alinhada.
4. Implemente contra os critérios de aceite; ao terminar, marque `implementada`.

## Ciclo

```
rascunho → (revisão/alinhamento) → aprovada → (implementação + testes) → implementada
```

Mudou o requisito? **Edite a spec primeiro**, depois o código — a spec nunca fica
desatualizada.

## Fluxo com o Claude Code

`/grill-me` (afinar) → `/to-spec` (gerar aqui) → `/to-tickets` (fatiar) →
**Plan Mode** (aprovar plano) → `/tdd` ou `/implement` → `/code-review` (eixo Spec).

Convenção do repo e comandos: veja o **`CLAUDE.md`** na raiz.
