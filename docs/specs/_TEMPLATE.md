# Spec: <nome da feature>

> Status: `rascunho` | `aprovada` | `implementada`
> Autor: <você> · Data: <AAAA-MM-DD>

## 1. Contexto / Problema
Que problema real isto resolve? Para quem? Por que agora?

## 2. Objetivo
Uma frase clara do resultado esperado.

## 3. Não-objetivos (fora de escopo)
O que **não** vamos fazer agora — evita scope creep. Seja explícito.
- ...

## 4. Experiência / UX
Fluxo do usuário, telas/páginas afetadas, componentes shadcn usados, estados
(loading / erro / vazio / sucesso).

## 5. Contrato / Interface
- **Rotas / páginas:** `src/pages/...`
- **Componentes novos:** `src/components/...`
- **API serverless (se houver):** método, caminho (`api/...`), request/response
- **Tipos / validação (zod):**
```ts
// ex.:
const Schema = z.object({ cep: z.string().regex(/^\d{8}$/) });
```

## 6. Regras de negócio
Como o sistema deve se comportar (cálculos, limites, permissões, mensagens).

## 7. Critérios de aceite (Given / When / Then)
A spec executável. Cada item vira um teste quando houver runner.
- [ ] **Dado** ... **quando** ... **então** ...
- [ ] **Dado** um CEP inválido **quando** calcular frete **então** retorna 400 com mensagem
- [ ] ...

## 8. Casos de borda
Entradas inesperadas, dados sujos, timeouts, offline, valores no limite.
- ...

## 9. Dependências & ambiente
Env vars (ex.: `SUPERFRETE_TOKEN` — só servidor), serviços externos (SuperFrete,
Supabase), libs novas (justifique).

## 10. Plano de teste
O que validar e como (integração/unidade). Se não houver runner, descreva a
verificação manual + proponha adicionar Vitest.

## 11. Riscos & decisões
Trade-offs assumidos, alternativas descartadas, pontos de atenção (segurança,
performance, segredos).

## 12. Referências
Links, prints, tickets, conversas.
