'use strict'

const validator = require('validator')

class CategoryController {
  static store(req, res) {

    let errors = []

    let body = req.body

    if (validator.isEmpty(body.name)) {
      errors.push({
        'message': 'validation.required',
        'code': 'name'
      })
    }

  }
}
