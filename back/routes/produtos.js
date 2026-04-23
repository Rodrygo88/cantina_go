import express from 'express'
import { verifyToken, verifyAdmin } from '../middleware/auth.js'
import {
  getProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
  searchProdutos
} from '../controllers/produtoController.js'

const router = express.Router()

// GET /produtos - Listar todos os produtos (público)
router.get('/', getProdutos)

// GET /produtos/search/:nome - Buscar produtos por nome (público)
router.get('/search/:nome', searchProdutos)

// GET /produtos/:id - Buscar produto por ID (público)
router.get('/:id', getProdutoById)

// POST /produtos - Criar produto (apenas admin)
router.post('/', verifyAdmin, createProduto)

// PUT /produtos/:id - Atualizar produto (apenas admin)
router.put('/:id', verifyAdmin, updateProduto)

// DELETE /produtos/:id - Deletar produto (apenas admin)
router.delete('/:id', verifyAdmin, deleteProduto)

export default router
