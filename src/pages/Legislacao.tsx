import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ExternalLink, BookOpen, Scale } from "lucide-react";

export default function Legislacao() {
  const normativas = [
    {
      titulo: "Circular SUSEP nº 621/2021",
      descricao: "Dispõe sobre as regras e critérios para a constituição e funcionamento de sociedades seguradoras.",
      link: "https://www.in.gov.br/web/dou/-/circular-susep-n-621-de-22-de-marco-de-2021-310573328"
    },
    {
      titulo: "Resolução CNSP nº 382/2020",
      descricao: "Estabelece regras e procedimentos para a constituição e o funcionamento de sociedades seguradoras.",
      link: "https://www.in.gov.br/web/dou/-/resolucao-cnsp-n-382-de-4-de-marco-de-2020-246861979"
    },
    {
      titulo: "Lei Complementar nº 126/2007",
      descricao: "Dispõe sobre a política de resseguro, retrocessão e sua intermediação, operações de co-seguro.",
      link: "http://www.planalto.gov.br/ccivil_03/leis/lcp/lcp126.htm"
    },
    {
      titulo: "Decreto-Lei nº 73/1966",
      descricao: "Dispõe sobre o Sistema Nacional de Seguros Privados, regula as operações de seguros e resseguros.",
      link: "http://www.planalto.gov.br/ccivil_03/decreto-lei/del0073.htm"
    }
  ];

  const categorias = [
    {
      icon: Scale,
      titulo: "Regulamentação",
      descricao: "Normas e regulamentos da SUSEP que regem o funcionamento das sociedades seguradoras no Brasil."
    },
    {
      icon: BookOpen,
      titulo: "Conformidade",
      descricao: "Diretrizes para garantir a conformidade com as exigências regulatórias e melhores práticas do setor."
    },
    {
      icon: FileText,
      titulo: "Documentação",
      descricao: "Acesso a circulares, resoluções e legislação específica do mercado de seguros mútuos."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0D47A1] to-[#00796B] text-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Legislação e Normativas
            </h1>
            <p className="text-xl text-blue-50 leading-relaxed">
              Acesse as principais normativas da SUSEP e legislação aplicável ao mercado de
              seguros mútuos no Brasil, garantindo conformidade e transparência nas operações.
            </p>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categorias.map((cat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <cat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{cat.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{cat.descricao}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Normativas Principais */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Principais Normativas SUSEP
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Conheça as principais normas que regulam o funcionamento das sociedades seguradoras
              e a administração de seguros mútuos no Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {normativas.map((norm, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{norm.titulo}</CardTitle>
                      <CardDescription className="text-base">{norm.descricao}</CardDescription>
                    </div>
                    <FileText className="h-6 w-6 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={norm.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Acessar documento
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre SUSEP */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl">
                  Sobre a SUSEP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  A Superintendência de Seguros Privados (SUSEP) é o órgão responsável pelo controle
                  e fiscalização dos mercados de seguro, previdência privada aberta, capitalização e
                  resseguro no Brasil.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Autarquia vinculada ao Ministério da Economia, a SUSEP foi criada pelo Decreto-lei
                  nº 73, de 21 de novembro de 1966, que também instituiu o Sistema Nacional de Seguros
                  Privados, do qual fazem parte o Conselho Nacional de Seguros Privados (CNSP), a
                  SUSEP, as sociedades autorizadas a operar em seguros privados e capitalização, e os
                  corretores habilitados.
                </p>
                <div className="pt-4">
                  <a
                    href="https://www.gov.br/susep/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
                  >
                    Visitar site oficial da SUSEP
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

