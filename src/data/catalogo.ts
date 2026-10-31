// Catálogo de produtos (fonte única): usado pela vitrine (Index) e, via SKUs,
// pelo controle de estoque. Mover/alterar aqui reflete nos dois lugares.

// ─── Product Data ─────────────────────────────────────────────────────────────
// Sabonetes artesanais: cada produto tem seu próprio carrossel de fotos reais.
export interface SaboneteProduto {
  id: number;
  nome: string;
  codigo: string;
  desc: string;
  preco: string;
  fotos: string[];
}

const PRECO_SABONETE = "R$ 17,00";
const img = (pasta: string, arquivo: string) => `/assets/sabonetes/${pasta}/${arquivo}`;

export const sabonetes: SaboneteProduto[] = [
  {
    id: 1, nome: "Sabonete de Amêndoa", codigo: "SAB01", preco: PRECO_SABONETE,
    desc: "Rico em óleo de amêndoas doces: hidrata profundamente e deixa a pele macia e nutrida.",
    fotos: [img("amendoa", "amendoa-1.jpg"), img("amendoa", "amendoa-2.jpg"), img("amendoa", "amendoa-3.jpg")],
  },
  {
    id: 2, nome: "Sabonete de Argila Branca", codigo: "SAB02", preco: PRECO_SABONETE,
    desc: "Limpeza suave que purifica sem ressecar — ideal para peles sensíveis e delicadas.",
    fotos: [img("argila_branca", "argila_branca-1.jpg"), img("argila_branca", "argila_branca-2.jpg"), img("argila_branca", "argila_branca-3.jpg")],
  },
  {
    id: 3, nome: "Sabonete de Argila Verde", codigo: "SAB03", preco: PRECO_SABONETE,
    desc: "Ação detox que absorve a oleosidade, reduz cravos e purifica a pele.",
    fotos: [img("argila_verde", "argila_verde-1.jpg"), img("argila_verde", "argila_verde-2.jpg"), img("argila_verde", "argila_verde-3.jpg")],
  },
  {
    id: 4, nome: "Sabonete de Barbatimão", codigo: "SAB04", preco: PRECO_SABONETE,
    desc: "Adstringente e cicatrizante natural: ajuda a firmar e a regenerar a pele.",
    fotos: [img("babatimao", "babatimao-1.jpg"), img("babatimao", "babatimao-2.jpg"), img("babatimao", "babatimao-3.jpg")],
  },
  {
    id: 5, nome: "Sabonete de Babosa", codigo: "SAB05", preco: PRECO_SABONETE,
    desc: "Aloe vera que acalma, hidrata e auxilia na regeneração da pele.",
    fotos: [img("babosa", "babosa-1.jpg"), img("babosa", "babosa-2.jpg"), img("babosa", "babosa-3.jpg")],
  },
  {
    id: 6, nome: "Sabonete de Camomila", codigo: "SAB06", preco: PRECO_SABONETE,
    desc: "Calmante e anti-irritação, suaviza peles sensíveis e avermelhadas.",
    fotos: [img("camomila", "camomila-1.jpg"), img("camomila", "camomila-2.jpg"), img("camomila", "camomila-3.jpg")],
  },
  {
    id: 7, nome: "Sabonete de Carvão Ativado", codigo: "SAB07", preco: PRECO_SABONETE,
    desc: "Detox profundo que desobstrui os poros e controla a oleosidade e a acne.",
    fotos: [img("carvao_ativado", "carvao_ativado-1.jpg"), img("carvao_ativado", "carvao_ativado-2.jpg"), img("carvao_ativado", "carvao_ativado-3.jpg")],
  },
  {
    id: 8, nome: "Sabonete de Dolomita", codigo: "SAB08", preco: PRECO_SABONETE,
    desc: "Esfoliação delicada que remove células mortas e renova a maciez da pele.",
    fotos: [img("dolomita", "dolomita-1.jpg"), img("dolomita", "dolomita-2.jpg"), img("dolomita", "dolomita-3.jpg")],
  },
  {
    id: 9, nome: "Sabonete de Erva-Doce", codigo: "SAB09", preco: PRECO_SABONETE,
    desc: "Suaviza e relaxa a pele, com aroma adocicado e aconchegante.",
    fotos: [img("erva_doce", "erva_doce-1.jpg"), img("erva_doce", "erva_doce-2.jpg"), img("erva_doce", "erva_doce-3.jpg")],
  },
  {
    id: 10, nome: "Sabonete de Alecrim & Sal Grosso", codigo: "SAB10", preco: PRECO_SABONETE,
    desc: "Alecrim e sal grosso que limpam, revigoram e renovam corpo e mente.",
    fotos: [img("limpeza_energetica", "limpeza_energetica-1.jpg"), img("limpeza_energetica", "limpeza_energetica-2.jpg"), img("limpeza_energetica", "limpeza_energetica-3.jpg")],
  },
  {
    id: 11, nome: "Sabonete de Manga", codigo: "SAB11", preco: PRECO_SABONETE,
    desc: "Vitaminas que hidratam e dão viço à pele, com aroma tropical refrescante.",
    fotos: [img("manga", "manga-1.jpg"), img("manga", "manga-2.jpg")],
  },
  {
    id: 13, nome: "Sabonete de Maracujá", codigo: "SAB13", preco: PRECO_SABONETE,
    desc: "Rico em vitamina C: revitaliza, tonifica e ajuda a controlar a oleosidade da pele.",
    fotos: [img("maracuja", "maracuja-1.jpg"), img("maracuja", "maracuja-2.jpg")],
  },
  {
    id: 12, nome: "Sabonete de Mel & Fubá", codigo: "SAB12", preco: PRECO_SABONETE,
    desc: "Esfoliante natural de mel e fubá: renova, nutre e deixa a pele macia.",
    fotos: [img("mel_fuba", "mel_fuba-1.jpg"), img("mel_fuba", "mel_fuba-2.jpg"), img("mel_fuba", "mel_fuba-3.jpg")],
  },
  {
    id: 14, nome: "Sabonete de Açafrão", codigo: "SAB14", preco: PRECO_SABONETE,
    desc: "Antioxidante e iluminador: uniformiza o tom e traz viço à pele.",
    fotos: [img("acafrao", "acafrao-1.jpg"), img("acafrao", "acafrao-2.jpg"), img("acafrao", "acafrao-3.jpg")],
  },
  {
    id: 15, nome: "Sabonete de Açafrão & Dolomita", codigo: "SAB15", preco: PRECO_SABONETE,
    desc: "Une o poder antioxidante do açafrão à esfoliação suave da dolomita.",
    fotos: [img("acafrao_dolomita", "acafrao_dolomita-1.jpg"), img("acafrao_dolomita", "acafrao_dolomita-2.jpg"), img("acafrao_dolomita", "acafrao_dolomita-3.jpg")],
  },
  {
    id: 16, nome: "Sabonete de Alecrim", codigo: "SAB16", preco: PRECO_SABONETE,
    desc: "Estimulante e tonificante, revigora e refresca a pele.",
    fotos: [img("alecrim", "alecrim-1.jpg"), img("alecrim", "alecrim-2.jpg"), img("alecrim", "alecrim-3.jpg")],
  },
  {
    id: 17, nome: "Sabonete de Aveia", codigo: "SAB17", preco: PRECO_SABONETE,
    desc: "Calmante e levemente esfoliante, ideal para peles sensíveis e ressecadas.",
    fotos: [img("aveia", "aveia-1.jpg"), img("aveia", "aveia-2.jpg"), img("aveia", "aveia-3.jpg")],
  },
  {
    id: 18, nome: "Sabonete de Calêndula", codigo: "SAB18", preco: PRECO_SABONETE,
    desc: "Anti-inflamatório natural que acalma e ajuda a regenerar peles irritadas.",
    fotos: [img("calendula", "calendula-1.jpg"), img("calendula", "calendula-2.jpg"), img("calendula", "calendula-3.jpg")],
  },
  {
    id: 19, nome: "Sabonete de Argila Rosa & Branca", codigo: "SAB19", preco: PRECO_SABONETE,
    desc: "Dupla argila que limpa suavemente e revitaliza peles sensíveis.",
    fotos: [img("argila_rosa_branca", "argila_rosa_branca-1.jpg"), img("argila_rosa_branca", "argila_rosa_branca-2.jpg"), img("argila_rosa_branca", "argila_rosa_branca-3.jpg")],
  },
  {
    id: 20, nome: "Sabonete Floral", codigo: "SAB20", preco: PRECO_SABONETE,
    desc: "Blend floral delicado que perfuma e suaviza a pele.",
    fotos: [img("florais", "floral-1.jpg"), img("florais", "floral-2.jpg")],
  },
  {
    id: 21, nome: "Sabonete de Rosa Branca", codigo: "SAB21", preco: PRECO_SABONETE,
    desc: "Suave e hidratante, com aroma floral delicado de rosas brancas.",
    fotos: [img("florais", "rosa_branca-1.jpg")],
  },
  {
    id: 22, nome: "Sabonete de Rosa Vermelha", codigo: "SAB22", preco: PRECO_SABONETE,
    desc: "Tonificante e perfumado, com o aroma marcante das rosas vermelhas.",
    fotos: [img("florais", "rosa_vermelha-1.jpg")],
  },
  {
    id: 23, nome: "Sabonete Giovanna Baby", codigo: "SAB23", preco: PRECO_SABONETE,
    desc: "Espuma suave e perfumada, com o aroma delicado e aconchegante de Giovanna Baby.",
    fotos: [img("giovanna_baby", "giovanna_baby-1.jpg"), img("giovanna_baby", "giovanna_baby-2.jpg"), img("giovanna_baby", "giovanna_baby-3.jpg")],
  },
  {
    id: 24, nome: "Sabonete de Hibisco", codigo: "SAB24", preco: PRECO_SABONETE,
    desc: "Rico em antioxidantes, firma e renova a pele com ação natural anti-idade.",
    fotos: [img("hibisco", "hibisco-1.jpg"), img("hibisco", "hibisco-2.jpg"), img("hibisco", "hibisco-3.jpg")],
  },
  {
    id: 25, nome: "Sabonete Infantil", codigo: "SAB25", preco: "R$ 8,00",
    desc: "Fórmula suave e delicada, ideal para a pele sensível das crianças.",
    fotos: [img("infantil", "infantil-1.jpg"), img("infantil", "infantil-2.jpg"), img("infantil", "infantil-3.jpg"), img("infantil", "infantil-4.jpg"), img("infantil", "infantil-5.jpg")],
  },
  {
    id: 26, nome: "Sabonete de Lavanda", codigo: "SAB26", preco: PRECO_SABONETE,
    desc: "Relaxante e calmante, suaviza a pele e acalma os sentidos.",
    fotos: [img("lavanda", "lavanda-1.jpg"), img("lavanda", "lavanda-2.jpg"), img("lavanda", "lavanda-3.jpg")],
  },
  {
    id: 27, nome: "Sabonete de Maçã Verde", codigo: "SAB27", preco: PRECO_SABONETE,
    desc: "Refrescante e antioxidante, tonifica a pele com aroma frutado de maçã verde.",
    fotos: [img("maca_verde", "maca_verde-1.jpg"), img("maca_verde", "maca_verde-2.jpg"), img("maca_verde", "maca_verde-3.jpg")],
  },
  {
    id: 28, nome: "Sabonete de Melancia", codigo: "SAB28", preco: PRECO_SABONETE,
    desc: "Hidratante e refrescante, com vitaminas que dão viço à pele.",
    fotos: [img("melancia", "melancia-1.jpg"), img("melancia", "melancia-2.jpg"), img("melancia", "melancia-3.jpg")],
  },
  {
    id: 29, nome: "Sabonete Oceano", codigo: "SAB29", preco: PRECO_SABONETE,
    desc: "Refrescante com aroma marcante do mar, revigora corpo e mente.",
    fotos: [img("oceano", "oceano-1.jpg"), img("oceano", "oceano-2.jpg"), img("oceano", "oceano-3.jpg")],
  },
  {
    id: 30, nome: "Sabonete Whisky de Violeta", codigo: "SAB30", preco: PRECO_SABONETE,
    desc: "Aroma sofisticado e marcante, com a elegância envolvente da violeta.",
    fotos: [img("whisky_violeta", "whisky_violeta-1.jpg"), img("whisky_violeta", "whisky_violeta-2.jpg"), img("whisky_violeta", "whisky_violeta-3.jpg")],
  },
];

// ─── Body Splash Agrupado (por produto) ────────────────────────────────────────
// Cada grupo tem "tamanhos" (define preço/SKU e o seletor) e "fotos" (o que o
// carrossel percorre). Cada foto é marcada com o tamanho que representa, então o
// botão de tamanho acende conforme a foto exibida — e vice-versa. As fotos "combo"
// mostram os dois frascos juntos e são marcadas como 110ml.
export interface BodySplashTamanho {
  tamanho: string;   // chave: "110ml" | "30ml"
  label: string;     // rótulo exibido no seletor
  preco: string;
  codigo: string;
}

export interface BodySplashFoto {
  imagem: string;
  tamanho: string;   // referencia BodySplashTamanho.tamanho
}

export interface BodySplashGrupo {
  id: number;
  nome: string;
  beneficio?: string;
  desc: string;
  tamanhos: BodySplashTamanho[];
  fotos: BodySplashFoto[];
}

const PRECO_GRANDE = "R$ 60,00";
const PRECO_30 = "R$ 30,00";

const TAMANHOS_PADRAO = (codGrande: string, codMini: string): BodySplashTamanho[] => [
  { tamanho: "110ml", label: "110ml", preco: PRECO_GRANDE, codigo: codGrande },
  { tamanho: "30ml", label: "30ml", preco: PRECO_30, codigo: codMini },
];

export const bodySplashGrupos: BodySplashGrupo[] = [
  {
    id: 1,
    nome: "Body Splash A Vida é Bela",
    desc: "Floral alegre e envolvente, perfume marcante para o dia a dia.",
    tamanhos: TAMANHOS_PADRAO("BS01", "BS02"),
    fotos: [
      { imagem: "/assets/body_splash/a-vida-e-bela/a-vida-e-bela-110ml.jpg", tamanho: "110ml" },
      { imagem: "/assets/body_splash/a-vida-e-bela/a-vida-e-bela-combo.jpg", tamanho: "110ml" },
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
      { imagem: "/assets/body_splash/flor-de-jade/flor-de-jade-110ml.jpg", tamanho: "110ml" },
      { imagem: "/assets/body_splash/flor-de-jade/flor-de-jade-30ml.jpg", tamanho: "30ml" },
      { imagem: "/assets/body_splash/flor-de-jade/flor-de-jade-30ml-v2.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/flor-de-jade/flor-de-jade-30ml-v3.jpg", tamanho: "30ml" },
    ],
  },
  {
    id: 4,
    nome: "Body Splash Flor de Seda",
    desc: "Suave e aveludado, fragrância elegante e duradoura.",
    tamanhos: TAMANHOS_PADRAO("BS07", "BS08"),
    fotos: [
      { imagem: "/assets/body_splash/flor-de-seda/flor-de-seda-110ml.jpg", tamanho: "110ml" },
      { imagem: "/assets/body_splash/flor-de-seda/flor-de-seda-combo.jpg", tamanho: "110ml" },
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
      { imagem: "/assets/body_splash/folha-seca/folha-seca-110ml.jpg", tamanho: "110ml" },
      { imagem: "/assets/body_splash/folha-seca/folha-seca-combo.jpg", tamanho: "110ml" },
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
      { imagem: "/assets/body_splash/jardim-secreto/jardim-secreto-110ml.jpg", tamanho: "110ml" },
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
      { imagem: "/assets/body_splash/jasmin/jasmin-110ml.jpg", tamanho: "110ml" },
      { imagem: "/assets/body_splash/jasmin/jasmin-combo.jpg", tamanho: "110ml" },
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
      { imagem: "/assets/body_splash/orquideas/orquideas-110ml.jpg", tamanho: "110ml" },
      { imagem: "/assets/body_splash/orquideas/orquideas-combo.jpg", tamanho: "110ml" },
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
      { imagem: "/assets/body_splash/pitanga-preta/pitanga-preta-110ml.jpg", tamanho: "110ml" },
      { imagem: "/assets/body_splash/pitanga-preta/pitanga-preta-combo.jpg", tamanho: "110ml" },
      { imagem: "/assets/body_splash/pitanga-preta/pitanga-preta-30ml.png", tamanho: "30ml" },
      { imagem: "/assets/body_splash/pitanga-preta/pitanga-preta-30ml-v2.jpg", tamanho: "30ml" },
    ],
  },
];

// ─── Sais de Banho (mesmo modelo do Body Splash: seletor de tamanho + preço) ────
const TAMANHOS_SAL = (codGrande: string, codPequeno: string): BodySplashTamanho[] => [
  { tamanho: "300g", label: "300g", preco: "R$ 50,00", codigo: codGrande },
  { tamanho: "100g", label: "100g", preco: "R$ 25,00", codigo: codPequeno },
];

const salFotos = (pasta: string) => [
  { imagem: `/assets/sais/${pasta}/${pasta}-grande.jpg`, tamanho: "300g" },
  { imagem: `/assets/sais/${pasta}/${pasta}-pequeno.jpg`, tamanho: "100g" },
];

export const saisGrupos: BodySplashGrupo[] = [
  {
    id: 1,
    nome: "Sal de Banho Pitanga Preta",
    desc: "Relaxa e perfuma o banho com a fragrância marcante e envolvente da pitanga preta.",
    tamanhos: TAMANHOS_SAL("SAL01", "SAL02"),
    fotos: salFotos("pitanga_preta"),
  },
  {
    id: 2,
    nome: "Sal de Banho Chá Verde",
    desc: "Antioxidante e revigorante, o chá verde relaxa e purifica no banho.",
    tamanhos: TAMANHOS_SAL("SAL03", "SAL04"),
    fotos: salFotos("cha_verde"),
  },
  {
    id: 3,
    nome: "Sal de Banho Lavanda",
    desc: "Sais relaxantes de lavanda que acalmam o corpo e a mente.",
    tamanhos: TAMANHOS_SAL("SAL05", "SAL06"),
    fotos: salFotos("lavanda"),
  },
  {
    id: 4,
    nome: "Sal de Banho Oceano",
    desc: "Fragrância marinha refrescante que revigora e renova as energias.",
    tamanhos: TAMANHOS_SAL("SAL07", "SAL08"),
    fotos: salFotos("oceano"),
  },
];
