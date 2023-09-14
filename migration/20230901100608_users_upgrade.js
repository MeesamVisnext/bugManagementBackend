exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
        table.integer('project_id').unsigned();
        table.foreign('project_id').references('projects.project_id');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('users', function (table) {
      table.dropColumn('project_id');
    });
  };
  
