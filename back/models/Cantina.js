import pool from '../config/database.js'
import bcrypt from 'bcrypt'

export class Cantina {
  // Buscar todas as cantinas
  static async findAll() {
    try {
      const query = 'SELECT id, nome, email, criado_em FROM cantinas ORDER BY nome'
      const result = await pool.query(query)
      return result.rows
    } catch (error) {
      throw new Error('Erro ao buscar cantinas: ' + error.message)
    }
  }

  // Buscar cantina por ID
  static async findById(id) {
    try {
      const query = 'SELECT id, nome, email, criado_em FROM cantinas WHERE id = $1'
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao buscar cantina: ' + error.message)
    }
  }

  // Buscar cantina por email
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM cantinas WHERE email = $1'
      const result = await pool.query(query, [email])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao buscar cantina: ' + error.message)
    }
  }

  // Criar nova cantina
  static async create(cantinaData) {
    try {
      const { nome, email, senha } = cantinaData
      
      // Verificar se email já existe
      const cantinaExistente = await this.findByEmail(email)
      if (cantinaExistente) {
        throw new Error('Email já cadastrado')
      }

      // Hash da senha
      const senhaHash = await bcrypt.hash(senha, 10)

      const query = `
        INSERT INTO cantinas (id, nome, email, senha)
        VALUES (gen_random_uuid(), $1, $2, $3)
        RETURNING id, nome, email, criado_em
      `
      const result = await pool.query(query, [nome, email, senhaHash])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao criar cantina: ' + error.message)
    }
  }

  // Atualizar cantina
  static async update(id, cantinaData) {
    try {
      const { nome, email, senha } = cantinaData

      // Verificar se cantina existe
      const cantinaExistente = await this.findById(id)
      if (!cantinaExistente) {
        throw new Error('Cantina não encontrada')
      }

      // Se email está sendo alterado, verificar se já existe
      if (email && email !== cantinaExistente.email) {
        const cantinaComEmail = await this.findByEmail(email)
        if (cantinaComEmail) {
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
        UPDATE cantinas
        SET ${updateFields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING id, nome, email, atualizado_em
      `

      const result = await pool.query(query, values)
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao atualizar cantina: ' + error.message)
    }
  }

  // Deletar cantina
  static async delete(id) {
    try {
      const cantinaExistente = await this.findById(id)
      if (!cantinaExistente) {
        throw new Error('Cantina não encontrada')
      }

      const query = 'DELETE FROM cantinas WHERE id = $1 RETURNING id'
      const result = await pool.query(query, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error('Erro ao deletar cantina: ' + error.message)
    }
  }

  // Verificar credenciais (login)
  static async verifyCredentials(email, senha) {
    try {
      const cantina = await this.findByEmail(email)
      if (!cantina) {
        return null
      }

      const senhaValida = await bcrypt.compare(senha, cantina.senha)
      if (!senhaValida) {
        return null
      }

      return {
        id: cantina.id,
        nome: cantina.nome,
        email: cantina.email
      }
    } catch (error) {
      throw new Error('Erro ao verificar credenciais: ' + error.message)
    }
  }
}