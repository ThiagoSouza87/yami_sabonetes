# Spec: Limite de 99 unidades por item no carrinho

> Status: `implementada`
> Autor: Thiago · Data: 2026-10-07

## 1. Contexto / Problema
Hoje a quantidade de um item no carrinho não tem teto: `incrementar`, `adicionar`
e `setQtd` aceitam qualquer valor. Quantidades absurdas quebram o layout do modal
e geram pedidos de WhatsApp irreais.

## 2. Objetivo
Nenhum item do carrinho passa de 99 unidades, por qualquer caminho de entrada, e o
usuário é avisado quando tenta passar.

## 3. Não-objetivos (fora de escopo)
- Limite de total de unidades do carrinho ou de valor do pedido.
- Estoque real por produto.
- Persistência do carrinho (continua em memória).
- Campo de digitação de quantidade na UI (hoje só há botões +/−).

## 4. Experiência / UX
- Ao tentar passar de 99 (botão **+** no `CarrinhoModal` ou `BotaoAdicionar` no
  catálogo): a quantidade fica em 99 e aparece um toast (sonner) de aviso.
- Abaixo do limite, nada muda (o toast de sucesso do `BotaoAdicionar` continua).
- Quando o limite é atingido, o toast de sucesso **não** aparece, só o aviso.

## 5. Contrato / Interface
`src/store/carrinho.ts`:
- `export const QTD_MAXIMA = 99;` (fonte única da regra) e `export const MSG_QTD_MAXIMA`
  (`Máximo de ${QTD_MAXIMA} unidades por item`), para a mensagem não ser duplicada nos dois componentes.
- `adicionar(item)` e `incrementar(codigo)` passam a retornar `boolean`:
  `true` se aplicou, `false` se o item já estava em `QTD_MAXIMA` (estado inalterado).
- `setQtd(codigo, qtd)`: `qtd > QTD_MAXIMA` é clampado para `QTD_MAXIMA`.
- `decrementar`, `remover`, `limpar` inalterados.

UI: `BotaoAdicionar` e `CarrinhoModal` chamam `toast.warning(...)` quando o retorno
for `false`. A UI não conhece o número 99, usa `QTD_MAXIMA` na mensagem.

## 6. Regras de negócio
- Máximo de **99** unidades por `codigo` (cada variante conta separado).
- Mensagem: `Máximo de 99 unidades por item`.

## 7. Critérios de aceite (Given / When / Then)
- [x] **CA1** **Dado** item com qtd 98 **quando** `incrementar` **então** qtd = 99 e retorna `true`.
- [x] **CA2** **Dado** item com qtd 99 **quando** `incrementar` **então** qtd continua 99 e retorna `false`.
- [x] **CA3** **Dado** item com qtd 99 **quando** `adicionar` do mesmo `codigo` **então** qtd continua 99 e retorna `false`.
- [x] **CA4** **Dado** item novo **quando** `adicionar` **então** entra com qtd 1 e retorna `true`.
- [x] **CA5** **Dado** item com qtd 5 **quando** `setQtd(codigo, 150)` **então** qtd = 99.
- [x] **CA6** **Dado** item com qtd 5 **quando** `setQtd(codigo, 99)` **então** qtd = 99 (limite inclusivo).
- [x] **CA7** **Dado** duas variantes do mesmo produto **quando** uma está em 99 **então** a outra ainda pode ser incrementada.
- [x] **CA8** **Dado** qtd 99 no modal **quando** clica em **+** **então** `toast.warning` com a mensagem do limite e a qtd exibida segue 99.
- [x] **CA9** **Dado** qtd 99 **quando** clica em `BotaoAdicionar` **então** `toast.warning` e **não** `toast.success`.

## 8. Casos de borda
- `setQtd` com 0 ou negativo mantém o comportamento atual (remove o item).
- `setQtd` com valor não inteiro/NaN: fora de escopo (não há entrada que o produza hoje).
- Decrementar a partir de 99 volta a permitir incrementar.
- `incrementar` de um `codigo` que não está no carrinho não cria item e retorna `false` (nada foi aplicado).

## 9. Dependências & ambiente
Nenhuma nova. `sonner` já em uso.

## 10. Plano de teste
Vitest, ao lado do código: `src/store/carrinho.test.ts` (CA1–CA7),
`CarrinhoModal.test.tsx` (CA8) e `BotaoAdicionar.test.tsx` (CA9). Mockar só `sonner`.

## 11. Riscos & decisões
- Retornar `boolean` das ações evita a store depender de `sonner` e mantém a regra
  numa só fonte. Alternativa descartada: validar na UI (duplica a regra).
- Testes existentes chamam as ações ignorando o retorno: compatível.

## 12. Referências
Pedido: "limitar a quantidade de cada item do carrinho a 99 unidades".
Relacionadas: `docs/specs/carrinho.md`, `docs/specs/carrinho-modal.md`.
