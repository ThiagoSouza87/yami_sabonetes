import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Wind, Droplets, Waves, Instagram, MessageCircle, Mail, MapPin, Sparkles, Star, ChevronRight, ChevronLeft } from "lucide-react";

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

// ─── Body Splash Agrupado (por produto) ────────────────────────────────────────
// Cada grupo tem "tamanhos" (define preço/SKU e o seletor) e "fotos" (o que o
// carrossel percorre). Cada foto é marcada com o tamanho que representa, então o
// botão de tamanho acende conforme a foto exibida — e vice-versa. As fotos "combo"
// mostram os dois frascos juntos e são marcadas como 160ml.
interface BodySplashTamanho {
  tamanho: string;   // chave: "160ml" | "30ml"
  label: string;     // rótulo exibido no seletor
  preco: string;
  codigo: string;
}

interface BodySplashFoto {
  imagem: string;
  tamanho: string;   // referencia BodySplashTamanho.tamanho
}

interface BodySplashGrupo {
  id: number;
  nome: string;
  beneficio?: string;
  desc: string;
  tamanhos: BodySplashTamanho[];
  fotos: BodySplashFoto[];
}

const PRECO_160 = "R$ 70,00";
const PRECO_30 = "R$ 30,00";

const TAMANHOS_PADRAO = (codGrande: string, codMini: string): BodySplashTamanho[] => [
  { tamanho: "160ml", label: "160ml", preco: PRECO_160, codigo: codGrande },
  { tamanho: "30ml", label: "30ml", preco: PRECO_30, codigo: codMini },
];

const bodySplashGrupos: BodySplashGrupo[] = [
  {
    id: 1,
    nome: "Body Splash A Vida é Bela",
    desc: "Floral alegre e envolvente, perfume marcante para o dia a dia.",
    tamanhos: TAMANHOS_PADRAO("BS01", "BS02"),
    fotos: [
      { imagem: "/assets/body_splash/a-vida-e-bela/a-vida-e-bela-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/a-vida-e-bela/a-vida-e-bela-combo.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/a-vida-e-bela/a-vida-e-bela-30ml.jpg", tamanho: "30ml" },
      { imagem: "/assets/body_splash/a-vida-e-bela/a-vida-e-bela-30ml-v2.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 2,
    nome: "Body Splash Flor de Jade",
    desc: "Delicado e sofisticado, com notas florais suaves.",
    tamanhos: TAMANHOS_PADRAO("BS03", "BS04"),
    fotos: [
      { imagem: "/assets/body_splash/flor-de-jade/flor-de-jade-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/flor-de-jade/flor-de-jade-30ml.jpg", tamanho: "30ml" },
      { imagem: "/assets/body_splash/flor-de-jade/flor-de-jade-30ml-v2.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/flor-de-jade/flor-de-jade-30ml-v3.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 3,
    nome: "Body Splash Flor de Maçã",
    desc: "Frutado e leve, aroma fresco e levemente adocicado.",
    tamanhos: TAMANHOS_PADRAO("BS05", "BS06"),
    fotos: [
      { imagem: "/assets/body_splash/flor-de-maca/flor-de-maca-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/flor-de-maca/flor-de-maca-combo.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/flor-de-maca/flor-de-maca-30ml.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/flor-de-maca/flor-de-maca-30ml-v2.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 4,
    nome: "Body Splash Flor de Seda",
    desc: "Suave e aveludado, fragrância elegante e duradoura.",
    tamanhos: TAMANHOS_PADRAO("BS07", "BS08"),
    fotos: [
      { imagem: "/assets/body_splash/flor-de-seda/flor-de-seda-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/flor-de-seda/flor-de-seda-combo.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/flor-de-seda/flor-de-seda-30ml.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/flor-de-seda/flor-de-seda-30ml-v2.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 5,
    nome: "Body Splash Folha Seca",
    desc: "Amadeirado e aconchegante, perfume terroso e marcante.",
    tamanhos: TAMANHOS_PADRAO("BS09", "BS10"),
    fotos: [
      { imagem: "/assets/body_splash/folha-seca/folha-seca-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/folha-seca/folha-seca-combo.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/folha-seca/folha-seca-30ml.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/folha-seca/folha-seca-30ml-v2.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 6,
    nome: "Body Splash Jardim Secreto",
    desc: "Floral misterioso, um buquê de flores irresistível.",
    tamanhos: TAMANHOS_PADRAO("BS11", "BS12"),
    fotos: [
      { imagem: "/assets/body_splash/jardim-secreto/jardim-secreto-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/jardim-secreto/jardim-secreto-30ml.jpg", tamanho: "30ml" },
      { imagem: "/assets/body_splash/jardim-secreto/jardim-secreto-30ml-v2.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/jardim-secreto/jardim-secreto-30ml-v3.jpg", tamanho: "30ml" },
      { imagem: "/assets/body_splash/jardim-secreto/jardim-secreto-30ml-v4.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 7,
    nome: "Body Splash Jasmin",
    desc: "Clássico e romântico, o perfume marcante do jasmim.",
    tamanhos: TAMANHOS_PADRAO("BS13", "BS14"),
    fotos: [
      { imagem: "/assets/body_splash/jasmin/jasmin-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/jasmin/jasmin-combo.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/jasmin/jasmin-30ml.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/jasmin/jasmin-30ml-v2.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 8,
    nome: "Body Splash Orquídeas",
    desc: "Exótico e refinado, fragrância floral luxuosa.",
    tamanhos: TAMANHOS_PADRAO("BS15", "BS16"),
    fotos: [
      { imagem: "/assets/body_splash/orquideas/orquideas-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/orquideas/orquideas-combo.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/orquideas/orquideas-30ml.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/orquideas/orquideas-30ml-v2.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 9,
    nome: "Body Splash Pitanga Preta",
    desc: "Frutado intenso e sedutor, aroma envolvente e único.",
    tamanhos: TAMANHOS_PADRAO("BS17", "BS18"),
    fotos: [
      { imagem: "/assets/body_splash/pitanga-preta/pitanga-preta-160ml.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/pitanga-preta/pitanga-preta-combo.jpg", tamanho: "160ml" },
      { imagem: "/assets/body_splash/pitanga-preta/pitanga-preta-30ml.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/pitanga-preta/pitanga-preta-30ml-v2.jpg", tamanho: "30ml" },
    ],
  },
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
              const msg = encodeURIComponent(
                `Olá! Gostaria de comprar: ${produto.nome} (${produto.preco})${produto.codigo ? `\nCódigo: ${produto.codigo}` : ""}`
              );
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

function BodySplashCard({ grupo, badge }: { grupo: BodySplashGrupo; badge?: string }) {
  const [idx, setIdx] = useState(0);
  const total = grupo.fotos.length;
  const fotoAtual = grupo.fotos[idx];
  const tamanhoAtual =
    grupo.tamanhos.find((t) => t.tamanho === fotoAtual.tamanho) ?? grupo.tamanhos[0];

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
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
          <Button
            size="sm"
            className="text-white text-xs px-3 py-1 h-7"
            style={{ backgroundColor: PINK }}
            onClick={() => {
              const msg = encodeURIComponent(
                `Olá! Gostaria de comprar: ${grupo.nome} - ${tamanhoAtual.label} (${tamanhoAtual.preco})\nCódigo: ${tamanhoAtual.codigo}`
              );
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
  { key: "bodySplash", label: "Body Splash", icon: <Wind size={16} />, count: bodySplashGrupos.length, badge: "Novo" },
  { key: "geleias", label: "Geleias de Banho", icon: <Droplets size={16} />, count: geleiasDebanho.length, badge: "Novo" },
  { key: "sais", label: "Sais de Banho", icon: <Waves size={16} />, count: saisDebanho.length, badge: "Novo" },
];

const produtosPorCategoria: Record<Exclude<CategoriaKey, "bodySplash">, Produto[]> = {
  sabonetes,
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
                  Escolha seu Body Splash ideal: cada cor representa um aroma único com benefícios específicos. Disponível em tamanho Grande (160ml) e Mini (30ml) para você experimentar.
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
            {categoriaAtiva === "bodySplash"
              ? bodySplashGrupos.map((grupo) => (
                  <BodySplashCard key={`grupo-${grupo.id}`} grupo={grupo} />
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