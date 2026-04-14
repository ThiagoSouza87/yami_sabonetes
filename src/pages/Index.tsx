import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wind, Droplets, Waves, Instagram, MessageCircle, Mail, MapPin, Sparkles, Star, ChevronRight } from "lucide-react";

// ─── Brand Constants ─────────────────────────────────────────────────────────
const PINK = "#c26072";
const BLUE = "#c4dcf0";

// ─── Product Data ─────────────────────────────────────────────────────────────
const sabonetes = [
  { id: 1, nome: "Sabonete de Lavanda", desc: "Relaxante e suave, ideal para o banho noturno.", preco: "R$ 15,00", imagem: "/assets/soap-lavanda.jpg" },
  { id: 2, nome: "Sabonete de Mel", desc: "Hidratante natural com mel puro e aveia.", preco: "R$ 15,00", imagem: "/assets/soap-almonds.jpg" },
  { id: 3, nome: "Sabonete de Carvão Ativado", desc: "Purificante profundo para pele oleosa.", preco: "R$ 15,00", imagem: "/assets/soap-dolomita.jpg" },
  { id: 4, nome: "Sabonete de Camomila", desc: "Calmante e delicado para peles sensíveis.", preco: "R$ 15,00", imagem: "/assets/soap-camomila.jpg" },
  { id: 5, nome: "Sabonete de Limão", desc: "Refrescante e clareador, aroma cítrico.", preco: "R$ 15,00", imagem: "/assets/soap-limao.jpg" },
  { id: 6, nome: "Sabonete de Maracujá", desc: "Nutritivo com vitamina C natural.", preco: "R$ 15,00", imagem: "/assets/soap-maracuja.jpg" },
  { id: 7, nome: "Sabonete de Alecrim", desc: "Energizante e estimulante para o couro cabeludo.", preco: "R$ 15,00", imagem: "/assets/soap-alecrim.jpg" },
  { id: 8, nome: "Sabonete de Babosa", desc: "Regenerador com aloe vera orgânica.", preco: "R$ 15,00", imagem: "/assets/soap-babosa.jpg" },
  { id: 9, nome: "Sabonete de Calêndula", desc: "Anti-inflamatório natural para pele irritada.", preco: "R$ 15,00", imagem: "/assets/soap-calendula.jpg" },
  { id: 10, nome: "Sabonete de Erva-Doce", desc: "Suave e adocicado, aroma aconchegante.", preco: "R$ 15,00", imagem: "/assets/soap-erva-doce.jpg" },
  { id: 11, nome: "Sabonete de Melaleuca", desc: "Antibacteriano natural com tea tree.", preco: "R$ 15,00", imagem: "/assets/soap-melaleuca.jpg" },
  { id: 12, nome: "Sabonete de Melancia", desc: "Hidratante e refrescante para o verão.", preco: "R$ 15,00", imagem: "/assets/soap-melancia.jpg" },
  { id: 13, nome: "Sabonete de Uva", desc: "Antioxidante com extrato de uva silvestre.", preco: "R$ 15,00", imagem: "/assets/soap-uva.jpg" },
  { id: 14, nome: "Sabonete de Limpeza Energética", desc: "Com ervas e sal grosso para renovação.", preco: "R$ 15,00", imagem: "/assets/soap-limpeza-energetica.jpg" },
  { id: 15, nome: "Sabonete Dolomita", desc: "Esfoliante suave com argila dolomita.", preco: "R$ 15,00", imagem: "/assets/soap-dolomita.jpg" },
  { id: 16, nome: "Sabonete de Amêndoas", desc: "Ultra hidratante com óleo de amêndoas doces.", preco: "R$ 15,00", imagem: "/assets/soap-almonds.jpg" },
  { id: 17, nome: "Sabonete de Rosa Mosqueta", desc: "Cicatrizante e regenerador para marcas.", preco: "R$ 15,00", imagem: "/assets/soap-babosa.jpg" },
  { id: 18, nome: "Sabonete de Açaí", desc: "Rico em antioxidantes e vitamina E.", preco: "R$ 15,00", imagem: "/assets/soap-uva.jpg" },
  { id: 19, nome: "Sabonete de Girassol", desc: "Nutritivo e suave para uso diário.", preco: "R$ 15,00", imagem: "/assets/soap-calendula.jpg" },
  { id: 20, nome: "Sabonete de Baunilha", desc: "Aroma doce e envolvente, relaxamento total.", preco: "R$ 15,00", imagem: "/assets/soap-erva-doce.jpg" },
  { id: 21, nome: "Sabonete de Hortelã", desc: "Refrescante e tonificante para o banho.", preco: "R$ 15,00", imagem: "/assets/soap-alecrim.jpg" },
  { id: 22, nome: "Sabonete de Coco", desc: "Hidratante tropical com manteiga de coco.", preco: "R$ 15,00", imagem: "/assets/soap-almonds.jpg" },
  { id: 23, nome: "Sabonete de Morango", desc: "Vitamina C natural para pele radiante.", preco: "R$ 15,00", imagem: "/assets/soap-melancia.jpg" },
  { id: 24, nome: "Sabonete de Argila Verde", desc: "Detox profundo para pele oleosa.", preco: "R$ 15,00", imagem: "/assets/soap-melaleuca.jpg" },
  { id: 25, nome: "Sabonete de Laranja", desc: "Energizante cítrico, aroma refrescante.", preco: "R$ 15,00", imagem: "/assets/soap-limao.jpg" },
  { id: 26, nome: "Sabonete de Alfazema", desc: "Relaxante e terapêutico para o sono.", preco: "R$ 15,00", imagem: "/assets/soap-lavanda.jpg" },
  { id: 27, nome: "Sabonete de Patchouli", desc: "Terroso e envolvente, longa duração.", preco: "R$ 15,00", imagem: "/assets/soap-limpeza-energetica.jpg" },
  { id: 28, nome: "Sabonete de Leite de Cabra", desc: "Ultra suave para pele sensível.", preco: "R$ 15,00", imagem: "/assets/soap-camomila.jpg" },
  { id: 29, nome: "Sabonete de Bamboo", desc: "Purificante com extrato de bambu.", preco: "R$ 15,00", imagem: "/assets/soap-dolomita.jpg" },
  { id: 30, nome: "Sabonete Floral", desc: "Blend especial de flores silvestres.", preco: "R$ 15,00", imagem: "/assets/soap-maracuja.jpg" },
];

const bodySplash = [
  { id: 1, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8174_azul2/IMG_8174_azul.PNG" },
  { id: 2, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8174_azul2/IMG_8174_mini.PNG" },

  { id: 3, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8175_laranja/IMG_8175_laranja.PNG" },
  { id: 4, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8175_laranja/IMG_8175_laranja_mini.PNG" },

  { id: 5, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8179_roxo/IMG_8179_roxo.PNG" },
  { id: 6, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8179_roxo/IMG_8179_roxo_mini.PNG" },

  { id: 7, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8180_amarelo/IMG_8180_amarelo.PNG" },
  { id: 8, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8180_amarelo/IMG_8180_amarelo_mini.PNG" },

  { id: 9, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8180_amarelo/IMG_8180_amarelo2.PNG" },
  { id: 10, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8180_amarelo/IMG_8180_amarelo_mini2.PNG" },

  { id: 11, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8181_rosa/IMG_8181_rosa.PNG" },
  { id: 12, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8181_rosa/IMG_8181_rosa_mini.PNG" },

  { id: 13, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8181_rosa/IMG_8181_rosa.PNG" },
  { id: 14, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8181_rosa/IMG_8181_rosa%20mini2.PNG" },

  { id: 15, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8183_verde/IMG_8183_verde.PNG" },
  { id: 16, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8183_verde/IMG_8183_verde_mini.PNG" },

  { id: 17, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8185_azul/IMG_8185_azul.PNG" },
  { id: 18, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8185_azul/IMG_8185_mini.PNG" },

  { id: 19, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 70,00", imagem: "/assets/body_splash/8245_vermelho/IMG_8245_vermelho.PNG" },
  { id: 20, nome: "Body Splash Lavanda & Baunilha", desc: "Aroma relaxante e duradouro, perfeito para o dia a dia.", preco: "R$ 25,00", imagem: "/assets/body_splash/8245_vermelho/IMG_8245_vermelho_mini.PNG" },
 
];

const geleiasDebanho = [
  { id: 1, nome: "Geleia de Banho de Lavanda", desc: "Textura luxuosa com aroma relaxante de lavanda pura.", preco: "R$ 40,00", imagem: "/assets/soap-lavanda.jpg" },
  { id: 2, nome: "Geleia de Banho de Mel & Leite", desc: "Hidratação profunda com mel e leite de cabra.", preco: "R$ 40,00", imagem: "/assets/soap-almonds.jpg" },
  { id: 3, nome: "Geleia de Banho de Morango", desc: "Vitamina C natural, pele macia e perfumada.", preco: "R$ 40,00", imagem: "/assets/soap-melancia.jpg" },
  { id: 4, nome: "Geleia de Banho Floral", desc: "Blend de pétalas e óleos essenciais florais.", preco: "R$ 40,00", imagem: "/assets/soap-calendula.jpg" },
  { id: 5, nome: "Geleia de Banho de Coco", desc: "Tropical e hidratante, sensação aveludada.", preco: "R$ 40,00", imagem: "/assets/soap-maracuja.jpg" },
  { id: 6, nome: "Geleia de Banho Detox", desc: "Carvão ativado e argila para purificação total.", preco: "R$ 40,00", imagem: "/assets/soap-dolomita.jpg" },
];

const saisDebanho = [
  { id: 1, nome: "Sal de Banho Relaxante", desc: "Sal do Himalaia com lavanda e camomila para relaxamento total.", preco: "R$ 45,00", imagem: "/assets/soap-lavanda.jpg" },
  { id: 2, nome: "Sal de Banho Detox", desc: "Sais minerais com carvão ativado e limão para purificação.", preco: "R$ 45,00", imagem: "/assets/soap-limao.jpg" },
  { id: 3, nome: "Sal de Banho Floral", desc: "Pétalas de rosas e sal grosso para ritual de autocuidado.", preco: "R$ 45,00", imagem: "/assets/soap-calendula.jpg" },
  { id: 4, nome: "Sal de Banho Energizante", desc: "Hortelã, eucalipto e sal do mar para renovar as energias.", preco: "R$ 45,00", imagem: "/assets/soap-alecrim.jpg" },
  { id: 5, nome: "Sal de Banho Tropical", desc: "Coco, maracujá e sais minerais para banho refrescante.", preco: "R$ 45,00", imagem: "/assets/soap-maracuja.jpg" },
  { id: 6, nome: "Sal de Banho Anti-Estresse", desc: "Blend de ervas e sais terapêuticos para aliviar tensões.", preco: "R$ 45,00", imagem: "/assets/soap-babosa.jpg" },
  { id: 7, nome: "Sal de Banho Limpeza Energética", desc: "Com ervas protecionais e sal grosso para renovação.", preco: "R$ 45,00", imagem: "/assets/soap-limpeza-energetica.jpg" },
  { id: 8, nome: "Sal de Banho Mel & Leite", desc: "Suave esfoliação com sais finos e mel puro.", preco: "R$ 45,00", imagem: "/assets/soap-almonds.jpg" },
];

// ─── Components ───────────────────────────────────────────────────────────────
interface Produto {
  id: number;
  nome: string;
  desc: string;
  preco: string;
  imagem: string;
}

function ProdutoCard({ produto, badge }: { produto: Produto; badge?: string }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white border-0 shadow-md w-fit mx-auto">
      <div className="overflow-hidden bg-gray-100 min-h-40">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 style={{ fontFamily: "Floane, serif" }} className="font-semibold text-gray-800 text-sm leading-tight">
            {produto.nome}
          </h3>
          {badge && <Badge className="text-white text-xs shrink-0" style={{ backgroundColor: PINK }}>{badge}</Badge>}
        </div>
        <p className="text-gray-500 text-xs mb-3 leading-relaxed">{produto.desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm" style={{ color: PINK }}>{produto.preco}</span>
          <Button
            size="sm"
            className="text-white text-xs px-3 py-1 h-7"
            style={{ backgroundColor: PINK }}
            onClick={() => {
              const msg = encodeURIComponent(`Olá! Gostaria de comprar: ${produto.nome} (${produto.preco})`);
              window.open(`https://wa.me/5519991743043?text=${msg}`, "_blank");
            }}
          >
            Comprar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

type CategoriaKey = "sabonetes" | "bodySplash" | "geleias" | "sais";

const categorias: { key: CategoriaKey; label: string; icon: React.ReactNode; count: number; badge?: string }[] = [
  { key: "sabonetes", label: "Sabonetes", icon: <ShoppingBag size={16} />, count: sabonetes.length },
  { key: "bodySplash", label: "Body Splash", icon: <Wind size={16} />, count: bodySplash.length, badge: "Novo" },
  { key: "geleias", label: "Geleias de Banho", icon: <Droplets size={16} />, count: geleiasDebanho.length, badge: "Novo" },
  { key: "sais", label: "Sais de Banho", icon: <Waves size={16} />, count: saisDebanho.length, badge: "Novo" },
];

const produtosPorCategoria: Record<CategoriaKey, Produto[]> = {
  sabonetes,
  bodySplash,
  geleias: geleiasDebanho,
  sais: saisDebanho,
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaKey>("sabonetes");

  return (
    <div className="min-h-screen" style={{ fontFamily: "Aileron, sans-serif" }}>
      {/* Header */}
      <header className="py-4 px-6 sticky top-0 z-50 shadow-sm" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/yami-logo.jpg" alt="Yami Sabonetes" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <h1 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-xl font-bold leading-tight">
                Yami Sabonetes
              </h1>
              <p className="text-xs text-gray-600">Artesanais & Naturais</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#produtos" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Produtos</a>
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
          </nav>
          <Button
            size="sm"
            className="md:hidden text-white"
            style={{ backgroundColor: PINK }}
            onClick={() => window.location.href = "/clube"}
          >
            Clube ✨
          </Button>
        </div>
      </header>

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
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8"
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {produtosPorCategoria[categoriaAtiva].map((produto) => (
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
                Sediada em Moinhos – Povos Unidos, SP, produzimos tudo de forma artesanal,
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
                { num: "52+", label: "Produtos únicos" },
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
                  <MapPin size={14} /> Moinhos – Povos Unidos, SP
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
  );
}