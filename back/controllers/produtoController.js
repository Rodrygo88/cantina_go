import { Produto } from '../models/Produto.js'

// GET /produtos - Listar todos os produtos
export const getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll()
    res.json({
      success: true,
      data: produtos,
      count: produtos.length
    })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// GET /produtos/:id - Buscar produto por ID
export const getProdutoById = async (req, res) => {
  try {
    const { id } = req.params
    const produto = await Produto.findById(id)

    if (!produto) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      })
    }

    res.json({
      success: true,
      data: produto
    })
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// POST /produtos - Criar novo produto
export const createProduto = async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body

    // Validações
    if (!nome || !preco) {
      return res.status(400).json({
        success: false,
        error: 'Nome e preço são obrigatórios'
      })
    }

    if (preco <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Preço deve ser maior que zero'
      })
    }

    const produtoData = {
      nome: nome.trim(),
      descricao: descricao ? descricao.trim() : '',
      preco: parseFloat(preco)
    }

    const novoProduto = await Produto.create(produtoData)

    res.status(201).json({
      success: true,
      message: 'Produto criado com sucesso',
      data: novoProduto
    })
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// PUT /produtos/:id - Atualizar produto
export const updateProduto = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, descricao, preco } = req.body

    // Verificar se produto existe
    const produtoExistente = await Produto.findById(id)
    if (!produtoExistente) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      })
    }

    // Validações
    if (!nome || !preco) {
      return res.status(400).json({
        success: false,
        error: 'Nome e preço são obrigatórios'
      })
    }

    if (preco <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Preço deve ser maior que zero'
      })
    }

    const produtoData = {
      nome: nome.trim(),
      descricao: descricao ? descricao.trim() : '',
      preco: parseFloat(preco)
    }

    const produtoAtualizado = await Produto.update(id, produtoData)

    res.json({
      success: true,
      message: 'Produto atualizado com sucesso',
      data: produtoAtualizado
    })
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// DELETE /produtos/:id - Deletar produto
export const deleteProduto = async (req, res) => {
  try {
    const { id } = req.params

    // Verificar se produto existe
    const produtoExistente = await Produto.findById(id)
    if (!produtoExistente) {
      return res.status(404).json({
        success: false,
        error: 'Produto não encontrado'
      })
    }

    await Produto.delete(id)

    res.json({
      success: true,
      message: 'Produto deletado com sucesso'
    })
  } catch (error) {
    console.error('Erro ao deletar produto:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}

// GET /produtos/search/:nome - Buscar produtos por nome
export const searchProdutos = async (req, res) => {
  try {
    const { nome } = req.params

    if (!nome || nome.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Termo de busca deve ter pelo menos 2 caracteres'
      })
    }

    const produtos = await Produto.searchByName(nome.trim())

    res.json({
      success: true,
      data: produtos,
      count: produtos.length
    })
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    })
  }
}