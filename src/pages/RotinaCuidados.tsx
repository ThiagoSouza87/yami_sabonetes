import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoveHorizontal, MessageCircle, Instagram, Mail, MapPin, Sparkles,
  Sun, Droplets, Heart, Clock, Check,
} from "lucide-react";

// ─── Brand Constants ─────────────────────────────────────────────────────────
const PINK = "#c26072";
const BLUE = "#c4dcf0";
const WHATSAPP = "5519991743043";

// ─── Slider Antes/Depois ──────────────────────────────────────────────────────
function AntesDepois({ antes, depois, nome }: { antes: string; depois: string; nome: string }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [antesOk, setAntesOk] = useState(true);
  const [depoisOk, setDepoisOk] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const mover = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  };

  const Placeholder = ({ tom }: { tom: string }) => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ backgroundColor: tom }}>
      <Sparkles size={26} style={{ color: "#8a6a72" }} />
      <span className="text-sm" style={{ color: "#8a6a72" }}>foto em breve</span>
    </div>
  );

  return (
    <div
      ref={ref}
      className="relative w-full rounded-2xl overflow-hidden shadow-md select-none"
      style={{ height: 400, touchAction: "none", cursor: "ew-resize" }}
      onPointerDown={(e) => { setDragging(true); mover(e.clientX); }}
      onPointerMove={(e) => dragging && mover(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      {/* Base: Depois */}
      <div className="absolute inset-0">
        {depoisOk ? (
          <img src={depois} alt={`${nome} depois`} draggable={false} className="w-full h-full object-cover" onError={() => setDepoisOk(false)} />
        ) : (
          <Placeholder tom="#f3ddc8" />
        )}
      </div>

      {/* Topo: Antes (recortado até a alça) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {antesOk ? (
          <img src={antes} alt={`${nome} antes`} draggable={false} className="w-full h-full object-cover" onError={() => setAntesOk(false)} />
        ) : (
          <Placeholder tom="#d8c6b8" />
        )}
      </div>

      {/* Rótulos */}
      <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,.9)", color: "#993556" }}>Antes</span>
      <span className="absolute top-3 right-3 text-xs font-medium px-3 py-1 rounded-full text-white" style={{ backgroundColor: PINK }}>Depois</span>

      {/* Alça */}
      <div className="absolute top-0 bottom-0" style={{ left: `${pos}%`, width: 2, backgroundColor: "#fff", transform: "translateX(-1px)" }}>
        <div
          className="absolute top-1/2 left-1/2 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{ width: 40, height: 40, transform: "translate(-50%,-50%)", backgroundColor: PINK }}
        >
          <MoveHorizontal size={18} />
        </div>
      </div>
    </div>
  );
}

// ─── Dados dos Sabonetes ──────────────────────────────────────────────────────
interface RotinaSabonete {
  id: number;
  nome: string;
  codigo: string;
  pasta: string;
  tagline: string;
  descricao: string;
  frequencia: string;
  passos: string[];
  resultado: string;
}

const sabonetes: RotinaSabonete[] = [
  {
    id: 1,
    nome: "Carvão Ativado",
    codigo: "SAB07",
    pasta: "carvao_ativado",
    tagline: "Detox e controle da oleosidade",
    descricao: "O carvão ativado age como um ímã de impurezas: desobstrui os poros, remove o excesso de oleosidade e ajuda a controlar a acne, deixando a pele limpa e equilibrada.",
    frequencia: "3 a 4x por semana, à noite",
    passos: [
      "Umedeça o rosto com água morna",
      "Massageie a espuma por 30 segundos, evitando os olhos",
      "Enxágue e finalize com o hidratante de sua preferência",
    ],
    resultado: "Poros mais limpos, menos oleosidade e cravos ao longo das semanas.",
  },
  {
    id: 2,
    nome: "Argila Branca",
    codigo: "SAB02",
    pasta: "argila_branca",
    tagline: "Limpeza suave para peles sensíveis",
    descricao: "A argila branca é a mais delicada das argilas: purifica e absorve impurezas sem ressecar, sendo ideal para o uso diário em peles sensíveis e delicadas.",
    frequencia: "Diariamente, dia e noite",
    passos: [
      "Aplique sobre a pele úmida com movimentos circulares suaves",
      "Deixe agir por 1 minuto para potencializar a limpeza",
      "Enxágue com água em temperatura amena",
    ],
    resultado: "Pele limpa, macia e confortável, sem sensação de repuxar.",
  },
  {
    id: 3,
    nome: "Dolomita",
    codigo: "SAB08",
    pasta: "dolomita",
    tagline: "Esfoliação que renova a textura",
    descricao: "Com a esfoliação delicada da argila dolomita, este sabonete remove as células mortas e estimula a renovação, revelando uma pele mais lisa, suave e uniforme.",
    frequencia: "2x por semana",
    passos: [
      "Use sobre a pele úmida em movimentos circulares",
      "Concentre nas áreas mais ásperas (cotovelos, joelhos)",
      "Enxágue bem e hidrate em seguida",
    ],
    resultado: "Textura mais lisa e maciez visível já nas primeiras aplicações.",
  },
  {
    id: 4,
    nome: "Amêndoa",
    codigo: "SAB01",
    pasta: "amendoa",
    tagline: "Hidratação e maciez no dia a dia",
    descricao: "Rico em óleo de amêndoas doces, nutre profundamente durante o banho e mantém a pele macia, hidratada e levemente perfumada — perfeito para o uso diário.",
    frequencia: "Diariamente, no banho",
    passos: [
      "Espalhe a espuma pelo corpo e rosto",
      "Deixe agir alguns segundos antes de enxaguar",
      "Seque com toques leves para preservar a hidratação",
    ],
    resultado: "Pele nutrida, macia e sedosa do banho ao fim do dia.",
  },
  {
    id: 5,
    nome: "Açafrão & Dolomita",
    codigo: "SAB15",
    pasta: "acafrao_dolomita",
    tagline: "Esfoliação + ação antioxidante iluminadora",
    descricao: "A combinação do poder antioxidante do açafrão com a esfoliação suave da dolomita ajuda a uniformizar o tom, iluminar e renovar a pele em um só gesto.",
    frequencia: "3x por semana",
    passos: [
      "Massageie sobre a pele úmida em movimentos circulares",
      "Deixe agir por 1 minuto para a ação do açafrão",
      "Enxágue e observe o viço da pele",
    ],
    resultado: "Tom mais uniforme, pele iluminada e renovada com o uso constante.",
  },
];

// ─── Página ───────────────────────────────────────────────────────────────────
export default function RotinaCuidados() {
  const comprar = (nome: string, codigo: string) => {
    const msg = encodeURIComponent(`Olá! Quero incluir o Sabonete de ${nome} na minha rotina de cuidados. Código: ${codigo}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "Aileron, sans-serif" }}>
      {/* Header */}
      <header className="py-4 px-6 sticky top-0 z-50 shadow-sm" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/yami-logo-main.jpg" alt="Yami Sabonetes" className="h-12 w-12 rounded-full object-cover" />
            <div>
              <h1 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-xl font-bold leading-tight">
                Rotina de Cuidados
              </h1>
              <p className="text-xs text-gray-600">Pequenos gestos, grandes resultados</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">← Voltar à Loja</a>
            <a href="/clube" className="text-sm text-gray-700 hover:text-pink-600 transition-colors">Clube ✨</a>
            <Button
              size="sm"
              className="text-white"
              style={{ backgroundColor: PINK }}
              onClick={() => window.open(`https://wa.me/${WHATSAPP}?text=Olá! Quero montar minha rotina de cuidados Yami.`, "_blank")}
            >
              Falar no WhatsApp
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-6 text-white text-center overflow-hidden" style={{ backgroundColor: PINK }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm px-4 py-1">
            🌿 Autocuidado que se vê
          </Badge>
          <h2 style={{ fontFamily: "Floane, serif" }} className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Pequenas ações,<br />grandes resultados
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Uma rotina simples com os sabonetes certos transforma a sua pele.
            Veja o antes e depois de quem cuida da pele todos os dias com a Yami.
          </p>
          <Button
            size="lg"
            className="bg-white font-semibold px-8"
            style={{ color: PINK }}
            onClick={() => document.getElementById("rotinas")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver os resultados
          </Button>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-10 px-6" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {[
            { icon: <Clock size={26} />, titulo: "Constância", sub: "Poucos minutos por dia fazem a diferença." },
            { icon: <Droplets size={26} />, titulo: "Ingredientes naturais", sub: "Cada sabonete com um propósito para a pele." },
            { icon: <Heart size={26} />, titulo: "Resultado real", sub: "Pele mais saudável, semana após semana." },
          ].map((p) => (
            <div key={p.titulo} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-3" style={{ backgroundColor: PINK }}>
                {p.icon}
              </div>
              <p style={{ fontFamily: "Floane, serif", color: PINK }} className="font-bold">{p.titulo}</p>
              <p className="text-gray-600 text-sm mt-1">{p.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rotinas por sabonete */}
      <section id="rotinas" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-3 text-white" style={{ backgroundColor: PINK }}>Antes & Depois</Badge>
            <h2 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-3xl md:text-4xl font-bold mb-3">
              Os sabonetes que transformam a rotina
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Arraste a alça em cada imagem para revelar o resultado. Conheça a rotina ideal de cada um.
            </p>
          </div>

          <div className="space-y-16">
            {sabonetes.map((s, i) => (
              <div key={s.id} className="grid md:grid-cols-2 gap-8 items-center">
                {/* Imagem (alterna o lado) */}
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <AntesDepois
                    antes={`/assets/rotina/${s.pasta}/antes.jpg`}
                    depois={`/assets/rotina/${s.pasta}/depois.jpg`}
                    nome={s.nome}
                  />
                </div>

                {/* Texto */}
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <Badge className="mb-2 text-white text-xs" style={{ backgroundColor: "#27ae60" }}>{s.tagline}</Badge>
                  <h3 style={{ fontFamily: "Floane, serif", color: PINK }} className="text-2xl md:text-3xl font-bold mb-3">
                    Sabonete de {s.nome}
                  </h3>
                  <p className="text-gray-600 mb-5 leading-relaxed">{s.descricao}</p>

                  <div className="rounded-xl p-5 mb-5" style={{ backgroundColor: "#f8f1f3" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Sun size={16} style={{ color: PINK }} />
                      <span className="font-bold text-sm" style={{ color: PINK }}>Rotina sugerida</span>
                      <span className="text-xs text-gray-500">· {s.frequencia}</span>
                    </div>
                    <ul className="space-y-2">
                      {s.passos.map((passo, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white text-xs" style={{ backgroundColor: PINK }}>
                            {idx + 1}
                          </span>
                          {passo}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="flex items-start gap-2 text-sm text-gray-700 mb-5">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: "#27ae60" }} />
                    <span><strong style={{ color: PINK }}>Resultado esperado:</strong> {s.resultado}</span>
                  </p>

                  <Button
                    className="text-white px-6"
                    style={{ backgroundColor: PINK }}
                    onClick={() => comprar(s.nome, s.codigo)}
                  >
                    <MessageCircle size={16} className="mr-2" /> Quero esse na minha rotina
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 text-white text-center" style={{ backgroundColor: PINK }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🌿</div>
          <h2 style={{ fontFamily: "Floane, serif" }} className="text-3xl md:text-4xl font-bold mb-4">
            Comece hoje a sua rotina de cuidados
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Monte um kit com os sabonetes ideais para o seu tipo de pele e sinta a diferença dia após dia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white font-bold px-8"
              style={{ color: PINK }}
              onClick={() => window.open(`https://wa.me/${WHATSAPP}?text=Olá! Quero montar minha rotina de cuidados Yami.`, "_blank")}
            >
              <MessageCircle size={18} className="mr-2" /> Montar minha rotina
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
              <h3 style={{ fontFamily: "Floane, serif" }} className="text-lg font-bold mb-2">Yami Sabonetes</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Sabonetes artesanais naturais para uma rotina de autocuidado que se vê na pele.
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
                <li><a href="#rotinas" className="text-white/70 hover:text-white text-sm transition-colors">Antes & Depois</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 text-center">
            <p className="text-white/50 text-xs">
              © {new Date().getFullYear()} Yami Sabonetes · Rotina de Cuidados · Feito com 🌿 e muito carinho
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
