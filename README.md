# Sistema de Inventário AgilStore

Uma aplicação de interface de linha de comando (CLI) para gerenciamento de inventário, desenvolvida como parte do processo seletivo da **Aceleradora Ágil da PUCRS**.

## 🚀 Funcionalidades

- **Gerenciamento de Produtos:** Adicionar, Listar, Atualizar e Excluir produtos.
- **Persistência de Dados:** Salvamento automático em arquivo JSON (`produtos.json`), garantindo que os dados não sejam perdidos.
- **Busca Inteligente:** Pesquisa rápida por **ID** ou **Nome** (case-insensitive).
- **Filtros e Ordenação:** Opções para filtrar por categoria e ordenar por nome, preço ou quantidade.
- **Interface Interativa:** Menu navegável via setas desenvolvido com `Inquirer.js`.

## 🛠️ Tecnologias Utilizadas

- **Node.js** (Runtime)
- **JavaScript (ES6+)** (Lógica)
- **Inquirer.js** (Interface de Terminal)
- **FS (File System)** (Módulo nativo para persistência de dados)

## 📦 Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
    git clone https://github.com/leonardof108/gerenciamento-de-produtos.git
    cd gerenciamento-de-produtos
   ```
2. **Instale as dependências:**
   ```bash
    npm install
   ```
3. Inicie a aplicação:
   ```bash
    node index.js
   ```

## 🧪 Como Rodar os Testes

O projeto inclui testes unitários para validar a lógica de negócios. Devido ao uso de ES Modules, utilize o seguinte comando:

**Linux / Mac / Git Bash:**
```bash
NODE_OPTIONS=--experimental-vm-modules npx jest
```

**Windows (PowerShell):**
```powershell
$env:NODE_OPTIONS="--experimental-vm-modules"; npx jest
```

## 📂 Estrutura do Projeto

- index.js: Ponto de entrada. Gerencia o Menu Principal e a interação com o usuário.

- service.js: Camada de lógica de negócio. Gerencia as operações de CRUD e leitura/escrita de arquivos.

- produtos.json: Banco de dados local onde o inventário é armazenado.

## 📝 Decisões de Design

- Separação de Responsabilidades: A lógica de interface (index.js) foi separada da lógica de dados (service.js) para manter o código limpo e organizado.

- Validação de Dados: Implementação de verificações para garantir que preços e quantidades sejam números válidos e campos obrigatórios não fiquem vazios.

- Experiência do Usuário (UX): Utilização da biblioteca Inquirer.js para oferecer uma navegação fluida e intuitiva, superior ao uso básico do readline.

---

Desenvolvido por Leonardo
