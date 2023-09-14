exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table){
      table.increments('project_id').primary();
      table.string('project_name').notNullable().unique();
      table.string('project_description');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};

