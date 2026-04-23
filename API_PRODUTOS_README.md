# 🧪 TESTANDO O CRUD DE PRODUTOS

## 📋 ENDPOINTS DISPONÍVEIS

### 🔍 **CONSULTAR PRODUTOS**
```bash
# Listar todos os produtos
GET http://localhost:3000/produtos

# Buscar produto por ID
GET http://localhost:3000/produtos/{id}

# Buscar produtos por nome
GET http://localhost:3000/produtos/search/{nome}
```

### ➕ **CRIAR PRODUTO** (Apenas Admin)
```bash
POST http://localhost:3000/produtos
Authorization: Bearer {token_admin}
Content-Type: application/json

{
  "nome": "Coxinha de Frango",
  "descricao": "Massa de batata crocante com recheio de frango temperado",
  "preco": 6.50
}
```

### ✏️ **ATUALIZAR PRODUTO** (Apenas Admin)
```bash
PUT http://localhost:3000/produtos/{id}
Authorization: Bearer {token_admin}
Content-Type: application/json

{
  "nome": "Coxinha de Frango Especial",
  "descricao": "Massa de batata crocante com recheio de frango e catupiry",
  "preco": 8.00
}
```

### 🗑️ **DELETAR PRODUTO** (Apenas Admin)
```bash
DELETE http://localhost:3000/produtos/{id}
Authorization: Bearer {token_admin}
```

## 🧪 **EXEMPLOS PRÁTICOS**

### 1. **Listar Produtos**
```javascript
fetch('http://localhost:3000/produtos')
  .then(res => res.json())
  .then(data => console.log(data))
```

### 2. **Criar Produto** (com autenticação)
```javascript
const token = 'seu_token_jwt_aqui'

fetch('http://localhost:3000/produtos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    nome: 'Pastel de Carne',
    descricao: 'Pastel frito com recheio de carne moída',
    preco: 5.00
  })
})
.then(res => res.json())
.then(data => console.log(data))
```

### 3. **Buscar por Nome**
```javascript
fetch('http://localhost:3000/produtos/search/coxinha')
  .then(res => res.json())
  .then(data => console.log(data))
```

## 📊 **RESPOSTAS ESPERADAS**

### ✅ **Sucesso (GET /produtos)**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-aqui",
      "nome": "Coxinha de Frango",
      "descricao": "Massa de batata crocante...",
      "preco": 6.5,
      "ativo": true,
      "criado_em": "2026-04-23T...",
      "atualizado_em": "2026-04-23T..."
    }
  ],
  "count": 1
}
```

### ✅ **Sucesso (POST /produtos)**
```json
{
  "success": true,
  "message": "Produto criado com sucesso",
  "data": {
    "id": "uuid-novo",
    "nome": "Pastel de Carne",
    "descricao": "Pastel frito...",
    "preco": 5.0,
    "ativo": true,
    "criado_em": "2026-04-23T...",
    "atualizado_em": "2026-04-23T..."
  }
}
```

### ❌ **Erro (Produto não encontrado)**
```json
{
  "success": false,
  "error": "Produto não encontrado"
}
```

## 🔐 **AUTENTICAÇÃO**

Para operações de **admin** (criar, atualizar, deletar), você precisa:
1. Fazer login como vendedor/admin
2. Usar o token JWT no header `Authorization: Bearer {token}`

## 🗄️ **BANCO DE DADOS**

Certifique-se de que:
1. O banco PostgreSQL está rodando
2. As tabelas foram criadas (execute `database_schema.sql`)
3. O arquivo `.env` está configurado com as credenciais do banco