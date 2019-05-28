const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)

let User = require('../models/User')

class UserCollection  extends bookshelf.Collection {
  get model() {
    return User
  }
}

module.exports = UserCollection
