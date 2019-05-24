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

    let promise = null

    if (body.update_id) {

      promise = categoryModel.forge({ id: body.update_id })
        .save({
          name: body.name,
          slug: slug,
          parent_id: body.parent
        }, { patch: true, withRefresh: true })

    } else {
      promise = categoryModel.forge({
        name: body.name,
        slug: slug,
        parent_id: body.parent
      }).save(null, {withRefresh: true})
    }

    promise.then((c) => {
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

    new CategoryCollection().query({
      where: { parent_id: 0  },
      orWhere: { parent_id: null }
    }).fetch({
      withRelated: ['children']
    }).then((categories) => {
        return res.json(categories)
      }).catch((err) => {
        debug(err)
        return res.status(500).end()
    })
  }

  static del(req, res) {
    const id = req.params.id

    categoryModel.byId(id)
      .then((c) => {

        if (c == null) {
          return res.status(404).end()
        }

        c.destroy()

        return res.status(204).end()

      }).catch((err) => {
        debug(err)
        return res.status(500).end()
    })

  }
}

module.exports = CategoryController
