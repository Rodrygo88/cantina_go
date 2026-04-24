import pool from '../config/database.js'
import bcrypt from 'bcrypt'

export class Usuario {
  // Buscar todos os usuários
  static async findAll() {
    try {
      const query = 'SELECT id, nome, email, criado_em FROM usuarios ORDER BY nome'
      const result = await pool.query(query)
      return result.rows
    } catch (error) {
      throw new Error('Erro ao buscar usuários: ' + error.message)
    }
  }

  // Buscar usuário por ID
  static async findById(id) {
    try {
      const query = 'SELECT id, nome, email, criado_em FROM usuarios WHERE id = $1'
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message)
    }
  }

  // Buscar usuário por email
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM usuarios WHERE email = $1'
      const result = await pool.query(query, [email])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao buscar usuário: ' + error.message)
    }
  }

  // Criar novo usuário
  static async create(usuarioData) {
    try {
      const { nome, email, senha } = usuarioData
      
      // Verificar se email já existe
      const usuarioExistente = await this.findByEmail(email)
      if (usuarioExistente) {
        throw new Error('Email já cadastrado')
      }

      // Hash da senha
      const senhaHash = await bcrypt.hash(senha, 10)

      const query = `
        INSERT INTO usuarios (id, nome, email, senha)
        VALUES (gen_random_uuid(), $1, $2, $3)
        RETURNING id, nome, email, criado_em
      `
      const result = await pool.query(query, [nome, email, senhaHash])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message)
    }
  }

  // Atualizar usuário
  static async update(id, usuarioData) {
    try {
      const { nome, email, senha } = usuarioData

      // Verificar se usuário existe
      const usuarioExistente = await this.findById(id)
      if (!usuarioExistente) {
        throw new Error('Usuário não encontrado')
      }

      // Se email está sendo alterado, verificar se já existe
      if (email && email !== usuarioExistente.email) {
        const usuarioComEmail = await this.findByEmail(email)
        if (usuarioComEmail) {
          throw new Error('Email já cadastrado')
        }
      }

      // Preparar campos a atualizar
      let updateFields = []
      let values = []
      let paramCount = 1

      if (nome) {
        updateFields.push(`nome = $${paramCount}`)
        values.push(nome)
        paramCount++
      }

      if (email) {
        updateFields.push(`email = $${paramCount}`)
        values.push(email)
        paramCount++
      }

      if (senha) {
        const senhaHash = await bcrypt.hash(senha, 10)
        updateFields.push(`senha = $${paramCount}`)
        values.push(senhaHash)
        paramCount++
      }

      if (updateFields.length === 0) {
        throw new Error('Nenhum campo para atualizar')
      }

      updateFields.push('atualizado_em = CURRENT_TIMESTAMP')
      values.push(id)

      const query = `
        UPDATE usuarios
        SET ${updateFields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING id, nome, email, atualizado_em
      `

      const result = await pool.query(query, values)
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message)
    }
  }

  // Deletar usuário
  static async delete(id) {
    try {
      const usuarioExistente = await this.findById(id)
      if (!usuarioExistente) {
        throw new Error('Usuário não encontrado')
      }

      const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING id'
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message)
    }
  }

  // Verificar credenciais (login)
  static async verifyCredentials(email, senha) {
    try {
      const usuario = await this.findByEmail(email)
      if (!usuario) {
        return null
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha)
      if (!senhaValida) {
        return null
      }

      return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    } catch (error) {
      throw new Error('Erro ao verificar credenciais: ' + error.message)
    }
  }
}