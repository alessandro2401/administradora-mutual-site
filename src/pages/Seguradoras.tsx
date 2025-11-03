import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2, Filter, X } from "lucide-react";

interface Seguradora {
  nome: string;
  cnpj: string;
  categoria: string;
}

interface SeguradorasData {
  total: number;
  categorias: {
    [categoria: string]: {
      total: number;
      empresas: Seguradora[];
    };
  };
}

export default function Seguradoras() {
  const [seguradoras, setSeguradoras] = useState<SeguradorasData>({ total: 0, categorias: {} });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Carregar dados das seguradoras
  useEffect(() => {
    fetch("/seguradoras.json")
      .then((res) => res.json())
      .then((data) => {
        // Transformar estrutura do JSON para formato esperado
        const transformed: SeguradorasData = {
          total: data.total,
          categorias: data.categorias
        };
        setSeguradoras(transformed);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar seguradoras:", error);
        setLoading(false);
      });
  }, []);

  // Obter todas as categorias
  const categorias = useMemo(() => {
    if (!seguradoras.categorias) return [];
    return Object.keys(seguradoras.categorias).sort();
  }, [seguradoras]);

  // Filtrar seguradoras
  const seguradorasFiltradas = useMemo(() => {
    if (!seguradoras.categorias) return {};
    
    let resultado: { [key: string]: Seguradora[] } = {};

    // Filtrar por categoria
    if (selectedCategory === "all") {
      Object.entries(seguradoras.categorias).forEach(([cat, data]) => {
        resultado[cat] = data.empresas;
      });
    } else {
      if (seguradoras.categorias[selectedCategory]) {
        resultado[selectedCategory] = seguradoras.categorias[selectedCategory].empresas;
      }
    }

    // Filtrar por termo de busca
    if (searchTerm.trim()) {
      const termo = searchTerm.toLowerCase();
      const filtrado: { [key: string]: Seguradora[] } = {};

      Object.entries(resultado).forEach(([categoria, lista]) => {
        const seguradorasFiltradas = lista.filter(
          (seg) =>
            seg.nome.toLowerCase().includes(termo) ||
            seg.cnpj.replace(/\D/g, "").includes(termo.replace(/\D/g, ""))
        );

        if (seguradorasFiltradas.length > 0) {
          filtrado[categoria] = seguradorasFiltradas;
        }
      });

      resultado = filtrado;
    }

    return resultado;
  }, [seguradoras, searchTerm, selectedCategory]);

  // Contar total de seguradoras
  const totalSeguradoras = useMemo(() => {
    return Object.values(seguradorasFiltradas).reduce(
      (total, lista) => total + lista.length,
      0
    );
  }, [seguradorasFiltradas]);

  const limparFiltros = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seguradoras...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0D47A1] to-[#00796B] text-white py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Diretório de Seguradoras
            </h1>
            <p className="text-xl text-blue-50 leading-relaxed">
              Diretório completo com 121 seguradoras autorizadas pela SUSEP, organizadas por
              categoria com busca avançada e informações atualizadas.
            </p>
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-20 z-40">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por nome ou CNPJ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

            {/* Filtro de Categoria */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="whitespace-nowrap"
              >
                <Filter className="h-4 w-4 mr-2" />
                Todas ({seguradoras.total || 0})
              </Button>
              {categorias.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className="whitespace-nowrap"
                >
                  {cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ({seguradoras.categorias[cat]?.total || 0})
                </Button>
              ))}
            </div>

            {/* Limpar Filtros */}
            {(searchTerm || selectedCategory !== "all") && (
              <Button variant="ghost" onClick={limparFiltros} className="whitespace-nowrap">
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            )}
          </div>

          {/* Contador de Resultados */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Exibindo <span className="font-semibold text-gray-900">{totalSeguradoras}</span>{" "}
              seguradora{totalSeguradoras !== 1 ? "s" : ""}
              {searchTerm && ` para "${searchTerm}"`}
              {selectedCategory !== "all" && ` na categoria "${selectedCategory}"`}
            </p>
          </div>
        </div>
      </section>

      {/* Lista de Seguradoras */}
      <section className="py-12">
        <div className="container">
          {totalSeguradoras === 0 ? (
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma seguradora encontrada
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os filtros ou termo de busca
              </p>
              <Button onClick={limparFiltros}>Limpar Filtros</Button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(seguradorasFiltradas).map(([categoria, lista]) => (
                <div key={categoria}>
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {categoria}
                    </h2>
                    <p className="text-gray-600">
                      {lista.length} seguradora{lista.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lista.map((seg, index) => (
                      <Card
                        key={`${seg.cnpj}-${index}`}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg leading-tight">
                                {seg.nome}
                              </CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm">
                            <span className="font-medium text-gray-700">CNPJ:</span>{" "}
                            {seg.cnpj}
                          </CardDescription>
                          <div className="mt-3">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              {categoria}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info SUSEP */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <Card className="border-2 border-primary/20 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                Sobre as Seguradoras Autorizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Todas as seguradoras listadas neste diretório são autorizadas e regulamentadas pela
                SUSEP (Superintendência de Seguros Privados). A autorização da SUSEP garante que
                essas empresas atendem aos requisitos de solvência, governança e transparência
                estabelecidos pela legislação brasileira, proporcionando segurança aos segurados.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

