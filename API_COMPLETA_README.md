# 📚 DOCUMENTAÇÃO COMPLETA - API CANTINA GO

## 🗂️ ESTRUTURA IMPLEMENTADA

### Models (Banco de Dados)
- `models/Cantina.js` - Modelo de Cantina
- `models/Usuario.js` - Modelo de Usuário  
- `models/Produto.js` - Modelo de Produto

### Controllers (Lógica de Negócio)
- `controllers/cantinaController.js` - Lógica de Cantinas
- `controllers/usuarioController.js` - Lógica de Usuários
- `controllers/produtoController.js` - Lógica de Produtos

### Routes (Rotas da API)
- `routes/cantinas.js` - Endpoints de Cantinas
- `routes/usuarios.js` - Endpoints de Usuários
- `routes/produtos.js` - Endpoints de Produtos

---

## 🔌 ENDPOINTS DA API

### 🏪 CANTINAS

#### Listar todas as cantinas
```http
GET /cantinas
```

#### Buscar cantina por ID
```http
GET /cantinas/:id
```

#### Criar nova cantina
```http
POST /cantinas
Content-Type: application/json

{
  "nome": "Cantina Central",
  "email": "cantina@email.com",
  "senha": "123456"
}
```

#### Login da cantina
```http
POST /cantinas/login
Content-Type: application/json

{
  "email": "cantina@email.com",
  "senha": "123456"
}
```

#### Atualizar cantina
```http
PUT /cantinas/:id
Content-Type: application/json

{
  "nome": "Novo Nome",
  "email": "novo@email.com",
  "senha": "nova_senha"
}
```

#### Deletar cantina
```http
DELETE /cantinas/:id
```

---

### 👥 USUÁRIOS

#### Listar todos os usuários
```http
GET /usuarios
```

#### Buscar usuário por ID
```http
GET /usuarios/:id
```

#### Criar novo usuário
```http
POST /usuarios
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

#### Login de usuário
```http
POST /usuarios/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "123456"
}
```

#### Atualizar usuário
```http
PUT /usuarios/:id
Content-Type: application/json

{
  "nome": "João Atualizado",
  "email": "joao_novo@email.com",
  "senha": "nova_senha"
}
```

#### Deletar usuário
```http
DELETE /usuarios/:id
```

---

### 🍕 PRODUTOS

#### Listar todos os produtos
```http
GET /produtos
```

#### Buscar produto por ID
```http
GET /produtos/:id
```

#### Buscar produtos por nome
```http
GET /produtos/search/:nome
```

#### Criar novo produto
```http
POST /produtos
Content-Type: application/json

{
  "nome": "Coxinha de Frango",
  "descricao": "Massa de batata crocante com recheio de frango",
  "preco": 6.50
}
```

#### Atualizar produto
```http
PUT /produtos/:id
Content-Type: application/json

{
  "nome": "Coxinha Premium",
  "descricao": "Coxinha de frango com catupiry",
  "preco": 8.00
}
```

#### Deletar produto
```http
DELETE /produtos/:id
```

---

## 💻 EXEMPLOS EM JAVASCRIPT

### Listar Cantinas
```javascript
fetch('http://localhost:3000/cantinas')
  .then(res => res.json())
  .then(data => console.log(data))
```

### Criar Cantina
```javascript
fetch('http://localhost:3000/cantinas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'Cantina Central',
    email: 'cantina@email.com',
    senha: '123456'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

### Login Cantina
```javascript
fetch('http://localhost:3000/cantinas/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'cantina@email.com',
    senha: '123456'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

### Criar Usuário
```javascript
fetch('http://localhost:3000/usuarios', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'João Silva',
    email: 'joao@email.com',
    senha: '123456'
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

### Criar Produto
```javascript
fetch('http://localhost:3000/produtos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nome: 'Coxinha de Frango',
    descricao: 'Deliciosa coxinha',
    preco: 6.50
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

---

## 📊 RESPOSTAS DA API

### Sucesso (200)
```json
{
  "success": true,
  "data": {
    "id": "uuid-aqui",
    "nome": "Cantina Central",
    "email": "cantina@email.com"
  }
}
```

### Criado (201)
```json
{
  "success": true,
  "message": "Cantina criada com sucesso",
  "data": {
    "id": "uuid-novo",
    "nome": "Cantina Central",
    "email": "cantina@email.com"
  }
}
```

### Erro de Validação (400)
```json
{
  "success": false,
  "error": "Email já cadastrado"
}
```

### Não Autorizado (401)
```json
{
  "success": false,
  "error": "Email ou senha inválidos"
}
```

### Não Encontrado (404)
```json
{
  "success": false,
  "error": "Cantina não encontrada"
}
```

### Erro do Servidor (500)
```json
{
  "success": false,
  "error": "Erro interno do servidor"
}
```

---

## 🔐 SEGURANÇA

### Validações Implementadas
- Email válido (regex)
- Senha com mínimo 6 caracteres
- Campos obrigatórios
- Verificação de duplicatas
- Criptografia de senhas com bcrypt

### Dados Sensíveis
- Senhas nunca são retornadas nas respostas
- Apenas ID, nome e email são retornados

---

## 🧪 TESTANDO COM INSOMNIA/POSTMAN

1. **Criar Cantina**
   - Method: POST
   - URL: http://localhost:3000/cantinas
   - Body: JSON com nome, email e senha

2. **Listar Cantinas**
   - Method: GET
   - URL: http://localhost:3000/cantinas

3. **Login**
   - Method: POST
   - URL: http://localhost:3000/cantinas/login
   - Body: JSON com email e senha

4. **Criar Produto**
   - Method: POST
   - URL: http://localhost:3000/produtos
   - Body: JSON com nome, descricao e preco

---

## 📦 DEPENDÊNCIAS NECESSÁRIAS

```bash
npm install express cors dotenv jsonwebtoken bcrypt pg cookie-parser uuid
```

---

## 🗄️ TABELAS DO BANCO

### Tabela `usuarios`
- id (UUID)
- nome (VARCHAR)
- email (VARCHAR UNIQUE)
- senha (TEXT)
- criado_em (TIMESTAMP)
- atualizado_em (TIMESTAMP)

### Tabela `cantinas`
- id (UUID)
- nome (VARCHAR)
- email (VARCHAR UNIQUE)
- senha (TEXT)
- criado_em (TIMESTAMP)
- atualizado_em (TIMESTAMP)

### Tabela `produtos`
- id (UUID)
- nome (VARCHAR)
- descricao (TEXT)
- preco (DECIMAL)
- ativo (BOOLEAN)
- criado_em (TIMESTAMP)
- atualizado_em (TIMESTAMP)

---

## 🚀 PRÓXIMAS IMPLEMENTAÇÕES

- [ ] Autenticação JWT completa
- [ ] CRUD de Reservas
- [ ] Upload de imagens
- [ ] Relatórios e Dashboard
- [ ] Notificações em tempo real
- [ ] API de Pagamento