const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)
const UserRole = require('./UserRole')


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

  static byId (id) {
    return this.forge().query({where:{ id: id }}).fetch();
  }

  role() {
    return this.belongsTo(UserRole, 'role_id', 'id').fetch()
  }

}

module.exports = User
