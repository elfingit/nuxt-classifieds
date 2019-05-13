'use strict'

const validator = require('validator')

class CategoryController {
  static store(req, res) {

    let errors = []

    let body = req.body

    if (Object.getOwnPropertyNames(body).length == 0) {
      return res.status(400).end()
    }

    if (validator.isEmpty(body.name)) {
      errors.push({
        'message': 'validation.required',
        'code': 'name'
      })
    }

  }
}

module.exports = CategoryController
