/********
* userService.js file (services/users)
********/

const express = require('express');
const User = require('../../models/userModel');
const conn = require('../../configs/db');
const config = require('../../configs/config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    authenticate,
    register,
    Update
}

async function authenticate(params){
    try {
        const {
            auth_id,
            password
        } = params;
        var user = await User.getUserSingle(auth_id);
        if(user && bcrypt.compareSync(password,user.auth_credential_hash)){
            const token = jwt.sign({sub:user.auth_id},config.secret);
            return token;
        }
    } catch (error) {
        console.log(error);
    }
}

async function register(params){
    try {
        var user = await User.getUserSingle(params.auth_id);
        if(user){
            throw 'Username '+params.auth_id+' has already taken.';
        }

        if(params.password){
            params.password = bcrypt.hashSync(params.password, 10);
        }

        var result= await User.createUser(params);
        if(result.affectedRows <= 0){
            throw 'Something error, please try again later';
        }

        return 'User Created';
    } catch (error) {
        error;
        
    }
}

async function Update(params){
    try {
        var user = await User.getUserSingle(params.auth_id);
        if(!user){
            throw 'Username '+params.auth_id+' not found.';
        }

        if(params.password){
            params.password = bcrypt.hashSync(params.password, 10);
        }

        var result= await User.updateUser(params);
        if(result.affectedRows <= 0){
            throw 'Something error, please try again later';
        }

        return 'User Updated';
    } catch (error) {
        return error;
        
    }
}