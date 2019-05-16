'use strict'

const validator = require('validator')
const debug = require('debug')('api:controller:category')
debug.log = console.log.bind(console)

const categoryModel = require('../models/Category')

const slugify = require('slugify')

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

    const slug = slugify(body.name, {
      lower: true
    })

    categoryModel.forge({
      name: body.name,
      slug: slug
    }).save()
      .then((c) => {
        return res.json(c)
      }).catch((err) => {
        debug(err.message)
        return res.status(500).json({ 'message': 'error.unknown' })
      })

  }

  static list(req, res) {
    const CategoryCollection = require('../collections/CategoryCollection')

    new CategoryCollection().fetch()
      .then((categories) => {
        return res.json(categories)
      }).catch((err) => {
        debug(err)
        return res.status(500)
    })
  }
}

module.exports = CategoryController
