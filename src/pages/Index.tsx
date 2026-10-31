import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BotaoAdicionar } from "@/components/carrinho/BotaoAdicionar";
import { CarrinhoModal } from "@/components/carrinho/CarrinhoModal";
import { CarrinhoHeader } from "@/components/carrinho/CarrinhoHeader";
import { linkWhatsApp } from "@/lib/pedido";
import { precoParaNumero } from "@/lib/preco";
import { sabonetes, bodySplashGrupos, saisGrupos, type SaboneteProduto, type BodySplashGrupo } from "@/data/catalogo";
import { ShoppingBag, Wind, Droplets, Waves, Instagram, MessageCircle, Mail, MapPin, Sparkles, Star, ChevronRight, ChevronLeft, Truck, X } from "lucide-react";

// ─── Brand Constants ─────────────────────────────────────────────────────────
const PINK = "#c26072";
const BLUE = "#c4dcf0";

// Contexto para abrir o modal de cálculo de frete a partir de qualquer card
const FreteContext = createContext<() => void>(() => {});

// Botão "Calcular frete" reutilizado nos cards de produto
function BotaoFrete() {
  const abrirFrete = useContext(FreteContext);
  return (
    <button
      type="button"
      onClick={abrirFrete}
      className="mt-2 w-full text-xs flex items-center justify-center gap-1 text-gray-500 hover:text-pink-600 transition-colors"
    >
      <Truck size={13} /> Calcular frete
    </button>
  );
}

const geleiasDebanho = [
  { id: 1, nome: "Geleia de Banho de Lavanda", desc: "Textura luxuosa com aroma relaxante de lavanda pura.", preco: "R$ 40,00", imagem: "/assets/soap-lavanda.jpg" },
  { id: 2, nome: "Geleia de Banho de Mel & Leite", desc: "Hidratação profunda com mel e leite de cabra.", preco: "R$ 40,00", imagem: "/assets/soap-almonds.jpg" },
  { id: 3, nome: "Geleia de Banho de Morango", desc: "Vitamina C natural, pele macia e perfumada.", preco: "R$ 40,00", imagem: "/assets/soap-melancia.jpg" },
  { id: 4, nome: "Geleia de Banho Floral", desc: "Blend de pétalas e óleos essenciais florais.", preco: "R$ 40,00", imagem: "/assets/soap-calendula.jpg" },
  { id: 5, nome: "Geleia de Banho de Coco", desc: "Tropical e hidratante, sensação aveludada.", preco: "R$ 40,00", imagem: "/assets/soap-maracuja.jpg" },
  { id: 6, nome: "Geleia de Banho Detox", desc: "Carvão ativado e argila para purificação total.", preco: "R$ 40,00", imagem: "/assets/soap-dolomita.jpg" },
];

// ─── Components ───────────────────────────────────────────────────────────────
interface Produto {
  id: number;
  nome: string;
  desc: string;
  preco: string;
  imagem: string;
  codigo?: string;
  tamanho?: string;
  aroma?: string;
  beneficio?: string;
  cor?: string;
}

function ProdutoCard({ produto, badge }: { produto: Produto; badge?: string }) {
  // Padrão: 300x400px (imagem de referência)
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-0 shadow-md w-fit mx-auto" style={{ width: 300 }}>
      <div
        className="overflow-hidden bg-gray-100 flex items-center justify-center"
        style={{ width: 300, height: 400 }}
      >
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="object-contain hover:scale-105 transition-transform duration-300"
          style={{ width: 300, height: 400, maxWidth: 300, maxHeight: 400 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 style={{ fontFamily: "Floane, serif" }} className="font-semibold text-gray-800 text-sm leading-tight">
              {produto.nome}
            </h3>
            {produto.codigo && (
              <span className="block text-xs text-gray-400 font-mono">Cód: {produto.codigo}</span>
            )}
          </div>
          {badge && <Badge className="text-white text-xs shrink-0" style={{ backgroundColor: PINK }}>{badge}</Badge>}
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {produto.tamanho && (
            <Badge variant="outline" className="text-xs py-0.5" style={{ borderColor: "#ddd", color: "#666" }}>
              {produto.tamanho}
            </Badge>
          )}
          {produto.beneficio && (
            <Badge className="text-white text-xs py-0.5" style={{ backgroundColor: "#27ae60" }}>
              {produto.beneficio}
            </Badge>
          )}
        </div>
        <p className="text-gray-500 text-xs mb-3 leading-relaxed">{produto.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm" style={{ color: PINK }}>{produto.preco}</span>
          <Button
            size="sm"
            className="text-white text-xs px-3 py-1 h-7"
            style={{ backgroundColor: PINK }}
            onClick={() => {
              window.open(linkWhatsApp(`Olá! Gostaria de comprar: ${produto.nome} (${produto.preco})${produto.codigo ? `\nCódigo: ${produto.codigo}` : ""}`), "_blank");
            }}
          >
            Comprar
          </Button>
        </div>
        <BotaoFrete />
      </CardContent>
    </Card>
  );
}

function SaboneteCard({ produto }: { produto: SaboneteProduto }) {
  const [idx, setIdx] = useState(0);
  const total = produto.fotos.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  // Pré-carrega as imagens vizinhas para a troca ser instantânea (sem travar)
  useEffect(() => {
    if (total <= 1) return;
    [idx + 1, idx - 1].forEach((i) => {
      const src = produto.fotos[(i + total) % total];
      if (src) { const im = new Image(); im.src = src; }
    });
  }, [idx, total, produto.fotos]);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-0 shadow-md w-fit mx-auto" style={{ width: 300 }}>
      <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center" style={{ width: 300, height: 400 }}>
        <img
          src={produto.fotos[idx]}
          alt={produto.nome}
          className="object-cover object-center transition-transform duration-300"
          style={{ width: 300, height: 400, maxWidth: 300, maxHeight: 400 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagem anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} style={{ color: PINK }} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próxima imagem"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} style={{ color: PINK }} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {produto.fotos.map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{ backgroundColor: i === idx ? PINK : "#d1d5db" }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 style={{ fontFamily: "Floane, serif" }} className="font-semibold text-gray-800 text-sm leading-tight">
              {produto.nome}
            </h3>
            <span className="block text-xs text-gray-400 font-mono">Cód: {produto.codigo}</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs mb-3 leading-relaxed">{produto.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm" style={{ color: PINK }}>{produto.preco}</span>
          <div className="flex gap-1">
            <BotaoAdicionar
              item={{
                codigo: produto.codigo,
                nome: produto.nome,
                precoUnit: precoParaNumero(produto.preco),
                imagem: produto.fotos[0],
              }}
              color={PINK}
            />
            <Button
              size="sm"
              className="text-white text-xs px-3 py-1 h-7"
              style={{ backgroundColor: PINK }}
              onClick={() => {
                window.open(linkWhatsApp(`Olá! Gostaria de comprar: ${produto.nome} (${produto.preco})\nCódigo: ${produto.codigo}`), "_blank");
              }}
            >
              Comprar
            </Button>
          </div>
        </div>
        <BotaoFrete />
      </CardContent>
    </Card>
  );
}

function BodySplashCard({ grupo, badge }: { grupo: BodySplashGrupo; badge?: string }) {
  const [idx, setIdx] = useState(0);
  const total = grupo.fotos.length;
  const fotoAtual = grupo.fotos[idx];
  const tamanhoAtual =
    grupo.tamanhos.find((t) => t.tamanho === fotoAtual.tamanho) ?? grupo.tamanhos[0];

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  // Pré-carrega as imagens vizinhas do carrossel (troca instantânea)
  useEffect(() => {
    if (total <= 1) return;
    [idx + 1, idx - 1].forEach((i) => {
      const foto = grupo.fotos[(i + total) % total];
      if (foto) { const im = new Image(); im.src = foto.imagem; }
    });
  }, [idx, total, grupo.fotos]);

  const selecionarTamanho = (tamanho: string) => {
    const alvo = grupo.fotos.findIndex((f) => f.tamanho === tamanho);
    if (alvo >= 0) setIdx(alvo);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-0 shadow-md w-fit mx-auto" style={{ width: 300 }}>
      <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center" style={{ width: 300, height: 400 }}>
        <img
          src={fotoAtual.imagem}
          alt={`${grupo.nome} - ${tamanhoAtual.label}`}
          className="object-contain transition-transform duration-300"
          style={{ width: 300, height: 400, maxWidth: 300, maxHeight: 400 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagem anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} style={{ color: PINK }} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próxima imagem"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} style={{ color: PINK }} />
            </button>
            {/* indicadores de posição */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {grupo.fotos.map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{ backgroundColor: i === idx ? PINK : "#d1d5db" }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 style={{ fontFamily: "Floane, serif" }} className="font-semibold text-gray-800 text-sm leading-tight">
              {grupo.nome}
            </h3>
            <span className="block text-xs text-gray-400 font-mono">Cód: {tamanhoAtual.codigo}</span>
          </div>
          {badge && <Badge className="text-white text-xs shrink-0" style={{ backgroundColor: PINK }}>{badge}</Badge>}
        </div>

        {/* Seletor de tamanho (sincronizado com o carrossel) */}
        <div className="flex gap-2 mb-2">
          {grupo.tamanhos.map((t) => {
            const ativo = t.tamanho === fotoAtual.tamanho;
            return (
              <button
                key={t.tamanho}
                type="button"
                onClick={() => selecionarTamanho(t.tamanho)}
                className={`flex-1 text-xs py-1.5 rounded-md border font-medium transition-all ${
                  ativo ? "text-white shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                }`}
                style={ativo ? { backgroundColor: PINK, borderColor: PINK } : {}}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {grupo.beneficio && (
          <div className="flex flex-wrap gap-1 mb-2">
            <Badge className="text-white text-xs py-0.5" style={{ backgroundColor: "#27ae60" }}>
              {grupo.beneficio}
            </Badge>
          </div>
        )}
        <p className="text-gray-500 text-xs mb-3 leading-relaxed">{grupo.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm" style={{ color: PINK }}>{tamanhoAtual.preco}</span>
          <div className="flex gap-1">
            <BotaoAdicionar
              item={{
                codigo: tamanhoAtual.codigo,
                nome: grupo.nome,
                variante: tamanhoAtual.label,
                precoUnit: precoParaNumero(tamanhoAtual.preco),
                imagem: (grupo.fotos.find((f) => f.tamanho === tamanhoAtual.tamanho) ?? grupo.fotos[0]).imagem,
              }}
              color={PINK}
            />
            <Button
              size="sm"
              className="text-white text-xs px-3 py-1 h-7"
              style={{ backgroundColor: PINK }}
              onClick={() => {
                window.open(linkWhatsApp(`Olá! Gostaria de comprar: ${grupo.nome} - ${tamanhoAtual.label} (${tamanhoAtual.preco})\nCódigo: ${tamanhoAtual.codigo}`), "_blank");
              }}
            >
              Comprar
            </Button>
          </div>
        </div>
        <BotaoFrete />
      </CardContent>
    </Card>
  );
}

type CategoriaKey = "sabonetes" | "bodySplash" | "geleias" | "sais";

const categorias: { key: CategoriaKey; label: string; icon: React.ReactNode; count: number; badge?: string }[] = [
  { key: "sabonetes", label: "Sabonetes", icon: <ShoppingBag size={16} />, count: sabonetes.length },
  { key: "bodySplash", label: "Body Splash", icon: <Wind size={16} />, count: bodySplashGrupos.length, badge: "Novo" },
  // Geleias de Banho temporariamente oculta (em definição) — reative descomentando esta linha:
  // { key: "geleias", label: "Geleias de Banho", icon: <Droplets size={16} />, count: geleiasDebanho.length, badge: "Novo" },
  { key: "sais", label: "Sais de Banho", icon: <Waves size={16} />, count: saisGrupos.length, badge: "Novo" },
];

const produtosPorCategoria: Record<Exclude<CategoriaKey, "bodySplash" | "sabonetes" | "sais">, Produto[]> = {
  geleias: geleiasDebanho,
};

// ─── Modal de Cálculo de Frete ─────────────────────────────────────────────────
interface FreteOpcao { nome: string; empresa: string; preco: number; desconto: number; prazoMin: number; prazoMax: number; }

function FreteModal({ aberto, onFechar }: { aberto: boolean; onFechar: () => void }) {
  const [cep, setCep] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [opcoes, setOpcoes] = useState<FreteOpcao[] | null>(null);

  if (!aberto) return null;

  const calcular = async () => {
    const limpo = cep.replace(/\D/g, "");
    if (limpo.length !== 8) { setErro("Digite um CEP válido com 8 dígitos."); return; }
    setErro(""); setCarregando(true); setOpcoes(null);
    try {
      const r = await fetch("/api/frete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cep: limpo }),
      });
      const data = await r.json();
      if (!r.ok) {
        setErro(data.error || "Não foi possível calcular o frete.");
      } else {
        setOpcoes(data.opcoes || []);
        if ((data.opcoes || []).length === 0) setErro("Nenhuma opção de frete para este CEP.");
      }
    } catch {
      setErro("Erro de conexão. Tente novamente.");
    }
    setCarregando(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,.5)" }}
      onClick={onFechar}
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-xl font-bold flex items-center gap-2">
            <Truck size={20} /> Calcular frete
          </h3>
          <button type="button" onClick={onFechar} aria-label="Fechar"><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>
        <p className="text-gray-500 text-sm mb-4">Vamos ver quanto custa pra sua caixinha chegar até você? 💕 Ela comporta <strong>até 4 sabonetes</strong>. É só colocar o seu CEP:</p>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2 mb-4 text-sm"
          style={{ backgroundColor: "#eef9ef", color: "#1e8449", border: "1px solid #cfe9d2" }}
        >
          <span aria-hidden="true">🎁</span>
          <span><strong>Frete grátis</strong> nas compras acima de <strong>R$ 150,00</strong>! 💕</span>
        </div>
        <div className="flex gap-2 mb-3">
          <input
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calcular()}
            placeholder="00000-000"
            inputMode="numeric"
            maxLength={9}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: "#ddd" }}
          />
          <Button className="text-white" style={{ backgroundColor: PINK }} disabled={carregando} onClick={calcular}>
            {carregando ? "..." : "Calcular"}
          </Button>
        </div>
        {erro && <p className="text-sm mb-2" style={{ color: "#c0392b" }}>{erro}</p>}
        {opcoes && opcoes.length > 0 && (
          <div className="space-y-2 mt-2">
            {opcoes.map((o, i) => (
              <div key={i} className="flex items-center justify-between border rounded-lg px-3 py-2" style={{ borderColor: BLUE }}>
                <div>
                  <p className="font-medium text-sm text-gray-800">{o.nome}</p>
                  <p className="text-xs text-gray-500">
                    {o.empresa} · {o.prazoMin === o.prazoMax ? `${o.prazoMax} dia(s)` : `${o.prazoMin}–${o.prazoMax} dias`} úteis
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold block" style={{ color: PINK }}>R$ {o.preco.toFixed(2).replace(".", ",")}</span>
                  {o.desconto > 0 && (
                    <span className="text-[10px] font-medium" style={{ color: "#27ae60" }}>
                      economize R$ {o.desconto.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-2">🌸 Valor aproximado e já com desconto especial pra você — vale para até 4 sabonetes na mesma caixinha. Quer levar 5 ou mais? Chama a gente no WhatsApp 💬</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaKey>("sabonetes");
  const [freteAberto, setFreteAberto] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  return (
    <FreteContext.Provider value={() => setFreteAberto(true)}>
    <div className="min-h-screen" style={{ fontFamily: "Aileron, sans-serif" }}>
      {/* Header */}
      <header className="py-4 px-6 sticky top-0 z-50 shadow-sm" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/yami-logo-main.jpg" alt="Yami Sabonetes" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <h1 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-xl font-bold leading-tight">
                Yami Sabonetes
              </h1>
              <p className="text-xs text-gray-600">Artesanais & Naturais</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#produtos" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Produtos</a>
            <a href="/cuidados" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Cuidados com a Pele</a>
            <a href="/rotina" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Rotina de Cuidados</a>
            <a href="#sobre" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Sobre</a>
            <a href="#contato" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Contato</a>
            <Button
              size="sm"
              className="text-white text-sm"
              style={{ backgroundColor: PINK }}
              onClick={() => window.location.href = "/clube"}
            >
              Clube do Sabonete ✨
            </Button>
            <CarrinhoHeader onClick={() => setCarrinhoAberto(true)} color={PINK} />
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <CarrinhoHeader onClick={() => setCarrinhoAberto(true)} color={PINK} />
            <Button
              size="sm"
              className="text-white"
              style={{ backgroundColor: PINK }}
              onClick={() => window.location.href = "/clube"}
            >
              Clube ✨
            </Button>
          </div>
        </div>
      </header>

      <CarrinhoModal open={carrinhoAberto} onOpenChange={setCarrinhoAberto} />

      {/* Hero */}
      <section
        className="relative py-20 px-6 text-white text-center overflow-hidden"
        style={{ backgroundColor: PINK }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm px-4 py-1">
            🌿 100% Naturais e Artesanais
          </Badge>
          <h2
            style={{ fontFamily: "Floane, serif" }}
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
          >
            Sabonetes que cuidam <br />da sua pele com amor
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Feitos à mão com ingredientes naturais selecionados. Cada peça é única,
            como a sua pele merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white font-semibold px-8"
              style={{ color: PINK }}
              onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Produtos <ChevronRight size={16} className="ml-1" />
            </Button>
            <Button
              size="lg"
              className="bg-white font-semibold px-8"
              style={{ color: PINK }}
              onClick={() => {
                window.open("https://wa.me/5519991743043?text=Olá! Gostaria de conhecer os produtos Yami.", "_blank");
              }}
            >
              <MessageCircle size={16} className="mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Benefícios rápidos */}
      <section className="py-10 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: "🌿", titulo: "100% Natural", sub: "Sem conservantes artificiais" },
            { icon: "✋", titulo: "Artesanal", sub: "Feito à mão com amor" },
            { icon: "🐰", titulo: "Cruelty Free", sub: "Não testado em animais" },
            { icon: "♻️", titulo: "Sustentável", sub: "Embalagem eco-friendly" },
          ].map((item) => (
            <div key={item.titulo} className="p-3">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold text-sm">{item.titulo}</p>
              <p className="text-gray-600 text-xs">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Clube Banner */}
      <section className="py-8 px-6 bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <Card
            className="border-0 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            style={{ background: `linear-gradient(135deg, ${PINK}, #e8a0ad)` }}
            onClick={() => window.location.href = "/clube"}
          >
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white text-center md:text-left">
                <Badge className="bg-white/20 text-white mb-2 text-xs">✨ Novidade</Badge>
                <h3 style={{ fontFamily: "Floane, serif" }} className="text-2xl font-bold mb-1">
                  Clube do Sabonete Yami
                </h3>
                <p className="text-white/90 text-sm">
                  Assine e receba toda mês uma caixa surpresa com sabonetes, body splash, geleias e sais de banho selecionados!
                </p>
              </div>
              <Button size="lg" className="bg-white font-bold shrink-0 px-6" style={{ color: PINK }}>
                Conhecer o Clube →
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Produtos */}
      <section id="produtos" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Nossa Linha</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-3">
              Produtos Artesanais
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Escolha entre nossas 4 linhas de produtos naturais, feitos com ingredientes selecionados.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categorias.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategoriaAtiva(cat.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  categoriaAtiva === cat.key
                    ? "text-white shadow-md scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                }`}
                style={
                  categoriaAtiva === cat.key
                    ? { backgroundColor: PINK, borderColor: PINK }
                    : {}
                }
              >
                {cat.icon}
                {cat.label}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    categoriaAtiva === cat.key ? "bg-white/20" : "bg-gray-100"
                  }`}
                >
                  {cat.count}
                </span>
                {cat.badge && (
                  <Badge className="text-white text-xs px-1.5 py-0" style={{ backgroundColor: "#22c55e" }}>
                    {cat.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {/* Body Splash Hero Section */}
          {categoriaAtiva === "bodySplash" && (
            <div className="mb-10 p-6 rounded-lg" style={{ backgroundColor: BLUE }}>
              <div className="text-center mb-6">
                <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-2xl font-bold mb-2">
                  Fragrâncias Exclusivas Yami
                </h3>
                <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                  Escolha seu Body Splash ideal: cada cor representa um aroma único com benefícios específicos. Disponível em tamanho Grande (110ml) e Mini (30ml) para você experimentar.
                </p>
              </div>
              
              {/* Sugestões de Combos */}
              <div>
                <h4 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold text-sm mb-3 text-center">
                  💝 Kits Recomendados
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-lg border-l-4" style={{ borderColor: PINK }}>
                    <p className="text-xs font-bold text-gray-800 mb-1">Kit Relaxamento</p>
                    <p className="text-xs text-gray-600 mb-2">Lavanda & Baunilha (Azul) + Floral & Lavanda (Roxo)</p>
                    <span className="text-xs font-bold" style={{ color: PINK }}>Combo: R$ 140,00</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4" style={{ borderColor: PINK }}>
                    <p className="text-xs font-bold text-gray-800 mb-1">Kit Energia</p>
                    <p className="text-xs text-gray-600 mb-2">Citrus & Mel (Laranja) + Hortelã & Eucalipto (Verde)</p>
                    <span className="text-xs font-bold" style={{ color: PINK }}>Combo: R$ 140,00</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-l-4" style={{ borderColor: PINK }}>
                    <p className="text-xs font-bold text-gray-800 mb-1">Kit Descoberta</p>
                    <p className="text-xs text-gray-600 mb-2">Tamanho Mini (30ml) - 4 cores diferentes</p>
                    <span className="text-xs font-bold" style={{ color: PINK }}>Combo: R$ 80,00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-20 gap-y-10">
            {categoriaAtiva === "sabonetes"
              ? sabonetes.map((produto) => (
                  <SaboneteCard key={produto.id} produto={produto} />
                ))
              : categoriaAtiva === "bodySplash"
              ? bodySplashGrupos.map((grupo) => (
                  <BodySplashCard key={`grupo-${grupo.id}`} grupo={grupo} />
                ))
              : categoriaAtiva === "sais"
              ? saisGrupos.map((grupo) => (
                  <BodySplashCard key={`sal-${grupo.id}`} grupo={grupo} />
                ))
              : produtosPorCategoria[categoriaAtiva].map((produto) => (
                  <ProdutoCard key={produto.id} produto={produto} />
                ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">
              Gostou? Fale conosco para encomendas especiais!
            </p>
            <Button
              size="lg"
              className="text-white px-8"
              style={{ backgroundColor: PINK }}
              onClick={() => {
                window.open("https://wa.me/5519991743043?text=Olá! Gostaria de fazer um pedido.", "_blank");
              }}
            >
              <MessageCircle size={16} className="mr-2" /> Fazer Pedido pelo WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-16 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Nossa História</Badge>
              <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl font-bold mb-4">
                Feito com amor, do campo para a sua pele
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A Yami Sabonetes nasceu do amor pelos ingredientes naturais e pela arte artesanal.
                Cada sabonete, body splash, geleia e sal de banho é cuidadosamente formulado para
                trazer o melhor da natureza para o seu ritual de banho.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Sediada em Holambra, SP, produzimos tudo de forma artesanal,
                sem conservantes artificiais, respeitando o meio ambiente e o seu bem-estar.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Feito à mão", "100% Natural", "Sem conservantes", "Cruelty Free"].map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm py-1 px-3" style={{ borderColor: PINK, color: PINK }}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { num: "4", label: "Linhas de produtos" },
                { num: "50+", label: "Produtos únicos" },
                { num: "100%", label: "Natural" },
                { num: "❤️", label: "Feito com amor" },
              ].map((stat) => (
                <Card key={stat.label} className="text-center p-4 border-0 shadow-sm bg-white">
                  <p style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl font-bold">{stat.num}</p>
                  <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Depoimentos</Badge>
          <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl font-bold mb-10">
            O que nossas clientes dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                nome: "Ana Paula",
                texto: "Os sabonetes da Yami são simplesmente incríveis! Minha pele nunca esteve tão hidratada. Recomendo demais!",
                stars: 5,
              },
              {
                nome: "Maria Fernanda",
                texto: "Já sou assinante do Clube há 3 meses e cada caixa é uma surpresa deliciosa. Amo a geleia de banho de morango!",
                stars: 5,
              },
              {
                nome: "Carla Souza",
                texto: "Os body splash têm uma duração incrível e o aroma é suave e elegante. Virei fã da Yami!",
                stars: 5,
              },
            ].map((dep) => (
              <Card key={dep.nome} className="p-6 text-left border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {Array(dep.stars).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{dep.texto}"</p>
                <p style={{ color: PINK, fontFamily: "Floane, serif" }} className="font-bold">{dep.nome}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contato */}
      <footer id="contato" className="py-12 px-6 text-white" style={{ backgroundColor: PINK }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 style={{ fontFamily: "Floane, serif" }} className="text-xl font-bold mb-3">Yami Sabonetes</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Sabonetes artesanais feitos com amor e ingredientes 100% naturais.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: "Floane, serif" }} className="font-bold mb-3">Contato</h4>
              <div className="space-y-2">
                <a
                  href="https://wa.me/5519991743043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <MessageCircle size={14} /> (19) 99174-3043
                </a>
                <a
                  href="mailto:yamisabonetes@gmail.com"
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <Mail size={14} /> yamisabonetes@gmail.com
                </a>
                <a
                  href="https://instagram.com/yami_sabonetesartesanais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
                >
                  <Instagram size={14} /> @yami_sabonetesartesanais
                </a>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <MapPin size={14} /> Holambra, SP
                </div>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Floane, serif" }} className="font-bold mb-3">Nossas Linhas</h4>
              <ul className="space-y-1">
                {["Sabonetes Artesanais", "Body Splash", "Geleias de Banho", "Sais de Banho", "Clube do Sabonete ✨"].map((item) => (
                  <li key={item} className="text-white/80 text-sm hover:text-white cursor-pointer transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-white/60 text-xs">
              © {new Date().getFullYear()} Yami Sabonetes. Todos os direitos reservados. Feito com 🌿 e muito carinho.
            </p>
          </div>
        </div>
      </footer>
    </div>
    <FreteModal aberto={freteAberto} onFechar={() => setFreteAberto(false)} />
    </FreteContext.Provider>
  );
}