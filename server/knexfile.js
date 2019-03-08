// Update with your config settings.

//Must require the dotENV file to connect with postgre
require('dotenv').config('/.env');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/pickem.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      filename: process.env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  
};
