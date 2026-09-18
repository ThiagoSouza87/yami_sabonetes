import { useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle, Instagram, Mail, MapPin, Check, X, ChevronDown,
  Sparkles, Droplets, Leaf,
} from "lucide-react";

// ─── Brand Constants ─────────────────────────────────────────────────────────
const PINK = "#c26072";
const BLUE = "#c4dcf0";
const WHATSAPP = "5519991743043";
const wa = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

// ─── Dados ────────────────────────────────────────────────────────────────────
const industrial = [
  "Base detergente (SLS/SLES) que resseca a pele",
  "Conservantes artificiais (parabenos, formaldeído)",
  "Corantes sintéticos",
  "Glicerina removida durante a fabricação",
  "Produção em massa sem controle de qualidade",
];

const artesanal = [
  "Base glicerinada natural que hidrata enquanto limpa",
  "Sem conservantes artificiais",
  "Corantes naturais (argilas, ervas, frutas)",
  "Glicerina preservada — subproduto natural do processo artesanal",
  "Produção em pequenos lotes com controle total",
];

interface TipoPele {
  tipo: string;
  emoji: string;
  sinais: string;
  produtos: string[];
}

// Mapa nome do sabonete -> foto principal (do catálogo)
const fotoSabonete: Record<string, string> = {
  "Carvão Ativado": "/assets/sabonetes/carvao_ativado/carvao_ativado-1.jpg",
  "Argila Verde": "/assets/sabonetes/argila_verde/argila_verde-1.jpg",
  "Argila Rosa & Branca": "/assets/sabonetes/argila_rosa_branca/argila_rosa_branca-1.jpg",
  "Argila Rosa": "/assets/sabonetes/argila_rosa_branca/argila_rosa_branca-1.jpg",
  "Açafrão": "/assets/sabonetes/acafrao/acafrao-1.jpg",
  "Açafrão & Dolomita": "/assets/sabonetes/acafrao_dolomita/acafrao_dolomita-1.jpg",
  "Dolomita": "/assets/sabonetes/dolomita/dolomita-1.jpg",
  "Dolomita (Argila Branca)": "/assets/sabonetes/dolomita/dolomita-1.jpg",
  "Hibisco": "/assets/sabonetes/hibisco/hibisco-1.jpg",
  "Camomila": "/assets/sabonetes/camomila/camomila-1.jpg",
  "Calêndula": "/assets/sabonetes/calendula/calendula-1.jpg",
  "Barbatimão": "/assets/sabonetes/babatimao/babatimao-1.jpg",
  "Amêndoa": "/assets/sabonetes/amendoa/amendoa-1.jpg",
  "Mel & Fubá": "/assets/sabonetes/mel_fuba/mel_fuba-1.jpg",
  "Aveia": "/assets/sabonetes/aveia/aveia-1.jpg",
  "Babosa": "/assets/sabonetes/babosa/babosa-1.jpg",
  "Erva-Doce": "/assets/sabonetes/erva_doce/erva_doce-1.jpg",
};
const esconderImg = (e: SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = "none"; };

const tiposPele: TipoPele[] = [
  { tipo: "Pele Oleosa / Acneica", emoji: "🫧", sinais: "Brilho excessivo, poros dilatados, cravos, espinhas", produtos: ["Carvão Ativado", "Argila Verde", "Barbatimão", "Açafrão & Dolomita"] },
  { tipo: "Pele Seca", emoji: "🌾", sinais: "Sensação de aperto, descamação, vermelhidão", produtos: ["Amêndoa", "Mel & Fubá", "Aveia", "Babosa"] },
  { tipo: "Pele Sensível", emoji: "🌸", sinais: "Irritação fácil, vermelhidão, reação a produtos", produtos: ["Camomila", "Calêndula", "Babosa", "Erva-Doce"] },
  { tipo: "Pele Mista", emoji: "⚖️", sinais: "Zona T oleosa, bochechas normais/secas", produtos: ["Dolomita", "Argila Rosa & Branca", "Argila Verde"] },
  { tipo: "Pele com Manchas", emoji: "🌟", sinais: "Tom irregular, manchas solares, pós-inflamatórias", produtos: ["Açafrão", "Açafrão & Dolomita", "Dolomita", "Hibisco"] },
  { tipo: "Pele Madura", emoji: "🕊️", sinais: "Linhas finas, perda de firmeza, ressecamento", produtos: ["Hibisco", "Amêndoa", "Açafrão"] },
];

const ingredientes = [
  { emoji: "🖤", nome: "Carvão Ativado", desc: "Absorve impurezas e sebo em excesso, desintoxica os poros em profundidade. Ideal para pele oleosa e acneica." },
  { emoji: "💚", nome: "Argila Verde", desc: "Adstringente natural, controla oleosidade e tem ação antibacteriana. Perfeita para pele com tendência a acne." },
  { emoji: "🌸", nome: "Argila Rosa", desc: "Limpeza suave e equilibrada, ideal para pele mista ou sensível. Combina os benefícios da argila branca e vermelha." },
  { emoji: "💛", nome: "Açafrão", desc: "Antioxidante natural que ilumina, uniformiza o tom e ajuda a firmar. Ótimo para pele com manchas e madura." },
  { emoji: "🤍", nome: "Dolomita (Argila Branca)", desc: "Limpeza delicada e suave esfoliação. Uniformiza o tom e é adequada para todos os tipos de pele." },
  { emoji: "🌺", nome: "Hibisco", desc: "Rico em antioxidantes e AHAs naturais, firma, renova e traz viço — o 'botox natural' das peles maduras." },
  { emoji: "🌼", nome: "Camomila", desc: "Anti-inflamatória e calmante, reduz vermelhidão e irritações. A escolha perfeita para pele sensível." },
  { emoji: "🌻", nome: "Calêndula", desc: "Cicatrizante e regeneradora, ideal para pele irritada, seca ou com pequenas lesões." },
];

const hibiscoBeneficios = [
  { emoji: "🌺", titulo: "Antioxidante poderoso", desc: "Combate os radicais livres e previne o envelhecimento precoce" },
  { emoji: "✨", titulo: "AHAs naturais", desc: "Renovam a pele suavemente, deixando-a mais lisa e luminosa" },
  { emoji: "💪", titulo: "Firmeza e viço", desc: "Estimula a renovação e ajuda a firmar a pele madura" },
  { emoji: "🎯", titulo: "Uniformiza o tom", desc: "Suaviza manchas e deixa a pele com aparência mais uniforme" },
];

const dolomitaBeneficios = [
  { emoji: "🤍", titulo: "Efeito porcelana", desc: "Uniformiza o tom e alisa a textura, deixando a pele com aspecto de porcelana" },
  { emoji: "✨", titulo: "Esfoliação delicada", desc: "Remove células mortas suavemente, revelando uma pele mais lisa e renovada" },
  { emoji: "🎯", titulo: "Refina os poros", desc: "Ajuda a suavizar a aparência dos poros e a refinar a textura da pele" },
  { emoji: "🕊️", titulo: "Maciez aveludada", desc: "Toque sedoso sem ressecar — indicado para todos os tipos de pele" },
];

const carvaoBeneficios = [
  { emoji: "🧲", titulo: "Limpeza profunda", desc: "Atrai e remove impurezas e toxinas do fundo dos poros" },
  { emoji: "💧", titulo: "Controla a oleosidade", desc: "Absorve o excesso de sebo e reduz o brilho da pele" },
  { emoji: "🫧", titulo: "Desobstrui os poros", desc: "Ajuda a prevenir cravos e espinhas no dia a dia" },
  { emoji: "⚖️", titulo: "Purifica sem agredir", desc: "Deixa a pele fresca, limpa e equilibrada" },
];

const acafraoBeneficios = [
  { emoji: "🩹", titulo: "Ação cicatrizante", desc: "Auxilia na regeneração e na recuperação da pele" },
  { emoji: "🌿", titulo: "Anti-inflamatório", desc: "Acalma irritações e ajuda a reduzir vermelhidões" },
  { emoji: "💛", titulo: "Antioxidante", desc: "Combate os radicais livres e devolve o viço" },
  { emoji: "🎯", titulo: "Uniformiza o tom", desc: "Ajuda a suavizar marcas e a igualar a pele" },
];

interface Rotina {
  emoji: string;
  nome: string;
  passos: string[];
}

const rotinas: Rotina[] = [
  {
    emoji: "🧼", nome: "Rotina Detox (Pele Oleosa/Acneica)",
    passos: [
      "Lave o rosto com Sabonete de Carvão Ativado — remove sebo e impurezas",
      "2x por semana: Sabonete de Argila Verde como máscara (2 min)",
      "Finalize com água fria para fechar os poros",
    ],
  },
  {
    emoji: "🌸", nome: "Rotina Anti-Manchas",
    passos: [
      "Limpe com Sabonete de Dolomita — uniformiza sem agredir",
      "3x por semana: Sabonete de Açafrão pela manhã (ação iluminadora e antioxidante)",
      "Alterne com Sabonete de Açafrão & Dolomita para renovar e uniformizar o tom",
    ],
  },
  {
    emoji: "🕊️", nome: "Rotina Anti-Idade",
    passos: [
      "Limpe com Sabonete de Hibisco — antioxidante que firma e renova",
      "Hidrate no banho com Sabonete de Amêndoa — nutre e deixa a pele macia",
      "3x por semana: Sabonete de Açafrão para iluminar e dar viço",
    ],
  },
  {
    emoji: "🌿", nome: "Rotina Calmante (Pele Sensível)",
    passos: [
      "Lave com Sabonete de Camomila — calmante e anti-inflamatório",
      "Alterne com Sabonete de Calêndula para reforçar a cicatrização",
      "Evite esfoliação agressiva — deixe os ingredientes agirem suavemente",
    ],
  },
  {
    emoji: "✨", nome: "Rotina Equilíbrio (Pele Mista)",
    passos: [
      "Sabonete de Dolomita na zona T (testa, nariz, queixo)",
      "Sabonete de Argila Rosa & Branca no rosto todo 2x por semana",
      "Sabonete de Argila Verde só na zona T nos dias mais oleosos",
    ],
  },
];

// ─── Header compartilhado ─────────────────────────────────────────────────────
function Header() {
  return (
    <header className="py-4 px-6 sticky top-0 z-50 shadow-sm" style={{ backgroundColor: BLUE }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/yami-logo-main.jpg" alt="Yami Sabonetes" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <h1 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-xl font-bold leading-tight">
              Cuidados com a Pele
            </h1>
            <p className="text-xs text-gray-600">Guia de Skincare Natural</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">← Voltar à Loja</a>
          <span className="text-sm font-bold" style={{ color: PINK }}>Cuidados com a Pele</span>
          <a href="/clube" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Clube ✨</a>
          <Button
            size="sm"
            className="text-white"
            style={{ backgroundColor: PINK }}
            onClick={() => window.open(wa("Olá! Quero uma indicação personalizada para o meu tipo de pele."), "_blank")}
          >
            Falar com a Yami
          </Button>
        </nav>
      </div>
    </header>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function CuidadosDaPele() {
  const [tipoAberto, setTipoAberto] = useState<number | null>(null);
  const [rotinaAtiva, setRotinaAtiva] = useState(0);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Aileron, sans-serif" }}>
      <Header />

      {/* Hero */}
      <section className="relative py-20 px-6 text-white text-center overflow-hidden" style={{ backgroundColor: PINK }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm px-4 py-1">
            ✨ Guia Completo de Skincare Natural
          </Badge>
          <h2 style={{ fontFamily: "Floane, serif" }} className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Cuide da sua pele com<br />o poder da natureza
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Descubra os produtos certos para o seu tipo de pele e monte uma rotina de skincare 100% natural.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white font-semibold px-8"
              style={{ color: PINK }}
              onClick={() => document.getElementById("tipos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver meu tipo de pele
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white/10 hover:text-white px-8"
              onClick={() => document.getElementById("destaque")?.scrollIntoView({ behavior: "smooth" })}
            >
              Conhecer o Hibisco 🌺
            </Button>
          </div>
        </div>
      </section>

      {/* Artesanal vs Comercial */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Por que artesanal?</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold">
              Artesanal vs. Comercial: entenda a diferença
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Industrial */}
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="py-3 px-5 text-white font-bold" style={{ fontFamily: "Floane, serif", backgroundColor: "#9e9e9e" }}>
                Sabonete Industrial
              </div>
              <CardContent className="p-5 space-y-3">
                {industrial.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <X size={16} className="mt-0.5 shrink-0 text-gray-400" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Yami */}
            <Card className="border-2 shadow-xl overflow-hidden" style={{ borderColor: PINK }}>
              <div className="py-3 px-5 text-white font-bold" style={{ fontFamily: "Floane, serif", backgroundColor: PINK }}>
                Sabonete Yami Artesanal
              </div>
              <CardContent className="p-5 space-y-3">
                {artesanal.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: "#27ae60" }} />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Base Glicerinada */}
          <div className="mt-8 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-4" style={{ backgroundColor: BLUE }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: PINK }}>
              <Droplets size={22} />
            </div>
            <div>
              <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold text-lg mb-1">A Base Glicerinada</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                A glicerina é um umectante natural que atrai moléculas de água para a pele, mantendo-a hidratada após o banho.
                No processo industrial ela é removida para venda separada como subproduto. No sabonete artesanal ela permanece
                integrada — por isso a pele não resseca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guia por Tipo de Pele */}
      <section id="tipos" className="py-16 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Guia Personalizado</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-3">
              Qual é o seu tipo de pele?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">Clique no seu tipo de pele e veja os produtos indicados.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {tiposPele.map((t, i) => {
              const aberto = tipoAberto === i;
              return (
                <Card
                  key={t.tipo}
                  className="border-0 shadow-md overflow-hidden cursor-pointer transition-all duration-300 bg-white"
                  onClick={() => setTipoAberto(aberto ? null : i)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={fotoSabonete[t.produtos[0]]} alt={t.tipo} onError={esconderImg} className="w-14 h-14 rounded-full object-cover shrink-0 border-2" style={{ borderColor: BLUE }} />
                        <div>
                          <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold flex items-center gap-1"><span>{t.emoji}</span>{t.tipo}</h3>
                          <p className="text-gray-500 text-xs">{t.sinais}</p>
                        </div>
                      </div>
                      <ChevronDown size={18} className="shrink-0 transition-transform duration-300" style={{ color: PINK, transform: aberto ? "rotate(180deg)" : "none" }} />
                    </div>

                    {aberto && (
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: BLUE }}>
                        <p className="text-xs font-bold mb-2" style={{ color: PINK }}>Produtos indicados:</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {t.produtos.map((p) => (
                            <div key={p} className="flex items-center gap-2 border rounded-lg p-2 bg-white" style={{ borderColor: BLUE }}>
                              <img src={fotoSabonete[p]} alt={p} onError={esconderImg} className="w-9 h-9 rounded-md object-cover shrink-0" />
                              <span className="text-xs font-medium text-gray-700 leading-tight">{p}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          className="text-white w-full"
                          style={{ backgroundColor: PINK }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(wa(`Olá! Tenho ${t.tipo} e quero indicações. Tenho interesse em: ${t.produtos.join(", ")}.`), "_blank");
                          }}
                        >
                          <MessageCircle size={14} className="mr-2" /> Pedir indicação no WhatsApp
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ingredientes Estrela */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Natureza em cada barra</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold">
              Conheça nossos ingredientes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ingredientes.map((ing) => (
              <Card key={ing.nome} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-white h-full overflow-hidden">
                {fotoSabonete[ing.nome] ? (
                  <img src={fotoSabonete[ing.nome]} alt={ing.nome} onError={esconderImg} className="w-full h-36 object-cover" />
                ) : null}
                <CardContent className="p-5">
                  <div className="text-2xl mb-2">{ing.emoji}</div>
                  <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold mb-2">{ing.nome}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{ing.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Destaque: Sabonete de Dolomita (mais vendido / pele de porcelana) */}
      <section id="dolomita-destaque" className="py-16 px-6" style={{ background: "linear-gradient(135deg, #dbe9f7, #ffffff)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>⭐ Nosso mais vendido</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-3">
              Sabonete de Dolomita
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O queridinho da casa: a esfoliação suave da argila dolomita alisa, uniformiza e revela o famoso{" "}
              <strong style={{ color: PINK }}>efeito "pele de porcelana"</strong> — lisa, macia e luminosa.
            </p>
          </div>

          <img src="/assets/banner-yami.jpg" alt="Sabonete de Dolomita Yami com pó de dolomita e sal" onError={esconderImg} className="w-full rounded-2xl shadow-lg mb-8" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {dolomitaBeneficios.map((b) => (
              <div key={b.titulo} className="bg-white rounded-2xl p-4 shadow-sm border" style={{ borderColor: BLUE }}>
                <div className="text-2xl mb-1">{b.emoji}</div>
                <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold text-sm mb-1">{b.titulo}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border flex flex-col md:flex-row items-start md:items-center gap-4 justify-between" style={{ borderColor: BLUE }}>
            <div className="flex items-start gap-3">
              <Sparkles size={22} className="mt-1 shrink-0" style={{ color: PINK }} />
              <div>
                <h4 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold mb-1">Como usar</h4>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                  Use sobre a pele úmida com movimentos circulares suaves, 2 a 3x por semana. Enxágue e sinta a maciez —
                  no rosto, evite a área dos olhos.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="text-white font-bold shrink-0 px-6"
              style={{ backgroundColor: PINK }}
              onClick={() => window.open(wa("Olá! Quero o Sabonete de Dolomita (efeito pele de porcelana). 🤍"), "_blank")}
            >
              Quero o Sabonete de Dolomita
            </Button>
          </div>
        </div>
      </section>

      {/* Destaque: Sabonete de Hibisco (anti-idade) */}
      <section id="destaque" className="py-16 px-6 text-white" style={{ background: `linear-gradient(135deg, ${PINK}, #d4849a)` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-white/20 text-white border-white/30">🌺 Queridinho anti-idade</Badge>
            <h2 style={{ fontFamily: "Floane, serif" }} className="text-3xl md:text-4xl font-bold mb-3">
              Sabonete de Hibisco
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Conhecido como o "botox natural": rico em antioxidantes e AHAs, firma, renova e devolve o viço à pele madura.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <img src="/assets/sabonetes/hibisco/hibisco-1.jpg" alt="Sabonete de Hibisco" onError={esconderImg} className="w-full h-72 object-cover rounded-2xl shadow-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hibiscoBeneficios.map((b) => (
                <div key={b.titulo} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl mb-1">{b.emoji}</div>
                  <h3 style={{ fontFamily: "Floane, serif" }} className="font-bold text-sm mb-1">{b.titulo}</h3>
                  <p className="text-white/80 text-xs leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="flex items-start gap-3">
              <Sparkles size={22} className="mt-1 shrink-0" />
              <div>
                <h4 style={{ fontFamily: "Floane, serif" }} className="font-bold mb-1">Como usar</h4>
                <p className="text-white/85 text-sm leading-relaxed max-w-xl">
                  Use no rosto e no corpo durante o banho, massageando suavemente. Deixe agir por 1 minuto para
                  potencializar a ação antioxidante. Ideal 3x por semana.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white font-bold shrink-0 px-6"
              style={{ color: PINK }}
              onClick={() => window.open(wa("Olá! Quero o Sabonete de Hibisco (anti-idade). 🌺"), "_blank")}
            >
              Quero o Sabonete de Hibisco
            </Button>
          </div>
        </div>
      </section>

      {/* Destaque: Carvão Ativado (limpeza profunda / peles oleosas) */}
      <section id="carvao-destaque" className="py-16 px-6" style={{ background: "linear-gradient(135deg, #dbe9f7, #ffffff)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>🖤 Limpeza profunda</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-3">
              Sabonete de Carvão Ativado
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Um verdadeiro ímã de impurezas: o carvão ativado faz uma{" "}
              <strong style={{ color: PINK }}>limpeza profunda</strong>, remove o excesso de oleosidade e desobstrui os
              poros — ideal para peles oleosas e acneicas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <img src="/assets/sabonetes/carvao_ativado/carvao_ativado-1.jpg" alt="Sabonete de Carvão Ativado" onError={esconderImg} className="w-full h-72 object-cover rounded-2xl shadow-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {carvaoBeneficios.map((b) => (
                <div key={b.titulo} className="bg-white rounded-2xl p-4 shadow-sm border" style={{ borderColor: BLUE }}>
                  <div className="text-2xl mb-1">{b.emoji}</div>
                  <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold text-sm mb-1">{b.titulo}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border flex flex-col md:flex-row items-start md:items-center gap-4 justify-between" style={{ borderColor: BLUE }}>
            <div className="flex items-start gap-3">
              <Sparkles size={22} className="mt-1 shrink-0" style={{ color: PINK }} />
              <div>
                <h4 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold mb-1">Como usar</h4>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                  Use no rosto 3 a 4x por semana, à noite, massageando sobre a pele úmida por cerca de 30 segundos.
                  Enxágue e finalize com o seu hidratante.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="text-white font-bold shrink-0 px-6"
              style={{ backgroundColor: PINK }}
              onClick={() => window.open(wa("Olá! Quero o Sabonete de Carvão Ativado (limpeza profunda). 🖤"), "_blank")}
            >
              Quero o Carvão Ativado
            </Button>
          </div>
        </div>
      </section>

      {/* Destaque: Açafrão (ação cicatrizante) */}
      <section id="acafrao-destaque" className="py-16 px-6 text-white" style={{ background: `linear-gradient(135deg, ${PINK}, #d4849a)` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-white/20 text-white border-white/30">💛 Poder cicatrizante</Badge>
            <h2 style={{ fontFamily: "Floane, serif" }} className="text-3xl md:text-4xl font-bold mb-3">
              Sabonete de Açafrão
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Rico em propriedades antioxidantes e anti-inflamatórias, o açafrão auxilia na{" "}
              <strong>cicatrização</strong>, acalma a pele e ajuda a uniformizar o tom.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <img src="/assets/sabonetes/acafrao/acafrao-destaque.jpg" alt="Sabonete de Açafrão" onError={esconderImg} className="w-full h-72 object-cover rounded-2xl shadow-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {acafraoBeneficios.map((b) => (
                <div key={b.titulo} className="bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl mb-1">{b.emoji}</div>
                  <h3 style={{ fontFamily: "Floane, serif" }} className="font-bold text-sm mb-1">{b.titulo}</h3>
                  <p className="text-white/80 text-xs leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="flex items-start gap-3">
              <Sparkles size={22} className="mt-1 shrink-0" />
              <div>
                <h4 style={{ fontFamily: "Floane, serif" }} className="font-bold mb-1">Como usar</h4>
                <p className="text-white/85 text-sm leading-relaxed max-w-xl">
                  Use 3x por semana, massageando sobre a pele úmida. Deixe agir por 1 minuto para potencializar a ação
                  e enxágue.
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-white font-bold shrink-0 px-6"
              style={{ color: PINK }}
              onClick={() => window.open(wa("Olá! Quero o Sabonete de Açafrão (ação cicatrizante). 💛"), "_blank")}
            >
              Quero o Sabonete de Açafrão
            </Button>
          </div>
        </div>
      </section>

      {/* Rotinas de Skincare */}
      <section className="py-16 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Passo a passo</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-3">
              Rotinas prontas para você
            </h2>
            <p className="text-gray-600">Combine os nossos produtos para resultados ainda melhores.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {rotinas.map((r, i) => (
              <button
                key={r.nome}
                onClick={() => setRotinaAtiva(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  rotinaAtiva === i ? "text-white shadow-md" : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                }`}
                style={rotinaAtiva === i ? { backgroundColor: PINK, borderColor: PINK } : {}}
              >
                <span>{r.emoji}</span>
                {r.nome.split(" (")[0]}
              </button>
            ))}
          </div>

          {/* Rotina ativa */}
          <Card className="border-0 shadow-lg bg-white max-w-3xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{rotinas[rotinaAtiva].emoji}</span>
                <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-xl font-bold">
                  {rotinas[rotinaAtiva].nome}
                </h3>
              </div>
              <ul className="space-y-3 mb-6">
                {rotinas[rotinaAtiva].passos.map((passo, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: PINK }}>
                      {idx + 1}
                    </span>
                    {passo}
                  </li>
                ))}
              </ul>
              <Button
                className="text-white w-full"
                style={{ backgroundColor: PINK }}
                onClick={() => {
                  const r = rotinas[rotinaAtiva];
                  const msg = `Olá! Quero montar a "${r.nome}":\n${r.passos.map((p, i) => `${i + 1}. ${p}`).join("\n")}`;
                  window.open(wa(msg), "_blank");
                }}
              >
                <MessageCircle size={16} className="mr-2" /> Montar minha rotina
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 text-white text-center" style={{ backgroundColor: PINK }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🌿</div>
          <h2 style={{ fontFamily: "Floane, serif" }} className="text-3xl md:text-4xl font-bold mb-4">
            Pronta para transformar sua rotina?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Fale com a Yami e receba uma indicação personalizada para o seu tipo de pele.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white font-bold px-8"
              style={{ color: PINK }}
              onClick={() => window.open(wa("Olá! Quero uma indicação personalizada para o meu tipo de pele."), "_blank")}
            >
              <MessageCircle size={18} className="mr-2" /> Falar com a Yami no WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white/10 hover:text-white px-8"
              onClick={() => window.location.href = "/"}
            >
              Ver todos os produtos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-white" style={{ backgroundColor: PINK }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 style={{ fontFamily: "Floane, serif" }} className="text-lg font-bold mb-2 flex items-center gap-2">
                <Leaf size={18} /> Yami Sabonetes
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Sabonetes artesanais naturais para uma rotina de skincare que respeita a sua pele.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: "Floane, serif" }} className="font-bold mb-3">Contato</h4>
              <div className="space-y-2">
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                  <MessageCircle size={14} /> (19) 99174-3043
                </a>
                <a href="mailto:yamisabonetes@gmail.com" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                  <Mail size={14} /> yamisabonetes@gmail.com
                </a>
                <a href="https://instagram.com/yami_sabonetesartesanais" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                  <Instagram size={14} /> @yami_sabonetesartesanais
                </a>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin size={14} /> Moinhos – Povos Unidos, SP
                </div>
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily: "Floane, serif" }} className="font-bold mb-3">Navegação</h4>
              <ul className="space-y-1">
                <li><a href="/" className="text-white/70 hover:text-white text-sm transition-colors">← Voltar à Loja</a></li>
                <li><a href="/clube" className="text-white/70 hover:text-white text-sm transition-colors">Clube do Sabonete</a></li>
                <li><a href="#tipos" className="text-white/70 hover:text-white text-sm transition-colors">Tipos de Pele</a></li>
                <li><a href="#dolomita-destaque" className="text-white/70 hover:text-white text-sm transition-colors">Mais vendido: Dolomita</a></li>
                <li><a href="#carvao-destaque" className="text-white/70 hover:text-white text-sm transition-colors">Carvão Ativado</a></li>
                <li><a href="#acafrao-destaque" className="text-white/70 hover:text-white text-sm transition-colors">Açafrão</a></li>
                <li><a href="#destaque" className="text-white/70 hover:text-white text-sm transition-colors">Destaque: Hibisco</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 text-center">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} Yami Sabonetes · Cuidados com a Pele · Feito com 🌿 e muito carinho
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
