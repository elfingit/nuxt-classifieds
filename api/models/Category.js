const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)


class Category extends bookshelf.Model {
  get tableName() {
    return 'categories'
  }

  get hasTimestamps() {
    return true
  }

}

module.exports = Category