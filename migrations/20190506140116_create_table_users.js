
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments()
        table.string('email')
        table.string('password')
        table.enu('status', ['novice', 'active', 'blocked'])
        table.integer('role_id')
        table.timestamps()
    }).then((unit) => {
        return knex.schema.createTable('user_roles', function (table) {
            table.increments()
            table.string('name')
            table.timestamps()
        })
    }).then((unit) => {
        return knex.schema.table('users', function (table) {
            table.foreign('role_id').references('user_roles.id')
        })
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
        .then((unit) => {
            knex.schema.dropTableIfExists('user_roles')
        })
};
