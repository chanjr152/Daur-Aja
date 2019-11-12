/*******
* config.js file
*******/

require('dotenv').config();
const _ = require('lodash');
const env = process.env.EN|| 'local';
const envConfig = require('./' + env);
let defaultConfig = {
    env : env
};
module.exports = _.merge(defaultConfig,envConfig);
