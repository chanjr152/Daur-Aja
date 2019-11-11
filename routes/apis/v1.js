/********
* v1.js file (inside routes/apis)
********/

const UserController = require('../../controllers/apis/userController');

const express = require('express');
let router = express.Router();
router.use('/users',UserController);
module.exports = router;

