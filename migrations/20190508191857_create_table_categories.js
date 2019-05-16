
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', (table) => {
    table.increments()
    table.string('name')
    table.string('slug')
    table.integer('parent_id')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('categories')
};
