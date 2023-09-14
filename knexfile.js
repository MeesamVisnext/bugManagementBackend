// knexfile.js
//knexfile
module.exports = {
  development: {
      client: 'pg',
      connection: "postgres://postgres:postgres@localhost:5432/bug-tracking",

      migrations: {
          directory: './migration',
      },
      debug: true,
      
  },
};