const cors = require('cors');
require('dotenv').config();
const express = require('express');
const db = require('./data/dbConfig');
const parser = express.json();
const server = express();
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcryptjs')
const favoritesRouter = require('./routers/favoritesRouter');
const billingRouter = require('./routers/billingRouter');
const usersRouter = require('./routers/usersRouter');


server.use(cors());
server.use(express.json());
server.use(parser);
server.use(logger('tiny'));
server.use(helmet());
server.use('/api/billing', billingRouter);
server.use('/api/favorites', favoritesRouter);
server.use('/api/users', usersRouter);


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));