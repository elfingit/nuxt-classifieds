const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)


class UserRole extends bookshelf.Model {
  get tableName() {
    return 'user_roles'
  }

  get hasTimestamps() {
    return true
  }

}

module.exports = UserRole