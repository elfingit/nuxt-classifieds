'use strict'

class ValidationResult {
  constructor(status, errors = []) {
    this.status = status
    this.errors = errors
  }

  get status() {
    return this.status
  }

  get errors() {
    return this.errors
  }
}

module.exports = ValidationResult
