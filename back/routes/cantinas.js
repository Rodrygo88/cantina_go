import express from 'express'
import {
  getCantinas,
  getCantinaById,
  createCantina,
  updateCantina,
  deleteCantina,
  loginCantina
} from '../controllers/cantinaController.js'

const router = express.Router()

// GET /cantinas - Listar todas
router.get('/', getCantinas)

// GET /cantinas/:id - Buscar por ID
router.get('/:id', getCantinaById)

// POST /cantinas - Criar nova cantina
router.post('/', createCantina)

// POST /cantinas/login - Login
router.post('/login', loginCantina)

// PUT /cantinas/:id - Atualizar
router.put('/:id', updateCantina)

// DELETE /cantinas/:id - Deletar
router.delete('/:id', deleteCantina)

export default router