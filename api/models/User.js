const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)


class User extends bookshelf.Model {
  get tableName() {
    return 'users'
  }

  get hasTimestamps() {
    return true
  }

  static byEmail (email) {
    return this.forge().query({where:{ email: email }}).fetch();
  }

}

module.exports = User