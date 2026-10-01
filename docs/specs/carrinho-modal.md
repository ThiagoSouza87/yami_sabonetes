# Spec: Carrinho em modal + thumbnails + acabamento visual

> Status: `implementada`
> Autor: Thiago · Data: 2026-10-01
> Evolui: `docs/specs/carrinho.md` (substitui o drawer lateral por modal)

## 1. Contexto / Problema
O carrinho entregue em `carrinho.md` abre num painel lateral (Sheet) com texto puro:
sem foto do produto, hierarquia visual fraca e sem atalhos (limpar). Print do usuário:
lista só com nome, +/−, preço e lixeira — difícil de reconhecer o item e visualmente simples.

## 2. Objetivo
Trocar o drawer por um **modal** com **thumbnail** de cada item, melhor hierarquia visual
(subtotal, total em destaque, cores da marca) e fluxo de saída mais limpo.

## 3. Não-objetivos (fora de escopo)
- Persistência entre sessões, cupom, frete dentro do carrinho (continuam fora — ver `carrinho.md`).
- Alterar cards, catálogo ou o botão "Comprar" direto.
- Editar variante dentro do modal (para trocar 110ml/30ml, adiciona-se o outro no card).
- Animações elaboradas além das do shadcn/Radix.
- Carrinho fora da Index.

## 4. Experiência / UX
- **Modal** (`Dialog` do shadcn): centralizado no desktop (largura ~`max-w-lg`, cantos
  arredondados); no mobile ocupa quase a tela inteira (margem pequena), **lista com rolagem
  interna** e cabeçalho/rodapé fixos. Fecha por X, Esc e clique fora.
- **Cabeçalho:** título "Seu carrinho" + contagem de unidades; subtítulo curto.
- **Cada item:** **thumbnail** quadrado (~64px, `object-cover`, cantos arredondados) · nome ·
  variante · preço unitário quando `qtd > 1` · **−/qtd/+** · **subtotal** · lixeira.
  Sem imagem (ou imagem quebrada) → **placeholder** com ícone (lucide `Package`).
- **Rodapé:** bloco de **Total em destaque**, botão **"Finalizar no WhatsApp"** (rosa da marca,
  `PINK`) e link/botão secundário **"Limpar carrinho"** (sem confirmação).
- **Vazio:** ícone + "Seu carrinho está vazio." + dica ("Adicione produtos pela vitrine");
  finalizar desabilitado; "Limpar" oculto.
- **Finalizar:** abre `wa.me` (lista + total, como em `carrinho.md` §6) e, **se a janela
  abriu**, **limpa o carrinho e fecha o modal**.
- Cores: rosa da marca nos CTAs/detalhes; badge do header mantém destaque (cor atual).
- Responsivo (mobile + desktop).

## 5. Contrato / Interface
- **Tipo** `ItemCarrinho` (`src/store/carrinho.ts`) ganha campo opcional:
  ```ts
  interface ItemCarrinho { codigo; nome; variante?; precoUnit; qtd; imagem?: string }
  ```
  `adicionar` continua `Omit<ItemCarrinho,"qtd">` (agora aceita `imagem`). Item já existente
  **mantém** a imagem original (não sobrescreve). Demais ações inalteradas.
- **Componente:** `CarrinhoDrawer` → **`CarrinhoModal`** (`src/components/carrinho/CarrinhoModal.tsx`,
  mesmas props `open` / `onOpenChange`). Arquivo e testes antigos são renomeados.
- **Integração** (`src/pages/Index.tsx`): `SaboneteCard` passa `imagem: produto.fotos[0]`;
  `BodySplashCard` (Body Splash e Sais) passa a **1ª foto do tamanho selecionado**
  (`grupo.fotos.find(f => f.tamanho === tamanhoAtual.tamanho)`, com fallback para `fotos[0]`).
  *(Revisado após o uso: antes era sempre `fotos[0]`, o que mostrava o frasco de 110ml para um item de 30ml.)*
  Header usa `CarrinhoModal`.
- Sem API nova, sem dependência nova (`Dialog` já está em `@/components/ui/dialog`).

## 6. Regras de negócio
- Mesmas regras de `carrinho.md` §6 (mesmo `codigo` incrementa; variantes distintas; qtd ≤ 0 remove).
- Preço unitário só é exibido quando `qtd > 1`; subtotal = `precoUnit * qtd` (sempre).
- `limpar()` esvazia tudo. Finalizar só limpa/fecha quando `window.open` **retorna uma janela**
  (se o navegador bloquear o pop-up, o carrinho é preservado).
- Mensagem do WhatsApp **inalterada**.

## 7. Critérios de aceite (Given / When / Then)
- [x] **Dado** um item com `imagem`, **quando** o modal abre, **então** a linha mostra o **thumbnail** (`alt` = nome).
- [x] **Dado** um item sem `imagem` (ou imagem que falha ao carregar), **então** mostra o **placeholder**, sem quebrar o layout.
- [x] **Dado** clicar "Adicionar" num card, **então** o item na store carrega a **1ª foto do produto** (Sabonete) ou a **1ª foto do tamanho selecionado** (Body Splash e Sais: 30ml mostra o frasco de 30ml, 110ml o de 110ml; Sais 300g/100g igual).
- [x] **Dado** o mesmo `codigo` adicionado de novo, **então** a `imagem` original é mantida e a qtd incrementa.
- [x] **Dado** `qtd > 1`, **então** a linha mostra preço unitário e subtotal; com `qtd = 1`, só o subtotal.
- [x] **Dado** itens no carrinho, **então** o **Total** aparece em destaque no rodapé e acompanha +/−/remover.
- [x] **Dado** itens, **quando** clico "Limpar carrinho", **então** a lista esvazia e o modal mostra o estado vazio.
- [x] **Dado** o carrinho vazio, **então** mostra a mensagem de vazio, "Finalizar" desabilitado e "Limpar" oculto.
- [x] **Dado** itens, **quando** clico "Finalizar" e o `wa.me` abre, **então** o carrinho é **limpo** e o modal **fecha**.
- [x] **Dado** `window.open` bloqueado (retorna `null`), **quando** clico "Finalizar", **então** o carrinho **permanece** e o modal continua aberto.
- [x] **Dado** o modal aberto, **então** é um **dialog modal** (foco preso, Esc/X fecham) e a lista rola dentro do modal em telas pequenas.
- [x] `pnpm test`, `pnpm run lint` e `pnpm run build` sem erros; sem referências a `CarrinhoDrawer` no código (`src/`).

## 8. Casos de borda
- `imagem` ausente/URL quebrada → placeholder (sem ícone de imagem quebrada do navegador).
- Muitos itens → rolagem **só na lista**; título, total e botões permanecem visíveis.
- Nome longo → quebra/trunca sem empurrar subtotal/lixeira para fora.
- Pop-up bloqueado → nada é perdido (ver §6).
- Item adicionado antes desta mudança não existe (store em memória) — sem migração.

## 9. Dependências & ambiente
Nenhuma nova. Sem env, sem serverless, sem segredos no client.

## 10. Plano de teste
- **Store (TDD):** `adicionar` guarda `imagem`; repetir mantém a original.
- **Componente (RTL):** thumbnail/placeholder, preço unitário só com `qtd > 1`, total em destaque,
  limpar, vazio, finalizar (abre → limpa+fecha; bloqueado → preserva).
- **Integração (`Index.test.tsx`):** foto correta nos 3 tipos de card (Body Splash 110ml ≠ 30ml; Sais 300g ≠ 100g).
- **Verificação visual** no navegador (desktop + mobile 375px) com vários itens e nome longo.

### Ordem de implementação (tasks)
1. Store: campo `imagem` (TDD)
2. Integração nos cards: passar a 1ª foto (TDD em `Index.test.tsx`)
3. Renomear `CarrinhoDrawer` → `CarrinhoModal` com `Dialog` (mantendo comportamento + testes verdes)
4. Thumbnail + placeholder
5. Layout de linha (preço unitário/subtotal), rodapé com total em destaque, cores da marca
6. "Limpar carrinho" + estado vazio melhorado
7. Finalizar: limpar + fechar (respeitando pop-up bloqueado)
8. Verificação (test/lint/build, visual desktop+mobile, `/code-review` eixo Spec) e atualizar `carrinho.md`/`CLAUDE.md`

## 11. Riscos & decisões
- **Modal em vez de drawer** (decisão do usuário): `Dialog` é mais simples de testar que o Sheet; no mobile ocupa quase a tela toda para não ficar apertado.
- **Thumbnail**: Sabonete = 1ª foto do produto (decisão do usuário). Body Splash/Sais = 1ª foto do **tamanho selecionado** (revisão pós-uso: partilhar a foto do 110ml com o item de 30ml confundia). Não segue a foto exibida no carrossel (que pode ser a do combo), para ser estável por variante.
- **Limpar ao finalizar** muda o comportamento anterior (carrinho permanecia cheio). Mitigado
  por só limpar quando a janela abriu; se o usuário não enviar a mensagem no WhatsApp, terá de remontar o pedido.
- **Sem confirmação em "Limpar"**: ação de baixo custo (carrinho em memória), mas destrutiva; revisitar se virar queixa.
- **Foco preso, X e clique fora** vêm do Radix/shadcn (`Dialog`); os testes cobrem só `role=dialog` e Esc.  
- **Total em destaque e cores da marca** foram verificados visualmente (desktop e mobile 375px), sem teste automatizado.
- Carrinho é só da Index; `carrinho.md` deve ganhar nota apontando para esta evolução (task 8).

## 12. Referências
- `docs/specs/carrinho.md` · `src/components/carrinho/CarrinhoDrawer.tsx` · `src/store/carrinho.ts`
- Print do usuário (carrinho atual: lista simples sem imagens).
- Decisões (perguntas): thumbnail = 1ª foto do produto (Sabonete) / do tamanho selecionado (Body Splash e Sais, revisado) · modal centralizado/quase tela cheia no mobile ·
  extras: subtotal + total em destaque, limpar carrinho, cores da marca, fechar+limpar ao finalizar.
