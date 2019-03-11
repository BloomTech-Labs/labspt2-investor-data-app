const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = 'staging';

module.exports = knex(config[dbEnv]);
