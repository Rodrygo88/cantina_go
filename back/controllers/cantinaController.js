import { Cantina } from '../models/Cantina.js'

// GET /cantinas - Listar todas as cantinas
export const getCantinas = async (req, res) => {
  try {
    const cantinas = await Cantina.findAll()
    res.json({
      success: true,
      data: cantinas,
      count: cantinas.length
    })
  } catch (error) {
    console.error('Erro ao buscar cantinas:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// GET /cantinas/:id - Buscar cantina por ID
export const getCantinaById = async (req, res) => {
  try {
    const { id } = req.params
    const cantina = await Cantina.findById(id)

    if (!cantina) {
      return res.status(404).json({
        success: false,
        error: 'Cantina não encontrada'
      })
    }

    res.json({
      success: true,
      data: cantina
    })
  } catch (error) {
    console.error('Erro ao buscar cantina:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// POST /cantinas - Criar nova cantina
export const createCantina = async (req, res) => {
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

    const novaCantin = await Cantina.create({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha
    })

    res.status(201).json({
      success: true,
      message: 'Cantina criada com sucesso',
      data: novaCantin
    })
  } catch (error) {
    console.error('Erro ao criar cantina:', error)
    
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

// PUT /cantinas/:id - Atualizar cantina
export const updateCantina = async (req, res) => {
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

    const cantinaAtualizada = await Cantina.update(id, {
      nome: nome ? nome.trim() : undefined,
      email: email ? email.trim().toLowerCase() : undefined,
      senha
    })

    res.json({
      success: true,
      message: 'Cantina atualizada com sucesso',
      data: cantinaAtualizada
    })
  } catch (error) {
    console.error('Erro ao atualizar cantina:', error)
    
    if (error.message.includes('Cantina não encontrada')) {
      return res.status(404).json({
        success: false,
        error: 'Cantina não encontrada'
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

// DELETE /cantinas/:id - Deletar cantina
export const deleteCantina = async (req, res) => {
  try {
    const { id } = req.params

    await Cantina.delete(id)

    res.json({
      success: true,
      message: 'Cantina deletada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao deletar cantina:', error)
    
    if (error.message.includes('Cantina não encontrada')) {
      return res.status(404).json({
        success: false,
        error: 'Cantina não encontrada'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// POST /cantinas/login - Login da cantina
export const loginCantina = async (req, res) => {
  try {
    const { email, senha } = req.body

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        error: 'Email e senha são obrigatórios'
      })
    }

    const cantina = await Cantina.verifyCredentials(email, senha)

    if (!cantina) {
      return res.status(401).json({
        success: false,
        error: 'Email ou senha inválidos'
      })
    }

    // Aqui você pode gerar um token JWT
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: cantina
    })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}