# Reconstruindo o Ontem — Sistema de Registro e Apoio Cognitivo

## 👥 Integrantes do Grupo

* **Maria Augusta Campanha Lima**
* **Lucas Thiago da Silva Martins**
* **Gustavo Silva Fogaça**

## 📌 Sobre o Projeto e Tema Escolhido

O **Reconstruindo o Ontem** é uma aplicação web desenvolvida com foco em **apoio cognitivo, preservação de memórias e organização pessoal**. O sistema permite que o usuário registre momentos cotidianos, sensações e lembranças importantes de forma estruturada, funcionando como um diário de memórias com suporte a operações de banco de dados.

A interface combina uma experiência visual acessível com uma camada de persistência inspirada em bancos de dados relacionais (SQL), permitindo cadastrar, buscar, editar e excluir registros (`CRUD`), além de manter um histórico visual dos comandos SQL equivalentes a cada ação realizada.

### ✨ Principais Funcionalidades
* **Carga Inicial Automática (`DEFAULT_RECORDS`):** O sistema já inicia com registros de exemplo pré-carregados na primeira execução para facilitar a visualização e os testes.
* **Gerenciamento Completo (CRUD):** Criação, leitura, atualização e exclusão de lembranças com título, descrição detalhada, data e hora de registro.
* **Busca Dinâmica:** Filtro em tempo real para localizar memórias por palavras-chave.
* **Persistência de Dados:** Armazenamento local automático no navegador via `localStorage` (com controle de chave primária incremental `Quant`) e estrutura compatível com exportação/modelagem em **MySQL**.
* **Histórico de Operações SQL:** Exibição das queries equivalentes (`INSERT`, `UPDATE`, `DELETE`, `SELECT`) executadas durante o uso da aplicação.

---

## 🛠️ Tecnologias Utilizadas
* **Front-end:** HTML5, CSS3 e JavaScript (Vanilla ES6+)
* **Armazenamento:** Web Storage API (`localStorage`) e modelagem relacional em **MySQL**
* **Ferramentas de Apoio:** Git, MySQL Workbench / Terminal MySQL

---

## 📂 Estrutura de Arquivos do Projeto

```text
reconstruindo-o-ontem/
├── index.html       # Estrutura principal da página e modais da interface
├── style.css        # Estilização, layout responsivo e identidade visual
├── script.js        # Lógica da aplicação, CRUD, localStorage e registros padrão
├── database.sql     # Script SQL para criação do banco e tabela no MySQL (se aplicável)
└── README.md        # Documentação do projeto
```

---

## 🚀 Como Instalar e Executar

Siga os passos abaixo no seu terminal (macOS, Linux ou Windows) para baixar e rodar o projeto localmente.

### 1. Pré-requisitos
* Um navegador web atualizado (Google Chrome, Safari, Firefox ou Microsoft Edge).
* [Git](https://git-scm.com/) instalado para clonar o repositório.
* *(Opcional)* [Node.js](https://nodejs.org/) para subir um servidor HTTP local.
* *(Opcional)* [MySQL Server](https://dev.mysql.com/downloads/) ou **MySQL Workbench** caso deseje executar o script SQL diretamente no banco de dados.

---

### 2. Clonando o Repositório

Abra o **Terminal** e execute os comandos abaixo para baixar o projeto e entrar na pasta:

```bash
git clone https://github.com/seu-usuario/reconstruindo-o-ontem.git
cd reconstruindo-o-ontem
```

*(Caso tenha baixado o projeto em formato `.zip`, basta extrair o arquivo e abrir a pasta no terminal com `cd caminho/da/pasta`).*

---

### 3. Executando a Aplicação Web

Como o front-end utiliza JavaScript nativo e armazenamento local, você pode executá-lo de duas maneiras:

* **Opção A — Via Servidor Local (Recomendado):**
  Execute o comando abaixo na raiz do projeto para iniciar um servidor local rápido:
  ```bash
  npx serve .
  ```
  Após rodar o comando, abra o navegador e acesse o endereço indicado no terminal (geralmente `http://localhost:3000`).

* **Opção B — Abertura Direta pelo Navegador:**
  No macOS, você pode abrir diretamente pelo terminal com:
  ```bash
  open index.html
  ```
  *(Ou dê um duplo clique sobre o arquivo `index.html` dentro da pasta do projeto).*
