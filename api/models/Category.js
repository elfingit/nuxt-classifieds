const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)

const validator = require('validator')

const { ValidationError } = require('../lib/errors')

class Category extends bookshelf.Model {

  initialize() {

    this.on('saving', (model) => {

      let validateName = new Promise((resolve, reject) => {
        if (validator.isEmpty(model.get('name'))) {
          return reject(new ValidationError('name', 'validation.required'))
        }

        return resolve(true)
      })

      let validateParent = new Promise((resolve, reject) => {
        if (!model.get('parent_id')) {
          return resolve()
        }

        Category.byId(model.get('parent_id'))
          .then((c) => {
            if (c != null) {
              return resolve()
            }

            return reject(new ValidationError('parent', 'validation.category_not_exists'))
          }).catch((err) => {
            return reject(err)
        })

      })

      return Promise.all([validateName, validateParent])
        .then((data) => {
          return true
        })
        .catch((err) => {
          throw err
        })

    })

  }

  get tableName() {
    return 'categories'
  }

  get hasTimestamps() {
    return true
  }

  static byId (id) {
    return this.forge().query({where:{ id: id }}).fetch()
  }

}

module.exports = Category
