/*********
* app.js file
*********/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('../configs/config/jwt');
const errorHandler = require('./errorHandler');

module.exports = function () {
    let server = express(),
    create,
    start;

    create = (config) => {
        let routes = require('../routes');
        //set all the server settings
        server.set('env',config.ENV);
        server.set('port',config.PORT);
        server.set('hostname',config.HOST);

        //middleware to parse to json
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended:false
        }));

        // server.use(cors());
        server.use(jwt());

        //set up router
        routes.init(server);

        server.use(errorHandler);
    }

    start = () => {
        let hostname = server.get('hostname')
        ,port = server.get('port');

        server.listen(port,function(){
            console.log('Express server listening on - http://' +hostname+ ':' + port);
        });
    }

    return{
        create : create,
        start : start
    }
}