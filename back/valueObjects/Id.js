import crypto from 'crypto';
import ValidationException from '../exceptions/ValidationException.js';

class Id {
  constructor(value) {
    if (!value) {
      this.value = crypto.randomUUID();
      return;
    }
    this.validate(value);
    this.value = value;
  }

  validate(value) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new ValidationException('ID inválido', { id: `ID inválido: ${value}` });
    }
  }

  toString() {
    return this.value;
  }

  equals(other) {
    if (!(other instanceof Id)) return false;
    return this.value === other.value;
  }

  toJSON() {
    return this.value;
  }
}

export default Id;
