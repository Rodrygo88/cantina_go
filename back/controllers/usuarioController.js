import { Usuario } from '../models/Usuario.js'

// GET /usuarios - Listar todos os usuários
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.json({
      success: true,
      data: usuarios,
      count: usuarios.length
    })
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// GET /usuarios/:id - Buscar usuário por ID
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await Usuario.findById(id)

    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      })
    }

    res.json({
      success: true,
      data: usuario
    })
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// POST /usuarios - Criar novo usuário
export const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    // Validações
    if (!nome || !email || !senha) {
      return res.status(400).json({
        success: false,
        error: 'Nome, email e senha são obrigatórios'
      })
    }

    if (senha.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Senha deve ter no mínimo 6 caracteres'
      })
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido'
      })
    }

    const novoUsuario = await Usuario.create({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha
    })

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: novoUsuario
    })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    
    if (error.message.includes('Email já cadastrado')) {
      return res.status(400).json({
        success: false,
        error: 'Email já cadastrado'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// PUT /usuarios/:id - Atualizar usuário
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email, senha } = req.body

    if (!nome && !email && !senha) {
      return res.status(400).json({
        success: false,
        error: 'Forneça pelo menos um campo para atualizar'
      })
    }

    if (senha && senha.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Senha deve ter no mínimo 6 caracteres'
      })
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Email inválido'
        })
      }
    }

    const usuarioAtualizado = await Usuario.update(id, {
      nome: nome ? nome.trim() : undefined,
      email: email ? email.trim().toLowerCase() : undefined,
      senha
    })

    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: usuarioAtualizado
    })
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    
    if (error.message.includes('Usuário não encontrado')) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      })
    }

    if (error.message.includes('Email já cadastrado')) {
      return res.status(400).json({
        success: false,
        error: 'Email já cadastrado'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// DELETE /usuarios/:id - Deletar usuário
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params

    await Usuario.delete(id)

    res.json({
      success: true,
      message: 'Usuário deletado com sucesso'
    })
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    
    if (error.message.includes('Usuário não encontrado')) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// POST /usuarios/login - Login do usuário
export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios'
      })
    }

    const usuario = await Usuario.verifyCredentials(email, senha)

    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: 'Email ou senha inválidos'
      })
    }

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: usuario
    })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}