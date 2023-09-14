exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
      table.increments('user_id').primary();
      table.string('user_name').notNullable().unique();
      table.integer('manager_id').unsigned();
      table.foreign('manager_id').references('users.user_id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};

