exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
      table.string('email').notNullable();
      table.text('password').notNullable();
      table.string('user_type').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('users', function (table) {
      table.dropColumn('email');
      table.dropColumn('password');
      table.dropColumn('user_type');
    });
  };
  