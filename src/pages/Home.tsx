import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Building2, Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0D47A1] to-[#00796B] text-white py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Gestão Especializada em Seguros Mútuos
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-50 leading-relaxed">
              Soluções completas e personalizadas para seguradoras autorizadas pela SUSEP,
              com expertise em administração de seguros mútuos e conformidade regulatória.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/seguradoras">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Ver Seguradoras
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/mutualismo">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white/30">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas para administração de seguros mútuos com foco em
              excelência operacional e conformidade regulatória.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Gestão de Seguros</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Administração completa de apólices e processos de seguros mútuos com eficiência e transparência.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Conformidade SUSEP</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Garantia de conformidade com todas as normativas e regulamentações da SUSEP.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Diretório Completo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Acesso ao diretório atualizado de 121 seguradoras autorizadas pela SUSEP.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Consultoria Especializada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Suporte técnico e consultoria especializada em seguros mútuos e gestão de riscos.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Expertise em Seguros Mútuos
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A Administradora Mutual é especializada na gestão de seguros mútuos, oferecendo
                soluções completas e personalizadas para seguradoras autorizadas pela SUSEP. Nossa
                expertise abrange desde a administração de apólices até a garantia de conformidade
                com todas as normativas regulatórias.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Com um profundo conhecimento do mercado de seguros brasileiro e das especificidades
                do mutualismo, proporcionamos gestão eficiente, transparente e alinhada às melhores
                práticas do setor.
              </p>
              <Link href="/mutualismo">
                <Button size="lg" className="text-lg">
                  Conheça o Mutualismo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">121 Seguradoras</h3>
                    <p className="text-gray-600">
                      Diretório completo de seguradoras autorizadas pela SUSEP em 8 categorias.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Conformidade Total</h3>
                    <p className="text-gray-600">
                      Atuação em conformidade com todas as normativas e circulares da SUSEP.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Gestão Especializada</h3>
                    <p className="text-gray-600">
                      Equipe experiente em administração de seguros mútuos e gestão de riscos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0D47A1] to-[#00796B] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para conhecer nosso diretório?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Acesse nosso diretório completo de seguradoras autorizadas pela SUSEP com busca
            avançada e filtros por categoria.
          </p>
          <Link href="/seguradoras">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Acessar Diretório
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

