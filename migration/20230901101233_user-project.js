exports.up = function(knex) {
    return knex.schema.createTable('user-project', function(table){
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.user_id');
      table.integer('project_id').unsigned();
      table.foreign('project_id').references('projects.project_id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user-project');
};

