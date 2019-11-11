'use strict';

exports.ok = function(values,res){
    var data ={
        'status' : res.statusCode,
        'data' : values
    }
    res.json(data);
    res.end();
}

exports.not_success = function(values,res){
    var data ={
        'status' : res.statusCode,
        'message' : res.statusMessage,
    }
    res.json(data);
    res.end();
}