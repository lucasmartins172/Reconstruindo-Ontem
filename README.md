# Reconstruindo o Ontem — Sistema de Registro e Apoio Cognitivo

## 👥 Integrantes do Grupo

* **Maria Augusta Campanha Lima**
* **Lucas Thiago da Silva Martins**
* **Gustavo Silva Fogaça**

---

## 📌 Sobre o Projeto e Tema Escolhido

O **Reconstruindo o Ontem** é uma aplicação web desenvolvida com foco em **apoio cognitivo, preservação de memórias e organização pessoal**. O sistema permite que o usuário registre momentos cotidianos, sensações e lembranças importantes de forma estruturada, funcionando como um diário de memórias conectado a um banco de dados relacional.

A interface combina uma experiência visual acessível e acolhedora com rotas back-end em **Express** e persistência real em **MySQL**, permitindo cadastrar, pesquisar, alterar e excluir registros (`CRUD`) diretamente no banco de dados.

### ✨ Principais Funcionalidades
* **Carga Inicial no Banco (`script.sql`):** Script completo para criação do banco `ReconstruindoOntem`, da tabela `SuaLembranca` e inserção automática de 3 registros de exemplo.
* **Gerenciamento Completo (CRUD):** Criação (`INSERT`), leitura (`SELECT`), atualização (`UPDATE`) e exclusão (`DELETE`) de lembranças com nome, descrição detalhada, data e hora de registro.
* **Busca Dinâmica:** Filtro por número da lembrança (`#id`), nome ou palavras-chave na descrição.
* **Exibição Dupla:** Visualização das memórias tanto em mural de cards interativos quanto em tabela HTML estruturada.

---

## 🛠️ Tecnologias Utilizadas
* **Back-end:** Node.js e Express (`express-generator --view=ejs`)
* **Front-end:** EJS, HTML5, CSS3 e JavaScript
* **Banco de Dados:** MySQL (`mysql2`)
* **Configuração e Ambiente:** `dotenv` (`.env` / `.env.example`) e Git/GitHub

---

## 📂 Estrutura de Arquivos do Projeto

```text
Reconstruindo-Ontem/
├── bin/
│   └── www                    # Inicialização do servidor HTTP
├── config/
│   └── db.js                  # Configuração do pool de conexão com o MySQL
├── public/
│   ├── javascripts/
│   │   └── script.js          # Interatividade do formulário, contadores e modais
│   └── stylesheets/
│       └── style.css          # Estilização, layout responsivo e identidade visual
├── routes/
│   ├── index.js               # Rotas Express (GET /, GET /itens, POST /itens, editar e excluir)
│   └── users.js               # Rota auxiliar padrão do Express
├── views/
│   ├── index.ejs              # Página principal com formulário, mural e tabela de registros
│   └── error.ejs              # Página de tratamento de erros
├── .env.example               # Modelo das variáveis de ambiente (sem senha)
├── .gitignore                 # Bloqueia node_modules e .env no versionamento
├── app.js                     # Configuração principal da aplicação Express
├── package.json               # Dependências e script de inicialização (npm start)
├── script.sql                 # Script SQL (CREATE DATABASE, CREATE TABLE e INSERTs)
└── README.md                  # Documentação do projeto
```

---

## 🚀 Como Instalar e Executar

Siga os passos abaixo para configurar o banco de dados e rodar a aplicação localmente.

### 1. Pré-requisitos
* [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).
* [MySQL Server](https://dev.mysql.com/downloads/) e **MySQL Workbench** (ou terminal MySQL) instalados e em execução.
* [Git](https://git-scm.com/) instalado para clonar o repositório.

---

### 2. Clonando o Repositório

Abra o terminal (Git Bash, PowerShell ou Terminal) e execute:

```bash
git clone https://github.com/Gustavrumm/Reconstruindo-Ontem.git
cd Reconstruindo-Ontem
```

---

### 3. Instalando as Dependências

Na raiz da pasta `Reconstruindo-Ontem`, instale os pacotes do projeto:

```bash
npm install
```

---

### 4. Configurando o Banco de Dados MySQL

1. Abra o **MySQL Workbench** e conecte-se ao seu servidor local (`localhost`).
2. Abra o arquivo **`script.sql`** localizado na raiz do projeto e execute todo o script para criar o banco `ReconstruindoOntem`, a tabela `SuaLembranca` e inserir os 3 registros iniciais.

---

### 5. Configurando as Variáveis de Ambiente (`.env`)

1. Na raiz do projeto, faça uma cópia do arquivo `.env.example` e renomeie para **`.env`**.
2. Abra o arquivo `.env` e preencha com os dados de acesso do seu MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_do_mysql
DB_NAME=ReconstruindoOntem
```

---

### 6. Executando a Aplicação

Inicie o servidor Express com o comando:

```bash
npm start
```

Abra o navegador e acesse:

```text
http://localhost:3000
```