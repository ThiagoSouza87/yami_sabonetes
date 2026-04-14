import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag, Wind, Droplets, Waves, Star, Check, ChevronDown,
  Instagram, MessageCircle, Mail, MapPin, Sparkles, Gift, Heart, Package
} from "lucide-react";

// ─── Brand Constants ─────────────────────────────────────────────────────────
const PINK = "#c26072";
const BLUE = "#c4dcf0";

// ─── Types ───────────────────────────────────────────────────────────────────
type Periodo = "mensal" | "trimestral" | "anual";
type CategoriaKey = "sabonetes" | "bodySplash" | "geleias" | "sais";

// ─── Categorias da Caixa ─────────────────────────────────────────────────────
const categoriasCaixa: { key: CategoriaKey; label: string; emoji: string; icon: React.ReactNode; desc: string; itens: string[] }[] = [
  {
    key: "sabonetes",
    label: "Sabonetes",
    emoji: "🧼",
    icon: <ShoppingBag size={18} />,
    desc: "Nossos sabonetes artesanais são feitos com ingredientes 100% naturais, em barras únicas e perfumadas.",
    itens: ["Sabonete de Lavanda", "Sabonete de Mel & Aveia", "Sabonete de Carvão Ativado", "Sabonete de Camomila", "Sabonete de Maracujá"],
  },
  {
    key: "bodySplash",
    label: "Body Splash",
    emoji: "🌸",
    icon: <Wind size={18} />,
    desc: "Perfumes corporais suaves e duradouros, feitos com óleos essenciais naturais.",
    itens: ["Body Splash Lavanda & Baunilha", "Body Splash Floral Primavera", "Body Splash Cítrico Energizante", "Body Splash Rosa Selvagem"],
  },
  {
    key: "geleias",
    label: "Geleias de Banho",
    emoji: "🫧",
    icon: <Droplets size={18} />,
    desc: "Textura gelatinosa luxuosa que hidrata e perfuma enquanto você se banha.",
    itens: ["Geleia de Lavanda", "Geleia de Mel & Leite", "Geleia de Morango", "Geleia Floral", "Geleia de Coco"],
  },
  {
    key: "sais",
    label: "Sais de Banho",
    emoji: "🪨",
    icon: <Waves size={18} />,
    desc: "Sais minerais e do Himalaia com óleos e ervas para um banho terapêutico.",
    itens: ["Sal de Banho Relaxante", "Sal de Banho Detox", "Sal Floral com Pétalas", "Sal Energizante", "Sal Limpeza Energética"],
  },
];

// ─── Planos ───────────────────────────────────────────────────────────────────
const planos = [
  {
    nome: "Essencial",
    emoji: "🌿",
    desc: "Perfeito para começar sua jornada de autocuidado.",
    itens: ["2 sabonetes artesanais", "1 body splash", "Embrulho presenteável", "Cartão personalizado"],
    precos: { mensal: "R$ 59,90", trimestral: "R$ 54,90", anual: "R$ 49,90" },
    destaque: false,
    cor: "#8fbe8f",
  },
  {
    nome: "Encantado",
    emoji: "✨",
    desc: "Nossa caixa mais amada, com mix de produtos.",
    itens: ["2 sabonetes artesanais", "1 body splash", "1 geleia de banho", "Embrulho premium", "Cartão personalizado", "Bônus surpresa"],
    precos: { mensal: "R$ 99,90", trimestral: "R$ 89,90", anual: "R$ 79,90" },
    destaque: true,
    cor: PINK,
  },
  {
    nome: "Ritual",
    emoji: "👑",
    desc: "A experiência completa de spa em casa.",
    itens: ["3 sabonetes artesanais", "1 body splash", "1 geleia de banho", "1 sal de banho", "Embrulho luxo", "Cartão especial", "2 bônus surpresa", "Frete grátis"],
    precos: { mensal: "R$ 149,90", trimestral: "R$ 134,90", anual: "R$ 119,90" },
    destaque: false,
    cor: "#c4a24a",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    pergunta: "Como funciona o Clube do Sabonete?",
    resposta:
      "Você escolhe o plano e a periodicidade, faz a assinatura pelo WhatsApp e todo mês (ou trimestre/semestre) recebe uma caixa especial com produtos Yami selecionados a dedo pela nossa equipe.",
  },
  {
    pergunta: "Posso cancelar a qualquer momento?",
    resposta:
      "Sim! Para o plano mensal, basta avisar com até 5 dias de antecedência antes da próxima cobrança. Nos planos trimestral e anual, o cancelamento é possível mas sem reembolso do período já pago.",
  },
  {
    pergunta: "Os produtos são sempre os mesmos?",
    resposta:
      "Não! Cada caixa traz uma curadoria diferente de acordo com a estação do ano e novidades da linha. Você sempre terá surpresas deliciosas!",
  },
  {
    pergunta: "Como é feito o pagamento?",
    resposta:
      "O pagamento é realizado via Pix ou transferência bancária antes do envio. Você receberá as instruções pelo WhatsApp após a confirmação da assinatura.",
  },
  {
    pergunta: "Fazem entrega para todo o Brasil?",
    resposta:
      "Sim! Entregamos para todo o território nacional pelos Correios ou transportadora. O frete é calculado de acordo com o seu CEP (grátis no plano Ritual anual).",
  },
  {
    pergunta: "Posso presentear alguém com o clube?",
    resposta:
      "Com certeza! A assinatura presente é uma das mais pedidas. Entre em contato pelo WhatsApp para combinarmos todos os detalhes da surpresa.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ClubeSabonete() {
  const [periodo, setPeriodo] = useState<Periodo>("mensal");
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaKey>("sabonetes");
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  const descontos: Record<Periodo, string> = {
    mensal: "",
    trimestral: "Economize 8%",
    anual: "Economize 17%",
  };

  const categoriaInfo = categoriasCaixa.find((c) => c.key === categoriaAtiva)!;

  return (
    <div className="min-h-screen" style={{ fontFamily: "Aileron, sans-serif" }}>
      {/* Header */}
      <header className="py-4 px-6 sticky top-0 z-50 shadow-sm" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/yami-logo.jpg" alt="Yami Sabonetes" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <h1 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-xl font-bold leading-tight">
                Clube Yami
              </h1>
              <p className="text-xs text-gray-600">Assinatura de Produtos Artesanais</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">← Voltar à Loja</a>
            <a href="#como-funciona" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Como Funciona</a>
            <a href="#planos" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Planos</a>
            <Button
              size="sm"
              className="text-white"
              style={{ backgroundColor: PINK }}
              onClick={() => window.open("https://wa.me/5519991743043?text=Olá! Quero assinar o Clube do Sabonete!", "_blank")}
            >
              Assinar Agora 🌿
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 px-6 text-white text-center overflow-hidden" style={{ backgroundColor: PINK }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🧼</div>
          <div className="absolute top-20 right-20 text-6xl">🌸</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">🫧</div>
          <div className="absolute bottom-20 right-1/3 text-5xl">🪨</div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm px-4 py-1">
            ✨ Clube de Assinatura Exclusivo
          </Badge>
          <h2
            style={{ fontFamily: "Floane, serif" }}
            className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
          >
            Receba toda mês<br />uma caixa de amor
          </h2>
          <p className="text-white/90 text-xl mb-3 max-w-2xl mx-auto">
            Sabonetes, body splash, geleias e sais de banho artesanais entregues na sua porta.
          </p>
          <p className="text-white/70 text-base mb-8">
            A partir de <strong className="text-white">R$ 59,90/mês</strong> — cancele quando quiser
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white font-bold px-8 text-base"
              style={{ color: PINK }}
              onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver Planos e Preços
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8"
              onClick={() => window.open("https://wa.me/5519991743043?text=Olá! Tenho dúvidas sobre o Clube do Sabonete.", "_blank")}
            >
              <MessageCircle size={16} className="mr-2" /> Tirar Dúvidas
            </Button>
          </div>
        </div>
      </section>

      {/* Números */}
      <section style={{ backgroundColor: BLUE }} className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "52+", label: "Produtos disponíveis" },
            { num: "4", label: "Linhas artesanais" },
            { num: "100%", label: "Natural & Artesanal" },
            { num: "❤️", label: "Feito com amor" },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontFamily: "Floane, serif", color: PINK }} className="text-4xl font-bold">{s.num}</p>
              <p className="text-gray-600 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Simples assim</Badge>
          <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-10">
            Como Funciona o Clube
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", icon: <ShoppingBag size={28} />, titulo: "Escolha seu Plano", desc: "Selecione o plano e a periodicidade que melhor se encaixam no seu estilo de vida." },
              { step: "2", icon: <MessageCircle size={28} />, titulo: "Assine pelo WhatsApp", desc: "Entre em contato, confirme os dados e faça o pagamento de forma simples e segura." },
              { step: "3", icon: <Package size={28} />, titulo: "Receba em Casa", desc: "Nossa equipe monta sua caixa com carinho e envia pelos Correios até a sua porta." },
              { step: "4", icon: <Heart size={28} />, titulo: "Aproveite!", desc: "Abra, descubra as surpresas e transforme seu banho em um ritual de autocuidado." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white mb-4 shadow-md"
                  style={{ backgroundColor: PINK }}
                >
                  {item.icon}
                </div>
                <div
                  className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center mb-2 -mt-2"
                  style={{ backgroundColor: BLUE, color: PINK, border: `2px solid ${PINK}` }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold mb-2">{item.titulo}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Que Vem na Caixa */}
      <section className="py-16 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Curadoria Especial</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-3">
              O Que Vem na Sua Caixa
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Cada caixa é montada com amor com itens de nossas 4 linhas artesanais.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categoriasCaixa.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCategoriaAtiva(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  categoriaAtiva === cat.key
                    ? "text-white shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-pink-300"
                }`}
                style={categoriaAtiva === cat.key ? { backgroundColor: PINK, borderColor: PINK } : {}}
              >
                <span>{cat.emoji}</span>
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category Detail */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl" style={{ backgroundColor: PINK }}>
                      {categoriaInfo.emoji}
                    </div>
                    <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-2xl font-bold">
                      {categoriaInfo.label}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{categoriaInfo.desc}</p>
                  <div className="space-y-2">
                    {categoriaInfo.itens.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: PINK }}>
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                    <p className="text-gray-400 text-xs italic mt-2">* Os produtos variam a cada caixa conforme a curadoria do mês.</p>
                  </div>
                </div>
                <div
                  className="p-8 text-white flex flex-col justify-center"
                  style={{ background: `linear-gradient(135deg, ${PINK}, #d4849a)` }}
                >
                  <Sparkles size={32} className="mb-4 opacity-80" />
                  <h4 style={{ fontFamily: "Floane, serif" }} className="text-xl font-bold mb-3">
                    Por que você vai amar?
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Ingredientes 100% naturais e veganos",
                      "Fragrâncias suaves e duradouras",
                      "Produção artesanal em pequenos lotes",
                      "Sem conservantes ou parabenos",
                      "Embalagem eco-friendly e presenteável",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm">
                        <Check size={14} className="mt-0.5 shrink-0 opacity-80" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Escolha seu Plano</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-3">
              Planos e Preços
            </h2>
            <p className="text-gray-500 mb-6">Sem fidelidade no plano mensal. Economize assinando por mais tempo!</p>

            {/* Period Selector */}
            <div className="inline-flex rounded-full p-1 gap-1" style={{ backgroundColor: BLUE }}>
              {(["mensal", "trimestral", "anual"] as Periodo[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriodo(p)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    periodo === p ? "text-white shadow-sm" : "text-gray-600 hover:text-gray-800"
                  }`}
                  style={periodo === p ? { backgroundColor: PINK } : {}}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                  {p !== "mensal" && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                      {descontos[p]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {planos.map((plano) => (
              <Card
                key={plano.nome}
                className={`relative border-2 transition-shadow hover:shadow-xl overflow-hidden ${
                  plano.destaque ? "shadow-xl scale-105" : "shadow-md"
                }`}
                style={{ borderColor: plano.destaque ? PINK : "#e5e7eb" }}
              >
                {plano.destaque && (
                  <div className="absolute top-0 left-0 right-0 py-1.5 text-center text-white text-xs font-bold" style={{ backgroundColor: PINK }}>
                    ⭐ MAIS POPULAR
                  </div>
                )}
                <CardContent className={`p-6 ${plano.destaque ? "pt-10" : "pt-6"}`}>
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">{plano.emoji}</div>
                    <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-2xl font-bold mb-1">
                      {plano.nome}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{plano.desc}</p>
                    <div>
                      <span style={{ color: PINK }} className="text-4xl font-bold">
                        {plano.precos[periodo]}
                      </span>
                      <span className="text-gray-400 text-sm">/{periodo.slice(0, 3)}</span>
                    </div>
                    {periodo !== "mensal" && (
                      <p className="text-green-600 text-xs mt-1">
                        ✓ {descontos[periodo]} em relação ao plano mensal
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plano.itens.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: plano.destaque ? PINK : "#e5e7eb" }}
                        >
                          <Check size={10} className={plano.destaque ? "text-white" : "text-gray-500"} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full text-white font-semibold py-5"
                    style={{ backgroundColor: plano.destaque ? PINK : plano.cor }}
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `Olá! Quero assinar o Clube do Sabonete Yami — Plano ${plano.nome} (${periodo}): ${plano.precos[periodo]}`
                      );
                      window.open(`https://wa.me/5519991743043?text=${msg}`, "_blank");
                    }}
                  >
                    <MessageCircle size={16} className="mr-2" />
                    Assinar Plano {plano.nome}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            🔒 Pagamento seguro via Pix · Cancele a qualquer momento (plano mensal) · Frete calculado pelo CEP
          </p>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Depoimentos</Badge>
          <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl font-bold mb-10">
            Quem ama o Clube conta
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                nome: "Ana Paula S.",
                tempo: "Assinante há 6 meses",
                texto: "Cada caixa é uma surpresa incrível! Os produtos são de qualidade impecável e o cheiro é maravilhoso. Meu momento de autocuidado ficou muito mais especial!",
                plano: "Plano Encantado",
                stars: 5,
              },
              {
                nome: "Juliana M.",
                tempo: "Assinante há 1 ano",
                texto: "Não consigo mais imaginar meu banho sem os produtos Yami. A geleia de banho de lavanda então… é de outro mundo! Recomendo o plano Ritual de olhos fechados.",
                plano: "Plano Ritual",
                stars: 5,
              },
              {
                nome: "Carla R.",
                tempo: "Assinante há 3 meses",
                texto: "Presenteei minha mãe com o clube e ela amou! A embalagem é linda, parece presente de loja chique. Os sabonetes são suaves e naturais como promete.",
                plano: "Plano Essencial",
                stars: 5,
              },
            ].map((dep) => (
              <Card key={dep.nome} className="bg-white border-0 shadow-md p-6 text-left hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {Array(dep.stars).fill(0).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{dep.texto}"</p>
                <div>
                  <p style={{ color: PINK, fontFamily: "Floane, serif" }} className="font-bold">{dep.nome}</p>
                  <p className="text-gray-400 text-xs">{dep.tempo} · {dep.plano}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Dúvidas</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl font-bold">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                className="border overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                style={{ borderColor: faqAberto === i ? PINK : "#e5e7eb" }}
                onClick={() => setFaqAberto(faqAberto === i ? null : i)}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <p className="font-medium text-gray-800 text-sm">{faq.pergunta}</p>
                    <ChevronDown
                      size={16}
                      className="shrink-0 transition-transform duration-200"
                      style={{
                        color: PINK,
                        transform: faqAberto === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </div>
                  {faqAberto === i && (
                    <div className="px-4 pb-4 border-t" style={{ borderColor: BLUE }}>
                      <p className="text-gray-600 text-sm leading-relaxed pt-3">{faq.resposta}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 text-white text-center" style={{ backgroundColor: PINK }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🧼🌸🫧🪨</div>
          <h2 style={{ fontFamily: "Floane, serif" }} className="text-3xl md:text-4xl font-bold mb-4">
            Transforme seu banho em um ritual
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Assine o Clube Yami hoje e receba toda mês os melhores produtos artesanais naturais direto na sua casa.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white font-bold px-10 text-base"
              style={{ color: PINK }}
              onClick={() => {
                const msg = encodeURIComponent("Olá! Quero assinar o Clube do Sabonete Yami! 🌿");
                window.open(`https://wa.me/5519991743043?text=${msg}`, "_blank");
              }}
            >
              <MessageCircle size={18} className="mr-2" />
              Assinar Agora pelo WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver todos os planos
            </Button>
          </div>
          <p className="text-white/60 text-sm mt-6">
            Cancele quando quiser (plano mensal) · Pagamento seguro via Pix · Entrega para todo Brasil
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-white" style={{ backgroundColor: PINK }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 style={{ fontFamily: "Floane, serif" }} className="text-lg font-bold mb-2">Clube Yami</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Assinatura de produtos artesanais naturais. Cuide-se com o melhor da natureza.
              </p>
            </div>
            <div>
              <h4 style={{ fontFamily: "Floane, serif" }} className="font-bold mb-3">Contato</h4>
              <div className="space-y-2">
                <a href="https://wa.me/5519991743043" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                  <MessageCircle size={14} /> (19) 99174-3043
                </a>
                <a href="mailto:yamisabonetes@gmail.com"
                  className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
                  <Mail size={14} /> yamisabonetes@gmail.com
                </a>
                <a href="https://instagram.com/yami_sabonetesartesanais" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
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
                <li><a href="#como-funciona" className="text-white/70 hover:text-white text-sm transition-colors">Como Funciona</a></li>
                <li><a href="#planos" className="text-white/70 hover:text-white text-sm transition-colors">Planos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 text-center">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} Yami Sabonetes · Clube de Assinatura · Feito com 🌿 e muito carinho
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}