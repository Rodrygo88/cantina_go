import pool from '../config/database.js'

export class Produto {
  // Buscar todos os produtos
  static async findAll() {
    try {
      const query = 'SELECT * FROM produtos WHERE ativo = true ORDER BY nome'
      const result = await pool.query(query)
      return result.rows
    } catch (error) {
      throw new Error('Erro ao buscar produtos: ' + error.message)
    }
  }

  // Buscar produto por ID
  static async findById(id) {
    try {
      const query = 'SELECT * FROM produtos WHERE id = $1 AND ativo = true'
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao buscar produto: ' + error.message)
    }
  }

  // Criar novo produto
  static async create(produtoData) {
    try {
      const { nome, descricao, preco } = produtoData
      const query = `
        INSERT INTO produtos (nome, descricao, preco)
        VALUES ($1, $2, $3)
        RETURNING *
      `
      const result = await pool.query(query, [nome, descricao, preco])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao criar produto: ' + error.message)
    }
  }

  // Atualizar produto
  static async update(id, produtoData) {
    try {
      const { nome, descricao, preco } = produtoData
      const query = `
        UPDATE produtos
        SET nome = $1, descricao = $2, preco = $3, atualizado_em = CURRENT_TIMESTAMP
        WHERE id = $4 AND ativo = true
        RETURNING *
      `
      const result = await pool.query(query, [nome, descricao, preco, id])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao atualizar produto: ' + error.message)
    }
  }

  // Deletar produto (soft delete)
  static async delete(id) {
    try {
      const query = `
        UPDATE produtos
        SET ativo = false, atualizado_em = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
      `
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao deletar produto: ' + error.message)
    }
  }

  // Buscar produtos por nome (para busca)
  static async searchByName(nome) {
    try {
      const query = `
        SELECT * FROM produtos
        WHERE nome ILIKE $1 AND ativo = true
        ORDER BY nome
      `
      const result = await pool.query(query, [`%${nome}%`])
      return result.rows
    } catch (error) {
      throw new Error('Erro ao buscar produtos: ' + error.message)
    }
  }
}