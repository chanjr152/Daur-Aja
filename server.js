// server.js

const server = require('./configs/app')();
// const config= require('./configs/config/config');
require('dotenv').config();

//create the basic server
server.create(process.env);

//start the server
server.start();
