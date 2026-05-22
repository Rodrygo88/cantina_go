# Cantina GO

Sistema fullstack para gerenciamento de pedidos e reservas em cantinas escolares, desenvolvido como projeto final do curso Fullstack do SenacRN.

O Cantina GO foi pensado para aproximar alunos e cantinas em uma experiencia simples: o aluno acessa o cardapio, faz sua reserva/pedido e acompanha seus pedidos; a cantina gerencia produtos, reservas, historico e disponibilidade em tempo real.

## Sobre o projeto

Este repositorio contem uma aplicacao completa dividida em:

- `front/`: interface web em React + Vite.
- `back/`: API REST em Node.js + Express.
- PostgreSQL como banco de dados.
- Autenticacao com JWT.
- Notificacoes em tempo real com SSE.
- Documentacao da API com Swagger.

O foco do projeto foi aplicar, em um produto funcional, os principais conhecimentos do curso Fullstack do SenacRN: frontend, backend, banco de dados, autenticacao, organizacao de codigo, testes e deploy.

## Funcionalidades

### Para alunos

- Cadastro, login e verificacao de e-mail.
- Login opcional com Google OAuth.
- Visualizacao do cardapio das cantinas.
- Criacao de reservas com um ou mais itens.
- Acompanhamento de pedidos.
- Edicao de perfil.
- Recuperacao e redefinicao de senha.

### Para cantinas

- Cadastro protegido por chave administrativa.
- Login da cantina.
- Cadastro, edicao, arquivamento e remocao de produtos.
- Controle de disponibilidade e limite de quantidade.
- Gerenciamento de reservas recebidas.
- Atualizacao de status dos pedidos.
- Historico de pedidos concluidos.
- Configuracao de horario da cantina.

### Recursos tecnicos

- API REST com Express.
- Autenticacao e autorizacao via JWT.
- Hash de senhas com bcrypt.
- Rate limit em rotas sensiveis.
- Helmet e CORS configurados.
- Migrations automaticas no startup do backend.
- Envio de e-mails via Brevo, com fallback para log em console.
- Server-Sent Events para notificacoes em tempo real.
- Testes com Vitest no backend e no frontend.
- Deploy preparado para Render e Vercel.

## Tecnologias

### Frontend

- React
- Vite
- React Router DOM
- Context API
- CSS Modules
- Vitest
- ESLint

### Backend

- Node.js
- Express
- PostgreSQL
- JWT
- bcrypt
- Helmet
- CORS
- express-rate-limit
- Swagger UI
- Vitest

## Estrutura do projeto

```text
cantina_senac_projeto/
|-- back/
|   |-- config/          # Configuracoes da API e Swagger
|   |-- controllers/     # Controllers das rotas
|   |-- exceptions/      # Erros customizados
|   |-- middleware/      # Auth, logs, rate limit, validacao e erros
|   |-- repositories/    # Acesso ao banco de dados
|   |-- routes/          # Rotas da API
|   |-- services/        # Regras de negocio
|   |-- sse/             # Gerenciamento de eventos em tempo real
|   |-- tests/           # Testes do backend
|   |-- valueObjects/    # Objetos de valor e validacoes de dominio
|   |-- app.js           # Entrada da API
|   |-- db.js            # Conexao com PostgreSQL
|   `-- migrations.js    # Criacao/atualizacao das tabelas
|-- front/
|   |-- public/          # Arquivos publicos
|   |-- src/
|   |   |-- components/  # Componentes reutilizaveis
|   |   |-- constants/   # Constantes da aplicacao
|   |   |-- context/     # Providers globais
|   |   |-- pages/       # Telas da aplicacao
|   |   |-- utils/       # Formatadores, validadores e audio
|   |   |-- api.js       # Cliente de API
|   |   `-- App.jsx      # Rotas do frontend
|   `-- vite.config.js
|-- render.yaml          # Configuracao de deploy no Render
`-- README.md
```

## Como rodar localmente

### Pre-requisitos

- Node.js 18 ou superior.
- npm.
- PostgreSQL instalado e em execucao.

### 1. Clone o repositorio

```bash
git clone https://github.com/Rodrygo88/cantina_senac_projeto.git
cd cantina_senac_projeto
```

### 2. Configure o backend

```bash
cd back
npm install
copy .env.example .env
```

No arquivo `back/.env`, ajuste as credenciais do PostgreSQL e defina valores seguros para:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=cantina

JWT_SECRET=troque_este_segredo
CANTINA_REGISTER_KEY=troque_esta_chave_admin
```

Crie o banco no PostgreSQL:

```sql
CREATE DATABASE cantina;
```

As tabelas sao criadas/atualizadas automaticamente quando a API inicia, por meio de `back/migrations.js`.

Inicie o backend:

```bash
npm run dev
```

Por padrao, a API fica disponivel em:

```text
http://localhost:3000
```

### 3. Configure o frontend

Em outro terminal:

```bash
cd front
npm install
copy .env.example .env
npm run dev
```

Por padrao, o frontend fica disponivel em:

```text
http://localhost:5173
```

Localmente, o Vite pode usar o proxy para `/api`. Em producao, configure `VITE_API_URL` apontando para a URL da API.

## Variaveis de ambiente

### Backend (`back/.env`)

| Variavel | Descricao |
| --- | --- |
| `NODE_ENV` | Ambiente da aplicacao, como `development` ou `production`. |
| `HOST` | Host usado pelo servidor Express. |
| `PORT` | Porta da API. |
| `CORS_ORIGIN` | Origem permitida para requisicoes do frontend. |
| `DB_HOST` | Host do PostgreSQL local. |
| `DB_PORT` | Porta do PostgreSQL local. |
| `DB_USER` | Usuario do banco. |
| `DB_PASSWORD` | Senha do banco. |
| `DB_NAME` | Nome do banco. |
| `DATABASE_URL` | URL completa do PostgreSQL, recomendada em producao. |
| `JWT_SECRET` | Segredo usado para assinar tokens JWT. |
| `JWT_EXPIRES_IN` | Tempo de expiracao do token. |
| `CANTINA_REGISTER_KEY` | Chave para liberar cadastro de cantinas. |
| `GOOGLE_CLIENT_ID` | Client ID do Google OAuth, opcional. |
| `HISTORICO_DIAS` | Quantidade de dias mantidos no historico. |
| `BREVO_USER` | Usuario SMTP da Brevo, opcional. |
| `BREVO_PASS` | Senha/chave SMTP da Brevo, opcional. |
| `BREVO_FROM` | Remetente dos e-mails. |
| `FRONTEND_URL` | URL do frontend usada em links de e-mail. |

### Frontend (`front/.env`)

| Variavel | Descricao |
| --- | --- |
| `VITE_GOOGLE_CLIENT_ID` | Client ID do Google OAuth, opcional. |
| `VITE_API_URL` | URL base da API em producao. |

## Scripts

### Backend

```bash
cd back
npm run dev       # inicia com watch
npm start         # inicia em modo normal
npm test          # executa testes
npm run test:watch
```

### Frontend

```bash
cd front
npm run dev       # inicia o Vite
npm run build     # gera build de producao
npm run preview   # visualiza o build
npm run lint      # executa ESLint
npm test          # executa testes
npm run test:watch
```

## Rotas principais da API

### Autenticacao

- `POST /api/auth/registro/usuario`
- `POST /api/auth/registro/cantina`
- `POST /api/auth/login/usuario`
- `POST /api/auth/login/cantina`
- `DELETE /api/auth/conta`
- `GET /api/auth/verificar-email`
- `POST /api/auth/reenviar-verificacao`
- `POST /api/auth/esqueci-senha`
- `POST /api/auth/resetar-senha`

### Produtos

- `GET /api/produtos`
- `GET /api/produtos/disponiveis`
- `GET /api/produtos/cantina/:cantina_id`
- `GET /api/produtos/:id`
- `POST /api/produtos`
- `PUT /api/produtos/:id`
- `DELETE /api/produtos/:id`

### Reservas

- `GET /api/reservas/cantina/:cantina_id`
- `GET /api/reservas/cantina/:cantina_id/historico`
- `GET /api/reservas/usuario/:usuario_id`
- `GET /api/reservas/:id`
- `POST /api/reservas`
- `PATCH /api/reservas/:id/status`
- `DELETE /api/reservas/:id`

### Cantinas e usuarios

- `GET /api/cantinas`
- `GET /api/cantinas/:id`
- `PUT /api/cantinas/:id`
- `PATCH /api/cantinas/:id/horario`
- `DELETE /api/cantinas/:id`
- `GET /api/usuarios/:id`
- `PUT /api/usuarios/:id`
- `DELETE /api/usuarios/:id`

### Tempo real

- `GET /api/sse`

## Documentacao da API

Com o backend rodando, a documentacao Swagger fica disponivel em:

```text
http://localhost:3000/api/docs
```

O acesso e protegido por Basic Auth:

- Usuario: `admin`
- Senha: valor configurado em `CANTINA_REGISTER_KEY`

## Testes

Execute os testes separadamente em cada aplicacao:

```bash
cd back
npm test
```

```bash
cd front
npm test
```

## Deploy

O projeto possui configuracao para deploy em:

- Render: backend Node.js e, opcionalmente, frontend estatico via `render.yaml`.
- Vercel: frontend React/Vite via `front/vercel.json`.

Em producao, configure as variaveis de ambiente no painel da plataforma. Para o backend hospedado, prefira usar `DATABASE_URL` em vez das variaveis separadas do banco.

## Licenca

Este projeto esta sob a licenca MIT. Consulte o arquivo `LICENSE` para mais detalhes.

## Autoria

Projeto desenvolvido como trabalho final do curso Fullstack do SenacRN.
