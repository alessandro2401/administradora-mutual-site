import requests
from bs4 import BeautifulSoup
from markdownify import markdownify as md
import os
import subprocess

# --- Configurações ---
DOCS_REPO_URL = "https://github.com/alessandro2401/docs-administradora"
DOCS_REPO_DIR = "docs-administradora-temp"
DOCS_FILE_PATH = "docs/sites-publicos/institucional-auto.md"
SITE_URLS = {
    "Home": "https://administradoramutual.com.br/",
    "Legislação": "https://administradoramutual.com.br/legislacao",
    "Seguradoras": "https://administradoramutual.com.br/seguradoras",
    "Mutualismo": "https://administradoramutual.com.br/mutualismo",
}

def extract_content(url):
    """Extrai o conteúdo principal de uma URL e o converte para Markdown."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Tenta encontrar o conteúdo principal. Adapte o seletor se necessário.
        # Assumindo que o conteúdo principal está dentro de um <main> ou <div> com id/classe específica.
        main_content = soup.find('main') or soup.find('div', class_='container') or soup.body
        
        if main_content:
            # Remove elementos irrelevantes (scripts, estilos, navegação, rodapé)
            for tag in main_content.find_all(['script', 'style', 'nav', 'footer']):
                tag.decompose()
            
            # Converte o HTML limpo para Markdown
            markdown_content = md(str(main_content), heading_style="ATX")
            return markdown_content
        else:
            return f"## Conteúdo de {url} \n\n Não foi possível extrair o conteúdo principal."
            
    except requests.exceptions.RequestException as e:
        return f"## Erro ao acessar {url} \n\n Falha na requisição: {e}"

def generate_documentation():
    """Gera o conteúdo completo da documentação em Markdown."""
    full_doc = "# Documentação Automática do Site Institucional\n\n"
    full_doc += f"**Gerado automaticamente em:** {os.environ.get('VERCEL_GIT_COMMIT_TIMESTAMP', 'Data Desconhecida')}\n"
    full_doc += f"**Commit Vercel:** {os.environ.get('VERCEL_GIT_COMMIT_SHA', 'SHA Desconhecido')}\n\n"
    
    for title, url in SITE_URLS.items():
        full_doc += f"\n---\n\n# {title}\n\n"
        full_doc += extract_content(url)
        
    return full_doc

def commit_and_push(doc_content):
    """Clona o repositório de documentação, atualiza o arquivo e faz o push."""
    
    # 1. Configurar o Git
    os.environ['GIT_TERMINAL_PROMPT'] = '0'
    
    # 2. Clonar o repositório de documentação
    # Usando o token de acesso pessoal (PAT) do GitHub, que deve ser configurado no Vercel como variável de ambiente.
    # Variável de ambiente esperada: GITHUB_PAT
    github_pat = os.environ.get('GITHUB_PAT')
    if not github_pat:
        print("Erro: Variável de ambiente GITHUB_PAT não configurada.")
        return

    docs_repo_with_token = DOCS_REPO_URL.replace("https://", f"https://{github_pat}@")
    
    try:
        subprocess.run(f"git clone {docs_repo_with_token} {DOCS_REPO_DIR}", shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Erro ao clonar o repositório de documentação: {e}")
        return

    # 3. Escrever o novo conteúdo
    full_path = os.path.join(DOCS_REPO_DIR, DOCS_FILE_PATH)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(doc_content)

    # 4. Commit e Push
    try:
        subprocess.run(f"cd {DOCS_REPO_DIR} && git config user.name 'Manus AI Documentation Bot' && git config user.email 'manus-ai-bot@administradoramutual.com.br'", shell=True, check=True)
        subprocess.run(f"cd {DOCS_REPO_DIR} && git add {DOCS_FILE_PATH}", shell=True, check=True)
        subprocess.run(f"cd {DOCS_REPO_DIR} && git commit -m 'docs(auto): Atualização automática do conteúdo do Site Institucional'", shell=True, check=True)
        subprocess.run(f"cd {DOCS_REPO_DIR} && git push", shell=True, check=True)
        print("Documentação atualizada e enviada com sucesso!")
    except subprocess.CalledProcessError as e:
        print(f"Erro ao fazer commit/push no repositório de documentação: {e}")
    finally:
        # 5. Limpar
        subprocess.run(f"rm -rf {DOCS_REPO_DIR}", shell=True)

if __name__ == "__main__":
    doc_content = generate_documentation()
    commit_and_push(doc_content)
