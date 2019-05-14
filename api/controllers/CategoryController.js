'use strict'

const validator = require('validator')
const debug = require('debug')('api:controller:category')
debug.log = console.log.bind(console)

const categoryModel = require('../models/Category')

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

    if (errors.length > 0) {
      return res.status(422).json(errors)
    }

    categoryModel.forge({
      name: body.name
    }).save()
      .then((c) => {
        return res.json(c)
      }).catch((err) => {
        debug(err.message)
        return res.status(500).json({ 'message': 'error.unknown' })
      })

  }
}

module.exports = CategoryController
