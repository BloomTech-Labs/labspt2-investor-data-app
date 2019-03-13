const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = 'development';

module.exports = knex(config[dbEnv]);
