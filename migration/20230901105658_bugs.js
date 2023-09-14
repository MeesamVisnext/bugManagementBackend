exports.up = function(knex) {
    return knex.schema.createTable('bugs', function(table){
      table.increments('bug_id').primary();
      table.string('bug_title').notNullable().unique();
      table.string('bug_description');
      table.date('deadline');
      table.binary('ss');
      table.string('type').notNullable();
      table.string('state').notNullable();
      table.integer('creater').unsigned();
      table.foreign('creater').references('users.user_id');
      table.integer('developer').unsigned();
      table.foreign('developer').references('users.user_id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('bugs');
};
