import requests
from bs4 import BeautifulSoup
import markdownify

def extract_content_from_url(url):
    """
    Extrai o conteúdo principal de uma URL e o converte para Markdown.
    """
    try:
        response = requests.get(url)
        response.raise_for_status() # Levanta exceção para códigos de status HTTP ruins (4xx ou 5xx)
    except requests.exceptions.RequestException as e:
        return f"Erro ao acessar a URL {url}: {e}"

    soup = BeautifulSoup(response.content, 'html.parser')

    # Tenta encontrar o conteúdo principal. 
    # Em sites modernos, o conteúdo principal costuma estar em tags como <main>, 
    # ou em divs com classes que indicam o layout principal.
    # Vou tentar encontrar a tag <main> ou a div com a classe 'container' que envolve o conteúdo.
    main_content = soup.find('main')
    if not main_content:
        # Se não encontrar <main>, tenta encontrar o container principal
        main_content = soup.find('div', class_='container')
    if not main_content:
        # Último recurso: usa o corpo inteiro, mas pode incluir navegação e rodapé
        main_content = soup.find('body')

    if not main_content:
        return "Não foi possível identificar o conteúdo principal da página."

    # Converte o conteúdo HTML para Markdown
    markdown_output = markdownify.markdownify(str(main_content), heading_style="ATX")

    return markdown_output

def generate_documentation_markdown(base_url, pages):
    """
    Gera o conteúdo Markdown para o arquivo institucional.md, 
    extraindo o conteúdo de cada página.
    """
    doc_content = f"## Site Institucional ({base_url})\n"
    doc_content += "Documentação gerada automaticamente a partir do conteúdo público do site.\n\n"
    doc_content += "### Status\n"
    doc_content += f"- **URL Base:** {base_url}\n"
    doc_content += "- **Status:** Ativo e funcional\n\n"
    doc_content += "### Conteúdo das Páginas\n"

    for page_name, path in pages.items():
        url = f"{base_url}{path}"
        print(f"Extraindo conteúdo de: {url}")
        content = extract_content_from_url(url)
        
        doc_content += f"#### {page_name} ({path})\n"
        doc_content += f"```markdown\n{content[:1000]}...\n```\n\n" # Limita a 1000 caracteres para o resumo

    return doc_content

if __name__ == "__main__":
    # URL base do site principal
    BASE_URL = "https://www.administradoramutual.com.br"
    
    # Páginas a serem documentadas
    PAGES_TO_DOCUMENT = {
        "Home": "/",
        "Legislação": "/legislacao",
        "Seguradoras": "/seguradoras",
        "Mutualismo": "/mutualismo",
    }

    # Gera o conteúdo da documentação
    final_markdown = generate_documentation_markdown(BASE_URL, PAGES_TO_DOCUMENT)

    # Salva o resultado em um arquivo temporário para simulação
    with open("temp_institucional_doc.md", "w", encoding="utf-8") as f:
        f.write(final_markdown)

    print("\nDocumentação gerada com sucesso em temp_institucional_doc.md")
    print("Conteúdo principal:")
    print(final_markdown)
