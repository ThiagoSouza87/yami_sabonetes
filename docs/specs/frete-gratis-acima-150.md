# Spec: Aviso de frete grátis acima de R$150 no modal de frete

> Status: `aprovada`
> Autor: Thiago · Data: 2026-09-26

## 1. Contexto / Problema
A loja quer comunicar a promoção de **frete grátis para compras acima de R$150,00**.
Hoje não há carrinho nem subtotal; o frete é apenas um **modal estimador por CEP**
(`FreteModal` em `src/pages/Index.tsx`). A comunicação da promoção deve aparecer
onde o cliente pensa em frete: **dentro do modal**.

## 2. Objetivo
Exibir, no modal de cálculo de frete, uma mensagem informativa de **"frete grátis
nas compras acima de R$150,00"**.

## 3. Não-objetivos (fora de escopo)
- Carrinho de compras / subtotal de pedido.
- Alterar o cálculo de frete ou **zerar** valores (`api/frete.js` fica intacto).
- Banner na loja inteira ou em outras páginas.
- Regras condicionais (a mensagem é informativa e fixa).

## 4. Experiência / UX
Um destaque visual **sempre visível** dentro do `FreteModal`, logo abaixo do texto
de introdução (antes do campo de CEP), no tom da marca (emoji + cor suave).
Não depende de calcular frete: aparece assim que o modal abre.

## 5. Contrato / Interface
- **Componente:** `FreteModal` em `src/pages/Index.tsx`.
- **Sem** API nova, sem estado novo, sem props novas.
- Elemento puramente visual (texto fixo). Valor de referência: **R$ 150,00**.

## 6. Regras de negócio
- Texto: comunica frete grátis acima de R$150,00. Sem lógica/condição.

## 7. Critérios de aceite (Given / When / Then)
- [ ] **Dado** o modal de frete aberto, **então** a mensagem de frete grátis acima
      de R$150,00 aparece **sempre visível** (antes e depois de calcular).
- [ ] A mensagem cita o valor **R$ 150,00**.
- [ ] Estilo consistente com a marca (cores/tom) e **responsivo** (mobile + desktop).
- [ ] O **cálculo de frete não muda** — preços retornados continuam iguais.
- [ ] `pnpm run lint` e `pnpm run build` passam sem erros.

## 8. Casos de borda
- Mensagem visível independentemente de erro de CEP ou de haver resultados.

## 9. Dependências & ambiente
Nenhuma (sem env, sem libs novas, sem serverless).

## 10. Plano de teste
Sem runner de testes no projeto → **verificação manual**: abrir o modal e conferir
a mensagem (mobile e desktop); calcular um frete e confirmar que os valores não
mudaram. `pnpm run lint` + `pnpm run build` verdes.

## 11. Riscos & decisões
- Valor R$150,00 **fixo no texto** (marketing) — aceitável; se virar regra dinâmica
  no futuro, extrair para constante/config.
- Baixíssimo risco: mudança apenas de apresentação.

## 12. Referências
- `src/pages/Index.tsx` (`FreteModal`, ~L694)
- Decisões (grill): origem do valor = só informativo; escopo = mensagem no modal.
