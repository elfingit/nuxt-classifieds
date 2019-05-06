
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_roles').insert([
        {id: 1, name: 'Admin', created_at: new Date()},
        {id: 2, name: 'User', created_at: new Date()},
        {id: 3, name: 'Manager', created_at: new Date()}
      ]);
    });
};
