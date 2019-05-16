const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)

let Category = require('../models/Category')

class CategoryCollection  extends bookshelf.Collection {
  get model() {
    return Category
  }
}

module.exports = CategoryCollection
