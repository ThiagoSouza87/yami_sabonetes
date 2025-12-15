import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Sparkles, Heart, Mail, Phone, MapPin, Instagram, Download, ShoppingCart } from 'lucide-react';

export default function Index() {
  const products = [
    {
      name: 'Sabonete de Lavanda',
      description: 'Anti-inflamatório e relaxante',
      price: 'R$ 15,00',
      image: '/assets/soap-lavanda.jpg',
      benefits: ['Relaxante', 'Anti-inflamatório', 'Calmante'],
    },
    {
      name: 'Sabonete de Carvão Ativado',
      description: 'Peles sensíveis e calmante',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0054.jpg',
      benefits: ['Hidratante', 'Esfoliante', 'Nutritivo'],
    },
    {
      name: 'Sabonete de Argila Verde',
      description: 'Calmante e firmador',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0055.jpg',
      benefits: ['Purificante', 'Detox', 'Firmador'],
    },
    {
      name: 'Sabonete de Calêndula',
      description: 'Anti-inflamatório e cicatrizante',
      price: 'R$ 15,00',
      image: '/assets/soap-calendula.jpg',
      benefits: ['Cicatrizante', 'Anti-inflamatório', 'Sensível'],
    },
    {
      name: 'Sabonete de Alecrim',
      description: 'Antioleosidade',
      price: 'R$ 15,00',
      image: '/assets/soap-alecrim.jpg',
      benefits: ['Estimulante', 'Antioleosidade', 'Aromático'],
    },
    {
      name: 'Sabonete de Rosa Mosqueta',
      description: 'Anti-idade e regenerador celular',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0058.jpg',
      benefits: ['Anti-idade', 'Regenerador', 'Hidratante'],
    },
    {
      name: 'Sabonete de Camomila',
      description: 'Cicatrizante, relaxante e calmante',
      price: 'R$ 15,00',
      image: '/assets/soap-camomila.jpg',
      benefits: ['Suave', 'Calmante', 'Cicatrizante'],
    },
    {
      name: 'Sabonete de Açafrão',
      description: 'Antifoliculite e cicatrizante',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0060.jpg',
      benefits: ['Iluminador', 'Cicatrizante', 'Natural'],
    },
    {
      name: 'Sabonete de Argila Verde',
      description: 'Antioleosidade e antiacne',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0061.jpg',
      benefits: ['Adstringente', 'Purificante', 'Antiacne'],
    },
    {
      name: 'Sabonete de Própolis',
      description: 'Antibacteriano e cicatrizante natural',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0062.jpg',
      benefits: ['Antibacteriano', 'Cicatrizante', 'Protetor'],
    },
    {
      name: 'Sabonete de Hortelã',
      description: 'Refrescante e revigorante',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0063.jpg',
      benefits: ['Refrescante', 'Revigorante', 'Aromático'],
    },
    {
      name: 'Sabonete de Café',
      description: 'Esfoliante e anti-celulite',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0064.jpg',
      benefits: ['Esfoliante', 'Energizante', 'Firmador'],
    },
    {
      name: 'Sabonete de Coco',
      description: 'Hidratação tropical para sua pele',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0065.jpg',
      benefits: ['Hidratante', 'Nutritivo', 'Suave'],
    },
    {
      name: 'Sabonete de Manjericão',
      description: 'Purificante e aromático',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0066.jpg',
      benefits: ['Purificante', 'Aromático', 'Refrescante'],
    },
    {
      name: 'Sabonete de Cenoura',
      description: 'Rico em vitamina A para pele radiante',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0067.jpg',
      benefits: ['Nutritivo', 'Iluminador', 'Antioxidante'],
    },
    {
      name: 'Sabonete de Eucalipto',
      description: 'Descongestionante e refrescante',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0068.jpg',
      benefits: ['Refrescante', 'Descongestionante', 'Aromático'],
    },
    {
      name: 'Sabonete de Aloe Vera (Babosa)',
      description: 'Cicatrizante e refrescante',
      price: 'R$ 15,00',
      image: '/assets/soap-babosa.jpg',
      benefits: ['Hidratante', 'Regenerador', 'Calmante'],
    },
    {
      name: 'Sabonete de Limão',
      description: 'Hidratante',
      price: 'R$ 15,00',
      image: '/assets/soap-limao.jpg',
      benefits: ['Clareador', 'Adstringente', 'Refrescante'],
    },
    {
      name: 'Sabonete de Canela',
      description: 'Estimulante e aromático',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0074.jpg',
      benefits: ['Estimulante', 'Aromático', 'Aquecedor'],
    },
    {
      name: 'Sabonete de Açúcar Mascavo',
      description: 'Esfoliação suave e hidratação',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0075.jpg',
      benefits: ['Esfoliante', 'Hidratante', 'Suave'],
    },
    {
      name: 'Sabonete de Chá Verde',
      description: 'Antioxidante e rejuvenescedor',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0076.jpg',
      benefits: ['Antioxidante', 'Rejuvenescedor', 'Protetor'],
    },
    {
      name: 'Sabonete de Argila Branca',
      description: 'Cicatrizante, suavizante e clareador',
      price: 'R$ 15,00',
      image: '/assets/IMG-20251121-WA0053.jpg',
      benefits: ['Cicatrizante', 'Suavizante', 'Clareador'],
    },
    {
      name: 'Sabonete de Amêndoas',
      description: 'Hidratante e para dias frios',
      price: 'R$ 15,00',
      image: '/assets/soap-almonds.jpg',
      benefits: ['Hidratante', 'Nutritivo', 'Protetor'],
    },
    {
      name: 'Sabonete de Dolomita',
      description: 'Pele de porcelana',
      price: 'R$ 15,00',
      image: '/assets/soap-dolomita.jpg',
      benefits: ['Clareador', 'Suavizante', 'Uniformizador'],
    },
    {
      name: 'Sabonete de Melaleuca',
      description: 'Antisséptico, antifúngico e antibacteriano',
      price: 'R$ 15,00',
      image: '/assets/soap-melaleuca.jpg',
      benefits: ['Antisséptico', 'Antifúngico', 'Antibacteriano'],
    },
    {
      name: 'Sabonete de Limpeza Energética',
      description: 'Antioleosidade e energizante',
      price: 'R$ 15,00',
      image: '/assets/soap-limpeza-energetica.jpg',
      benefits: ['Energizante', 'Purificante', 'Espiritual'],
    },
    {
      name: 'Sabonete de Erva Doce',
      description: 'Calmante e nutritivo',
      price: 'R$ 15,00',
      image: '/assets/soap-erva-doce.jpg',
      benefits: ['Calmante', 'Nutritivo', 'Aromático'],
    },
    {
      name: 'Sabonete de Maracujá',
      description: 'Hidratante',
      price: 'R$ 15,00',
      image: '/assets/soap-maracuja.jpg',
      benefits: ['Hidratante', 'Calmante', 'Aromático'],
    },
    {
      name: 'Sabonete de Melancia',
      description: 'Hidratante',
      price: 'R$ 15,00',
      image: '/assets/soap-melancia.jpg',
      benefits: ['Hidratante', 'Refrescante', 'Revitalizante'],
    },
    {
      name: 'Sabonete de Uva',
      description: 'Hidratante',
      price: 'R$ 15,00',
      image: '/assets/soap-uva.jpg',
      benefits: ['Hidratante', 'Antioxidante', 'Nutritivo'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Azul claro #c4dcf0 */}
      <header className="bg-[#c4dcf0] shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/yami-logo-main.jpg" 
                alt="Yami Sabonetes" 
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h1 className="text-3xl font-bold text-[#c26072]" style={{ fontFamily: 'Floane, serif' }}>
                  Yami Sabonetes
                </h1>
                <p className="text-sm text-gray-700" style={{ fontFamily: 'Aileron, sans-serif' }}>
                  Artesanais e Naturais
                </p>
              </div>
            </div>
            <nav className="hidden md:flex gap-8">
              <a 
                href="#produtos" 
                className="text-gray-800 hover:text-[#c26072] transition-colors font-medium text-lg"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Produtos
              </a>
              <a 
                href="#quem-somos" 
                className="text-gray-800 hover:text-[#c26072] transition-colors font-medium text-lg"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Quem Somos
              </a>
              <a 
                href="#pedidos" 
                className="text-gray-800 hover:text-[#c26072] transition-colors font-medium text-lg"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Contato
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Rosa #c26072 */}
      <section className="relative bg-[#c26072] py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Floane, serif' }}>
                Sabonetes Artesanais
              </h2>
              <p className="text-2xl mb-8 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
                Cuidado natural para sua pele com ingredientes selecionados da natureza
              </p>
              <Button
                size="lg"
                className="bg-white text-[#c26072] hover:bg-gray-100 text-xl px-10 py-7 font-bold"
                style={{ fontFamily: 'Aileron, sans-serif' }}
                onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Conheça Nossos Produtos
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <img 
                  src="/assets/yami-logo-main_variant_1.jpg" 
                  alt="Yami Sabonetes" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-[#c26072]" style={{ fontFamily: 'Floane, serif' }}>
              Por Que Escolher Yami?
            </h2>
            <p className="text-2xl text-gray-700" style={{ fontFamily: 'Aileron, sans-serif' }}>
              Qualidade artesanal em cada detalhe
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="border-2 border-[#c4dcf0] hover:shadow-2xl transition-all bg-white">
              <CardContent className="pt-10 text-center">
                <div className="w-20 h-20 bg-[#c4dcf0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-10 h-10 text-[#c26072]" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Floane, serif' }}>
                  100% Natural
                </h3>
                <p className="text-lg text-gray-700" style={{ fontFamily: 'Aileron, sans-serif' }}>
                  Ingredientes orgânicos e sustentáveis selecionados com cuidado
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#c4dcf0] hover:shadow-2xl transition-all bg-white">
              <CardContent className="pt-10 text-center">
                <div className="w-20 h-20 bg-[#c4dcf0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-[#c26072]" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Floane, serif' }}>
                  Feito à Mão
                </h3>
                <p className="text-lg text-gray-700" style={{ fontFamily: 'Aileron, sans-serif' }}>
                  Cada sabonete é único e produzido artesanalmente
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#c4dcf0] hover:shadow-2xl transition-all bg-white">
              <CardContent className="pt-10 text-center">
                <div className="w-20 h-20 bg-[#c4dcf0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-[#c26072]" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Floane, serif' }}>
                  Livre de Químicos
                </h3>
                <p className="text-lg text-gray-700" style={{ fontFamily: 'Aileron, sans-serif' }}>
                  Sem parabenos, sulfatos ou conservantes artificiais
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-[#c26072]" style={{ fontFamily: 'Floane, serif' }}>
              Nossos Produtos
            </h2>
            <p className="text-2xl text-gray-700" style={{ fontFamily: 'Aileron, sans-serif' }}>
              Descubra nossa coleção completa com {products.length} variedades
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-[#c4dcf0] bg-white group"
              >
                <div className="aspect-square overflow-hidden bg-[#f8f9fa]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-gray-900" style={{ fontFamily: 'Floane, serif' }}>
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-base" style={{ fontFamily: 'Aileron, sans-serif' }}>
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.benefits.map((benefit, idx) => (
                      <Badge 
                        key={idx} 
                        className="bg-[#c4dcf0] text-[#c26072] border-[#c4dcf0] text-sm"
                        style={{ fontFamily: 'Aileron, sans-serif' }}
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#c26072]" style={{ fontFamily: 'Aileron, sans-serif' }}>
                      {product.price}
                    </span>
                    <Button 
                      size="sm"
                      className="bg-[#c26072] hover:bg-[#a84d5e] text-white text-base px-6"
                      style={{ fontFamily: 'Aileron, sans-serif' }}
                      onClick={() => window.open('https://wa.me/5519991743043', '_blank')}
                    >
                      Comprar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Quem Somos */}
      <section id="quem-somos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-[#c26072]" style={{ fontFamily: 'Floane, serif' }}>
                Quem Somos
              </h2>
              <div className="w-32 h-1 bg-[#c26072] mx-auto mb-10"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
                  A Yami Sabonetes nasceu da paixão por produtos naturais e do desejo de oferecer alternativas
                  saudáveis para o cuidado diário com a pele.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
                  Cada sabonete é cuidadosamente produzido à mão, utilizando apenas ingredientes
                  naturais, óleos essenciais e extratos botânicos de alta qualidade.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
                  Acreditamos que o cuidado com a pele deve ser uma experiência prazerosa,
                  sustentável e livre de químicos agressivos.
                </p>
              </div>
              <div className="bg-[#c4dcf0] rounded-3xl p-10">
                <h3 className="text-3xl font-bold mb-8 text-[#c26072]" style={{ fontFamily: 'Floane, serif' }}>
                  Nossos Valores
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Leaf className="w-8 h-8 text-[#c26072] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-800" style={{ fontFamily: 'Aileron, sans-serif' }}>
                      Sustentabilidade e respeito ao meio ambiente
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-[#c26072] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-800" style={{ fontFamily: 'Aileron, sans-serif' }}>
                      Produtos livres de crueldade animal
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Sparkles className="w-8 h-8 text-[#c26072] flex-shrink-0 mt-1" />
                    <span className="text-lg text-gray-800" style={{ fontFamily: 'Aileron, sans-serif' }}>
                      Qualidade artesanal em cada detalhe
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-[#c4dcf0] bg-white shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12 bg-[#c26072] text-white flex flex-col justify-center">
                  <Download className="w-16 h-16 mb-6" />
                  <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Floane, serif' }}>
                    Catálogo Completo
                  </h2>
                  <p className="text-xl mb-8 leading-relaxed" style={{ fontFamily: 'Aileron, sans-serif' }}>
                    Baixe nosso catálogo em PDF com todos os produtos, descrições detalhadas e informações sobre cada sabonete.
                  </p>
                  <ul className="space-y-4 mb-8" style={{ fontFamily: 'Aileron, sans-serif' }}>
                    <li className="flex items-center gap-3 text-lg">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>29 variedades de sabonetes</span>
                    </li>
                    <li className="flex items-center gap-3 text-lg">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>4 coleções exclusivas</span>
                    </li>
                    <li className="flex items-center gap-3 text-lg">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span>Informações detalhadas</span>
                    </li>
                  </ul>
                  <Button
                    size="lg"
                    className="bg-white text-[#c26072] hover:bg-gray-100 text-xl w-full py-7 font-bold"
                    style={{ fontFamily: 'Aileron, sans-serif' }}
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/assets/catalago yami.pdf';
                      link.download = 'Catalogo-Yami-Sabonetes.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-6 h-6 mr-2" />
                    Baixar Catálogo PDF
                  </Button>
                </div>
                <div className="relative bg-[#c4dcf0] p-12 flex items-center justify-center">
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                      <img 
                        src="/assets/yami-logo-main_variant_2.png" 
                        alt="Catálogo" 
                        className="w-full h-auto rounded-lg mb-4"
                      />
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Floane, serif' }}>
                          Catálogo Yami
                        </h3>
                        <p className="text-gray-600 mb-4" style={{ fontFamily: 'Aileron, sans-serif' }}>
                          Sabonetes Artesanais
                        </p>
                        <Badge className="bg-[#c26072] text-white text-base" style={{ fontFamily: 'Aileron, sans-serif' }}>
                          PDF • 2025
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section - Faça Seus Pedidos */}
      <section id="pedidos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6 text-[#c26072]" style={{ fontFamily: 'Floane, serif' }}>
              Faça Seus Pedidos
            </h2>
            <p className="text-2xl text-gray-700 mb-16" style={{ fontFamily: 'Aileron, sans-serif' }}>
              Entre em contato conosco
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="border-2 border-[#c4dcf0] hover:border-[#c26072] transition-all hover:shadow-2xl bg-white">
                <CardContent className="pt-10 text-center">
                  <div className="w-20 h-20 bg-[#c4dcf0] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Instagram className="w-10 h-10 text-[#c26072]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900" style={{ fontFamily: 'Floane, serif' }}>
                    Instagram
                  </h3>
                  <a 
                    href="https://www.instagram.com/yami_sabonetesartesanais/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#c26072] hover:text-[#a84d5e] transition-colors text-base block"
                    style={{ fontFamily: 'Aileron, sans-serif' }}
                  >
                    @yami_sabonetes<br/>artesanais
                  </a>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#c4dcf0] hover:border-[#c26072] transition-all hover:shadow-2xl bg-white">
                <CardContent className="pt-10 text-center">
                  <div className="w-20 h-20 bg-[#c4dcf0] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10 text-[#c26072]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900" style={{ fontFamily: 'Floane, serif' }}>
                    Email
                  </h3>
                  <p className="text-gray-600 text-base break-words" style={{ fontFamily: 'Aileron, sans-serif' }}>
                    yamisabonetes<br/>@gmail.com
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#c4dcf0] hover:border-[#c26072] transition-all hover:shadow-2xl bg-white">
                <CardContent className="pt-10 text-center">
                  <div className="w-20 h-20 bg-[#c4dcf0] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-10 h-10 text-[#c26072]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900" style={{ fontFamily: 'Floane, serif' }}>
                    WhatsApp
                  </h3>
                  <a 
                    href="https://wa.me/5519991743043" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#c26072] transition-colors text-base"
                    style={{ fontFamily: 'Aileron, sans-serif' }}
                  >
                    (19) 99174-3043
                  </a>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#c4dcf0] hover:border-[#c26072] transition-all hover:shadow-2xl bg-white">
                <CardContent className="pt-10 text-center">
                  <div className="w-20 h-20 bg-[#c4dcf0] rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-10 h-10 text-[#c26072]" />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900" style={{ fontFamily: 'Floane, serif' }}>
                    Localização
                  </h3>
                  <p className="text-gray-600 text-base" style={{ fontFamily: 'Aileron, sans-serif' }}>
                    Moinhos Povos<br/>Unidos, SP
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#c26072] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="/assets/yami-logo-main_variant_3.png" 
                  alt="Yami Sabonetes" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                />
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Floane, serif' }}>
                  Yami Sabonetes
                </h3>
              </div>
              <p className="text-white/95 leading-relaxed text-lg" style={{ fontFamily: 'Aileron, sans-serif' }}>
                Cuidado natural para sua pele, feito com amor e ingredientes selecionados da natureza.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Floane, serif' }}>
                Links Rápidos
              </h3>
              <ul className="space-y-3 text-white/95 text-lg" style={{ fontFamily: 'Aileron, sans-serif' }}>
                <li><a href="#produtos" className="hover:text-white transition-colors">Produtos</a></li>
                <li><a href="#quem-somos" className="hover:text-white transition-colors">Quem Somos</a></li>
                <li><a href="#pedidos" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Floane, serif' }}>
                Redes Sociais
              </h3>
              <p className="text-white/95 mb-6 text-lg" style={{ fontFamily: 'Aileron, sans-serif' }}>
                Siga-nos para novidades!
              </p>
              <a
                href="https://www.instagram.com/yami_sabonetesartesanais/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-all text-lg"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                <Instagram className="w-6 h-6" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/95 text-lg" style={{ fontFamily: 'Aileron, sans-serif' }}>
            <p>&copy; 2024 Yami Sabonetes. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}