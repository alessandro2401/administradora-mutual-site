import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Heart, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Mutualismo() {
  const principios = [
    {
      icon: Users,
      titulo: "Solidariedade",
      descricao: "Baseado na cooperação mútua entre os participantes, compartilhando riscos e benefícios de forma equitativa."
    },
    {
      icon: Shield,
      titulo: "Proteção Coletiva",
      descricao: "Foco na proteção do grupo, onde todos contribuem para a segurança financeira de cada membro."
    },
    {
      icon: Heart,
      titulo: "Sem Fins Lucrativos",
      descricao: "Orientado para o benefício dos associados, não para a maximização de lucros corporativos."
    },
    {
      icon: TrendingUp,
      titulo: "Gestão Participativa",
      descricao: "Os próprios segurados participam das decisões e da gestão da sociedade seguradora."
    }
  ];

  const beneficios = [
    "Custos operacionais reduzidos devido à ausência de intermediários",
    "Maior transparência nas operações e na gestão dos recursos",
    "Participação ativa dos segurados nas decisões estratégicas",
    "Distribuição equitativa de excedentes entre os associados",
    "Foco no bem-estar coletivo e não em lucros individuais",
    "Maior alinhamento de interesses entre gestores e segurados"
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0D47A1] to-[#00796B] text-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              O Que é Mutualismo?
            </h1>
            <p className="text-xl text-blue-50 leading-relaxed">
              Entenda o conceito de mutualismo no setor de seguros e como esse modelo promove
              solidariedade, transparência e proteção coletiva entre os participantes.
            </p>
          </div>
        </div>
      </section>

      {/* Conceito */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Conceito e Origem
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                O mutualismo é um modelo de organização no setor de seguros baseado nos princípios
                de solidariedade, cooperação e proteção coletiva. Diferentemente das seguradoras
                tradicionais com fins lucrativos, as sociedades mútuas são constituídas e geridas
                pelos próprios segurados, que compartilham riscos e benefícios de forma equitativa.
              </p>
              <p>
                Historicamente, o mutualismo surgiu como uma resposta às necessidades de proteção
                financeira de grupos específicos, como trabalhadores, profissionais liberais ou
                comunidades. Esses grupos se organizavam em sociedades mútuas para garantir apoio
                financeiro em caso de eventos adversos, como doenças, acidentes ou perdas materiais.
              </p>
              <p>
                No Brasil, o mutualismo é regulamentado pela SUSEP e segue as mesmas normas de
                solvência e governança aplicáveis às demais seguradoras, garantindo segurança e
                transparência nas operações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Princípios Fundamentais
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              O mutualismo se baseia em valores que promovem a cooperação, a transparência e o
              benefício coletivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principios.map((principio, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <principio.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{principio.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{principio.descricao}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Benefícios do Modelo Mútuo
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                O modelo de seguros mútuos oferece vantagens significativas tanto para os segurados
                quanto para o mercado como um todo, promovendo maior eficiência e alinhamento de
                interesses.
              </p>
              <ul className="space-y-4">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-gray-700">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Diferenças em Relação ao Modelo Tradicional
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Propriedade</h4>
                  <p className="text-gray-700">
                    Nas mútuas, os próprios segurados são os proprietários. Nas seguradoras
                    tradicionais, os acionistas são os donos.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Objetivo</h4>
                  <p className="text-gray-700">
                    Mútuas visam o benefício dos segurados. Seguradoras tradicionais buscam
                    maximizar lucros para acionistas.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Governança</h4>
                  <p className="text-gray-700">
                    Nas mútuas, os segurados participam das decisões. Nas tradicionais, os
                    acionistas controlam a gestão.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">Excedentes</h4>
                  <p className="text-gray-700">
                    Mútuas distribuem excedentes entre segurados. Tradicionais distribuem lucros
                    aos acionistas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulamentação */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">
                  Regulamentação no Brasil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  As sociedades seguradoras mútuas no Brasil são regulamentadas pela SUSEP
                  (Superintendência de Seguros Privados) e devem seguir as mesmas normas de
                  solvência, governança e transparência aplicáveis às demais seguradoras.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  A legislação brasileira estabelece requisitos específicos para a constituição e
                  funcionamento de mútuas, incluindo capital mínimo, reservas técnicas, auditoria
                  independente e prestação de contas aos segurados.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Essa regulamentação rigorosa garante a solidez financeira das sociedades mútuas
                  e a proteção dos direitos dos segurados, promovendo um ambiente de confiança e
                  segurança no mercado de seguros.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

