'use strict'

const validator = require('validator')
const debug = require('debug')('api:controller:category')
debug.log = console.log.bind(console)

const categoryModel = require('../models/Category')

const slugify = require('slugify')
const { ValidationError } = require('../lib/errors')

class CategoryController {
  static store(req, res) {

    let body = req.body

    const slug = slugify(body.name, {
      lower: true
    })

    categoryModel.forge({
      name: body.name,
      slug: slug,
      parent_id: body.parent
    }).save()
      .then((c) => {
        return res.json(c)
      }).catch((err) => {

        debug(err)

        if (err instanceof ValidationError) {
          return res.status(422).json([{
            'code': err.code,
            'message': err.message
          }])
        } else {
          return res.status(500).json({ 'message': 'error.unknown' })
        }

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
