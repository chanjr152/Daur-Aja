/********
* user.js file (controllers/apis)
********/

const express = require('express');
const userService = require('../../services/users/userService');
const response = require('../../configs/res');
var HttpStatus = require('http-status-codes');
let router = express.Router();

router.post('/authenticate',authenticate);
router.post('/register',register);
router.post('/update',update);

async function authenticate(req,res,next){
    userService.authenticate(req.body)
        .then(user=>{
            if(user){
                response.ok(user,res);     
            }else{
                res.statusCode = HttpStatus.UNAUTHORIZED;
                res.statusMessage = HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED);
                response.not_success(user,res);   
            }
        })
        .catch(err=>{
            res.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            res.statusMessage = HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR);
            response.not_success(user,res);   
        });
}

async function update(req,res,next){
    userService.Update(req.body)
        .then(x=>{
            response.ok(x,res)
        })
        .catch(err=>response.not_success(err,res));
}

function register(req,res,next){
    userService.register(req.body)
        .then(user=> user ? response.ok(user,res) : response.not_success(user,res))
        .catch(err=>next(err));
}

module.exports = router;