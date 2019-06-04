const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)

let UserRole = require('../models/UserRole')

class UserRoleCollection  extends bookshelf.Collection {
  get model() {
    return UserRole
  }
}

module.exports = UserRoleCollection
