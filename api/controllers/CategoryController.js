'use strict'

const validator = require('validator')

class CategoryController {
  static store(req, res) {

    let errors = []

    if (validator.isEmpty(body.name)) {
      errors.push({
        'message': 'validation.required',
        'code': 'name'
      })
    }

    if (errors.length > 0) {
      return res.status(422).json(errors)
    }

  }
}

module.exports = CategoryController
