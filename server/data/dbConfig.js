const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.DATABASE_URL || 'staging';

module.exports = knex(config[dbEnv]);
