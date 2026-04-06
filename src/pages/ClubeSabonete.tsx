import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Leaf, Sparkles, Heart, Gift, Package, Star,
  Check, ChevronDown, ChevronUp, ArrowRight,
  RefreshCw, Truck, Shield, Instagram, Mail, Phone, Menu, X
} from 'lucide-react';

const PINK = '#c26072';
const BLUE = '#c4dcf0';

const sabonetes = [
  { name: 'Lavanda', emoji: '💜', beneficio: 'Relaxante' },
  { name: 'Carvão Ativado', emoji: '🖤', beneficio: 'Purificante' },
  { name: 'Argila Verde', emoji: '💚', beneficio: 'Detox' },
  { name: 'Calêndula', emoji: '🌼', beneficio: 'Cicatrizante' },
  { name: 'Alecrim', emoji: '🌿', beneficio: 'Antioleosidade' },
  { name: 'Rosa Mosqueta', emoji: '🌹', beneficio: 'Anti-idade' },
  { name: 'Camomila', emoji: '🌸', beneficio: 'Calmante' },
  { name: 'Café', emoji: '☕', beneficio: 'Esfoliante' },
  { name: 'Coco', emoji: '🥥', beneficio: 'Hidratante' },
  { name: 'Eucalipto', emoji: '🍃', beneficio: 'Refrescante' },
  { name: 'Hortelã', emoji: '🌱', beneficio: 'Revigorante' },
  { name: 'Chá Verde', emoji: '🍵', beneficio: 'Antioxidante' },
];

const planos = {
  mensal: [
    {
      nome: 'Essencial',
      preco: 'R$ 49,90',
      periodo: '/mês',
      destaque: false,
      badge: '',
      itens: [
        '3 sabonetes artesanais curados',
        '1 fragrância surpresa exclusiva',
        'Embalagem presenteável kraft',
        'Acesso à comunidade Yami',
      ],
    },
    {
      nome: 'Encantado',
      preco: 'R$ 79,90',
      periodo: '/mês',
      destaque: true,
      badge: 'Mais Popular',
      itens: [
        '5 sabonetes artesanais curados',
        'Escolha 2 fragrâncias preferidas',
        '1 item surpresa exclusivo',
        'Embalagem premium com cartão',
        '15% de desconto na loja',
      ],
    },
    {
      nome: 'Ritual',
      preco: 'R$ 119,90',
      periodo: '/mês',
      destaque: false,
      badge: '',
      itens: [
        '8 sabonetes artesanais curados',
        'Personalização completa',
        '2 itens exclusivos para assinantes',
        'Embalagem luxo + fita personalizada',
        '20% de desconto na loja',
        'Acesso antecipado a lançamentos',
      ],
    },
  ],
  trimestral: [
    {
      nome: 'Essencial',
      preco: 'R$ 44,90',
      periodo: '/mês · cobrado trimestralmente',
      destaque: false,
      badge: '10% off',
      itens: [
        '3 sabonetes artesanais curados',
        '1 fragrância surpresa exclusiva',
        'Embalagem presenteável kraft',
        'Acesso à comunidade Yami',
      ],
    },
    {
      nome: 'Encantado',
      preco: 'R$ 71,90',
      periodo: '/mês · cobrado trimestralmente',
      destaque: true,
      badge: 'Mais Popular',
      itens: [
        '5 sabonetes artesanais curados',
        'Escolha 2 fragrâncias preferidas',
        '1 item surpresa exclusivo',
        'Embalagem premium com cartão',
        '15% de desconto na loja',
      ],
    },
    {
      nome: 'Ritual',
      preco: 'R$ 107,90',
      periodo: '/mês · cobrado trimestralmente',
      destaque: false,
      badge: '10% off',
      itens: [
        '8 sabonetes artesanais curados',
        'Personalização completa',
        '2 itens exclusivos para assinantes',
        'Embalagem luxo + fita personalizada',
        '20% de desconto na loja',
        'Acesso antecipado a lançamentos',
      ],
    },
  ],
  anual: [
    {
      nome: 'Essencial',
      preco: 'R$ 39,90',
      periodo: '/mês · cobrado anualmente',
      destaque: false,
      badge: '20% off',
      itens: [
        '3 sabonetes artesanais curados',
        '1 fragrância surpresa exclusiva',
        'Embalagem presenteável kraft',
        'Acesso à comunidade Yami',
      ],
    },
    {
      nome: 'Encantado',
      preco: 'R$ 63,90',
      periodo: '/mês · cobrado anualmente',
      destaque: true,
      badge: 'Melhor Valor',
      itens: [
        '5 sabonetes artesanais curados',
        'Escolha 2 fragrâncias preferidas',
        '1 item surpresa exclusivo',
        'Embalagem premium com cartão',
        '15% de desconto na loja',
      ],
    },
    {
      nome: 'Ritual',
      preco: 'R$ 95,90',
      periodo: '/mês · cobrado anualmente',
      destaque: false,
      badge: '20% off',
      itens: [
        '8 sabonetes artesanais curados',
        'Personalização completa',
        '2 itens exclusivos para assinantes',
        'Embalagem luxo + fita personalizada',
        '20% de desconto na loja',
        'Acesso antecipado a lançamentos',
      ],
    },
  ],
};

const depoimentos = [
  {
    nome: 'Fernanda O.',
    cidade: 'São Paulo, SP',
    texto: 'Recebo minha caixinha todo mês com uma alegria enorme! A qualidade dos sabonetes é incrível e a embalagem chega linda. Vale muito cada centavo.',
  },
  {
    nome: 'Mariana L.',
    cidade: 'Curitiba, PR',
    texto: 'Dei de presente para minha mãe e ela amou! Parecia um presente de loja de luxo. O sabonete de Rosa Mosqueta é maravilhoso, recomendo muito.',
  },
  {
    nome: 'Camila R.',
    cidade: 'Belo Horizonte, MG',
    texto: 'Sou assinante há 6 meses e nunca me decepcionei. A personalização funciona muito bem — recebo exatamente o que gosto. Fã da Yami!',
  },
];

const faqs = [
  {
    pergunta: 'Quando minha caixinha chega?',
    resposta: 'As caixas são despachadas entre os dias 5 e 10 de cada mês. O prazo de entrega é de 3 a 7 dias úteis dependendo da sua região.',
  },
  {
    pergunta: 'Posso cancelar a qualquer momento?',
    resposta: 'Sim! Não há fidelidade no plano mensal. Para os planos trimestral e anual, o cancelamento encerra a renovação após o período contratado.',
  },
  {
    pergunta: 'Como funciona a personalização?',
    resposta: 'Após assinar, você preenche um quiz de preferências e nossa equipe seleciona os sabonetes com base no seu perfil. Nos planos Encantado e Ritual você escolhe fragrâncias diretamente.',
  },
  {
    pergunta: 'Os sabonetes são realmente artesanais?',
    resposta: '100%! Todos os sabonetes Yami são produzidos em pequenos lotes com ingredientes naturais, sem parabenos ou sulfatos. Cada peça é única.',
  },
  {
    pergunta: 'Posso dar uma assinatura de presente?',
    resposta: 'Sim! Oferecemos gift cards para 3, 6 ou 12 meses. A caixa chega com cartão personalizado e mensagem à sua escolha. Entre em contato pelo WhatsApp.',
  },
];

type Periodo = 'mensal' | 'trimestral' | 'anual';

export default function ClubeSabonete() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [periodo, setPeriodo] = useState<Periodo>('mensal');
  const [faqAberto, setFaqAberto] = useState<number | null>(null);
  const [saborSelecionado, setSaborSelecionado] = useState<string[]>([]);

  const toggleSabor = (nome: string) => {
    setSaborSelecionado(prev =>
      prev.includes(nome) ? prev.filter(s => s !== nome) : [...prev, nome]
    );
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: BLUE }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src="/assets/yami-logo-main.jpg"
                alt="Yami Sabonetes"
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Floane, serif', color: PINK }}>
                  Yami Sabonetes
                </h1>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Aileron, sans-serif' }}>
                  Clube de Assinatura
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {['Como Funciona', 'Planos', 'Fragrâncias', 'Depoimentos', 'FAQ'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                  className="text-gray-700 hover:transition-colors font-medium"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                  onMouseEnter={e => (e.currentTarget.style.color = PINK)}
                  onMouseLeave={e => (e.currentTarget.style.color = '')}
                >
                  {item}
                </a>
              ))}
              <Button
                className="text-white font-semibold px-6"
                style={{ backgroundColor: PINK, fontFamily: 'Aileron, sans-serif' }}
                onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Assinar agora
              </Button>
            </nav>
            <button className="md:hidden" onClick={() => setMenuAberto(!menuAberto)}>
              {menuAberto ? <X size={24} color={PINK} /> : <Menu size={24} color={PINK} />}
            </button>
          </div>
          {menuAberto && (
            <div className="md:hidden pt-4 pb-2 flex flex-col gap-3 border-t border-white/40 mt-4">
              {['Como Funciona', 'Planos', 'Fragrâncias', 'Depoimentos', 'FAQ'].map(item => (
                <a key={item} href="#" className="text-gray-700 font-medium py-1" style={{ fontFamily: 'Aileron, sans-serif' }}
                  onClick={() => setMenuAberto(false)}>
                  {item}
                </a>
              ))}
              <Button className="text-white mt-2" style={{ backgroundColor: PINK }}>Assinar agora</Button>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: PINK }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-6 text-sm px-4 py-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', fontFamily: 'Aileron, sans-serif' }}>
                <Leaf size={12} className="mr-1" /> 100% artesanal · ingredientes naturais
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Floane, serif' }}>
                O ritual de cuidado que você merece, todo mês.
              </h2>
              <p className="text-xl mb-8 leading-relaxed text-white/90" style={{ fontFamily: 'Aileron, sans-serif' }}>
                Assine o Clube Yami e receba uma seleção exclusiva de sabonetes artesanais feitos à mão, com fragrâncias únicas e ingredientes naturais — personalizados para você.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-xl px-10 py-7 font-bold rounded-full hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'white', color: PINK, fontFamily: 'Aileron, sans-serif' }}
                  onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Gift className="mr-2" size={20} />
                  Quero minha caixinha
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-7 rounded-full border-white/50 text-white hover:bg-white/10"
                  style={{ fontFamily: 'Aileron, sans-serif' }}
                  onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Como funciona
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 mt-10 text-sm text-white/80" style={{ fontFamily: 'Aileron, sans-serif' }}>
                {['Sem fidelidade', 'Cancele quando quiser', 'Frete incluso'].map(item => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Check size={14} className="text-white" /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Caixa visual */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl shadow-2xl flex flex-col items-center justify-center border-4 border-white/30"
                  style={{ backgroundColor: BLUE }}>
                  <img
                    src="/assets/yami-logo-main_variant_1.jpg"
                    alt="Caixa Yami Clube"
                    className="w-48 h-48 object-cover rounded-2xl shadow-lg"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center">
                    <span className="text-7xl">🧼</span>
                    <p className="font-semibold text-sm mt-3" style={{ color: PINK, fontFamily: 'Aileron, sans-serif' }}>Caixa Yami Clube</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg rotate-12"
                  style={{ backgroundColor: PINK, fontFamily: 'Aileron, sans-serif' }}>
                  Exclusivo ✨
                </div>
                <div className="absolute -bottom-5 -left-4 bg-white text-gray-700 text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border"
                  style={{ borderColor: BLUE, fontFamily: 'Aileron, sans-serif' }}>
                  <div className="flex -space-x-2">
                    {['bg-rose-300', 'bg-blue-200', 'bg-green-200'].map((c, i) => (
                      <div key={i} className={`w-6 h-6 ${c} rounded-full border-2 border-white`} />
                    ))}
                  </div>
                  <span className="font-semibold" style={{ color: PINK }}>+1.200 assinantes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section style={{ backgroundColor: BLUE }}>
        <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '1.200+', label: 'Assinantes felizes' },
            { num: '30', label: 'Fragrâncias disponíveis' },
            { num: '4.9★', label: 'Avaliação média' },
            { num: '100%', label: 'Artesanal e natural' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-bold" style={{ color: PINK, fontFamily: 'Floane, serif' }}>{s.num}</p>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Aileron, sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Floane, serif', color: PINK }}>
              Como Funciona
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: PINK }}></div>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'Aileron, sans-serif' }}>
              Em três passos, seu ritual de autocuidado começa.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { step: '01', icon: Heart, title: 'Escolha seu plano', desc: 'Selecione entre Essencial, Encantado ou Ritual — no ritmo mensal, trimestral ou anual que faz mais sentido pra você.' },
              { step: '02', icon: Sparkles, title: 'Personalize suas fragrâncias', desc: 'Preencha um quiz rápido e nossa equipe cuida do resto. Nos planos Encantado e Ritual você escolhe suas favoritas diretamente.' },
              { step: '03', icon: Truck, title: 'Receba em casa', desc: 'Sua caixinha chega toda embalada com carinho, entre os dias 5 e 10 de cada mês. Abrir é o melhor momento do dia!' },
            ].map(s => (
              <Card key={s.step} className="border-2 hover:shadow-2xl transition-all duration-300 group" style={{ borderColor: BLUE }}>
                <CardContent className="pt-10 text-center">
                  <div className="text-6xl font-black mb-4 transition-colors" style={{ color: BLUE, fontFamily: 'Floane, serif' }}>
                    {s.step}
                  </div>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-colors"
                    style={{ backgroundColor: BLUE }}>
                    <s.icon size={28} style={{ color: PINK }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Floane, serif', color: '#222' }}>{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FRAGRÂNCIAS */}
      <section id="fragrancias" className="py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Floane, serif', color: PINK }}>
              Nossas Fragrâncias
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: PINK }}></div>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'Aileron, sans-serif' }}>
              Clique nas suas favoritas para simular sua seleção
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {sabonetes.map(s => {
              const selecionado = saborSelecionado.includes(s.name);
              return (
                <button
                  key={s.name}
                  onClick={() => toggleSabor(s.name)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border-2 text-sm font-medium text-left transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: selecionado ? PINK : 'white',
                    borderColor: selecionado ? PINK : BLUE,
                    color: selecionado ? 'white' : '#444',
                    fontFamily: 'Aileron, sans-serif',
                    boxShadow: selecionado ? '0 4px 14px rgba(194,96,114,0.3)' : undefined,
                  }}
                >
                  <span className="text-xl">{s.emoji}</span>
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs opacity-70">{s.beneficio}</div>
                  </div>
                </button>
              );
            })}
          </div>
          {saborSelecionado.length > 0 && (
            <div className="mt-8 max-w-2xl mx-auto rounded-2xl px-6 py-4 text-center"
              style={{ backgroundColor: BLUE, fontFamily: 'Aileron, sans-serif' }}>
              <p className="font-semibold" style={{ color: PINK }}>
                Sua seleção: {saborSelecionado.join(' · ')} 🌸
              </p>
              <p className="text-sm text-gray-600 mt-1">Adoramos seu gosto! Essas fragrâncias estarão disponíveis no seu plano.</p>
            </div>
          )}
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Floane, serif', color: PINK }}>
              Por Que Assinar o Clube?
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: PINK }}></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: '100% Natural', desc: 'Sem parabenos, sem sulfatos. Ingredientes que você reconhece e confia.' },
              { icon: Package, title: 'Embalagem Presente', desc: 'Cada caixinha chega pronta para abrir com aquela sensação de mimo.' },
              { icon: RefreshCw, title: 'Sempre Novidades', desc: 'Seleção renovada todo mês. Você sempre descobre algo diferente.' },
              { icon: Shield, title: 'Sem Complicação', desc: 'Cancele quando quiser, troque de plano ou pause. Você manda.' },
            ].map(b => (
              <Card key={b.title} className="border-2 hover:shadow-2xl transition-all duration-300 group" style={{ borderColor: BLUE }}>
                <CardContent className="pt-10 text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors"
                    style={{ backgroundColor: BLUE }}>
                    <b.icon size={32} style={{ color: PINK }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Floane, serif' }}>{b.title}</h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Aileron, sans-serif' }}>{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Floane, serif', color: PINK }}>
              Escolha Seu Plano
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: PINK }}></div>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'Aileron, sans-serif' }}>
              Quanto mais você assina, mais desconto e mais mimo por mês.
            </p>
          </div>

          {/* Toggle período */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-full p-1 gap-1 border-2" style={{ backgroundColor: BLUE, borderColor: BLUE }}>
              {(['mensal', 'trimestral', 'anual'] as Periodo[]).map(p => (
                <button
                  key={p}
                  onClick={() => setPeriodo(p)}
                  className="px-6 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-200"
                  style={{
                    backgroundColor: periodo === p ? PINK : 'transparent',
                    color: periodo === p ? 'white' : '#555',
                    fontFamily: 'Aileron, sans-serif',
                  }}
                >
                  {p}
                  {p === 'anual' && <span className="ml-1 text-xs opacity-80">−20%</span>}
                  {p === 'trimestral' && <span className="ml-1 text-xs opacity-80">−10%</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {planos[periodo].map(plano => (
              <div
                key={plano.nome}
                className="rounded-3xl border-2 p-8 relative flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: plano.destaque ? PINK : 'white',
                  borderColor: plano.destaque ? PINK : BLUE,
                  color: plano.destaque ? 'white' : 'inherit',
                }}
              >
                {plano.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full shadow"
                    style={{
                      backgroundColor: plano.destaque ? 'white' : PINK,
                      color: plano.destaque ? PINK : 'white',
                      fontFamily: 'Aileron, sans-serif',
                    }}>
                    {plano.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Floane, serif' }}>{plano.nome}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black">{plano.preco}</span>
                  </div>
                  <p className="text-xs mt-1 opacity-70" style={{ fontFamily: 'Aileron, sans-serif' }}>{plano.periodo}</p>
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plano.itens.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm" style={{ fontFamily: 'Aileron, sans-serif' }}>
                      <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: plano.destaque ? 'white' : PINK }} />
                      <span className={plano.destaque ? 'text-white/90' : 'text-gray-600'}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="w-full text-base font-bold rounded-full hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: plano.destaque ? 'white' : PINK,
                    color: plano.destaque ? PINK : 'white',
                    fontFamily: 'Aileron, sans-serif',
                  }}
                  onClick={() => window.open('https://wa.me/5519991743043', '_blank')}
                >
                  Assinar plano {plano.nome}
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8" style={{ fontFamily: 'Aileron, sans-serif' }}>
            Frete grátis para todo o Brasil · Pagamento seguro · Cancele quando quiser
          </p>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Floane, serif', color: PINK }}>
              Quem Já Ama o Clube
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: PINK }}></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map(d => (
              <Card key={d.nome} className="border-2 hover:shadow-2xl transition-all" style={{ borderColor: BLUE }}>
                <CardContent className="pt-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={PINK} style={{ color: PINK }} />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-5 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
                    "{d.texto}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                      style={{ backgroundColor: PINK }}>
                      {d.nome[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm" style={{ fontFamily: 'Floane, serif' }}>{d.nome}</p>
                      <p className="text-gray-400 text-xs" style={{ fontFamily: 'Aileron, sans-serif' }}>{d.cidade}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Floane, serif', color: PINK }}>
              Perguntas Frequentes
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: PINK }}></div>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border-2 overflow-hidden bg-white" style={{ borderColor: BLUE }}>
                <button
                  onClick={() => setFaqAberto(faqAberto === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: faqAberto === i ? PINK : 'white' }}
                >
                  <span className="font-semibold pr-4" style={{ fontFamily: 'Floane, serif', color: faqAberto === i ? 'white' : '#222' }}>
                    {faq.pergunta}
                  </span>
                  {faqAberto === i
                    ? <ChevronUp size={18} color="white" />
                    : <ChevronDown size={18} color={PINK} />
                  }
                </button>
                {faqAberto === i && (
                  <div className="px-6 pb-5 pt-4 text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
                    {faq.resposta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24" style={{ backgroundColor: PINK }}>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="text-6xl mb-6">🧼✨</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'Floane, serif' }}>
            Comece seu ritual de autocuidado hoje.
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
            Junte-se a mais de 1.200 pessoas que já descobriram o prazer de receber sabonetes Yami na porta de casa todo mês.
          </p>
          <Button
            size="lg"
            className="text-xl px-12 py-7 font-bold rounded-full hover:opacity-90 transition-opacity shadow-2xl"
            style={{ backgroundColor: 'white', color: PINK, fontFamily: 'Aileron, sans-serif' }}
            onClick={() => window.open('https://wa.me/5519991743043', '_blank')}
          >
            <Gift className="mr-2" size={22} />
            Assinar o Clube Yami
          </Button>
          <p className="text-white/70 text-sm mt-6" style={{ fontFamily: 'Aileron, sans-serif' }}>
            Frete grátis · Sem fidelidade no plano mensal · Cancele quando quiser
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-white" style={{ backgroundColor: PINK }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/assets/yami-logo-main_variant_3.png"
                  alt="Yami Sabonetes"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                />
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Floane, serif' }}>Yami Sabonetes</h3>
              </div>
              <p className="text-white/90 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
                Cuidado natural para sua pele, feito com amor e ingredientes selecionados da natureza.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-5" style={{ fontFamily: 'Floane, serif' }}>Clube Yami</h3>
              <ul className="space-y-2 text-white/90" style={{ fontFamily: 'Aileron, sans-serif' }}>
                {['Como funciona', 'Planos e preços', 'Fragrâncias', 'Dar de presente', 'Loja Yami'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-5" style={{ fontFamily: 'Floane, serif' }}>Fale Conosco</h3>
              <ul className="space-y-3 text-white/90" style={{ fontFamily: 'Aileron, sans-serif' }}>
                <li className="flex items-center gap-2">
                  <Instagram size={16} />
                  <a href="https://www.instagram.com/yami_sabonetesartesanais/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    @yami_sabonetesartesanais
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <a href="https://wa.me/5519991743043" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    (19) 99174-3043
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>yamisabonetes@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/80 text-sm" style={{ fontFamily: 'Aileron, sans-serif' }}>
            <p>© 2025 Yami Sabonetes · Todos os direitos reservados · Moinhos Povos Unidos, SP</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
