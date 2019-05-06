const dbConfig = require('../../knexfile')

const env = process.env.NODE_ENV || 'development'

const knex = require('knex')(dbConfig[env])

const bookshelf = require('bookshelf')(knex)


let User = bookshelf.Model.extend({
  tableName: 'users'
})

module.exports = User