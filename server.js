// server.js

const server = require('./configs/app')();
const config= require('./configs/config/config');

//create the basic server
server.create(config);

//start the server
server.start();
