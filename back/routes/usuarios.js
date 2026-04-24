import express from 'express'
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario
} from '../controllers/usuarioController.js'

const router = express.Router()

// GET /usuarios - Listar todos
router.get('/', getUsuarios)

// GET /usuarios/:id - Buscar por ID
router.get('/:id', getUsuarioById)

// POST /usuarios - Criar novo usuário
router.post('/', createUsuario)

// POST /usuarios/login - Login
router.post('/login', loginUsuario)

// PUT /usuarios/:id - Atualizar
router.put('/:id', updateUsuario)

// DELETE /usuarios/:id - Deletar
router.delete('/:id', deleteUsuario)

export default router
