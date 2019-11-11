// db.js

const mysql = require('mysql');
const util = require('util');

module.exports = function () {
    
    const connection = mysql.createConnection( {
        host: "localhost",
        user: "root",
        password: "Papuaku15",
        database: "reach_schema"
    } );

    let query,
    close,
    beginTransaction,
    commit,
    rollback;

    query = (sql,args) => {
        return util.promisify( connection.query )
        .call( connection, sql, args );
    }
    close = () => {
        return util.promisify( connection.end ).call( connection );
    }

    beginTransaction = () =>{
        return util.promisify( connection.beginTransaction )
            .call( connection );
    }

    commit = () =>{
        return util.promisify( connection.commit )
            .call( connection );
    }

    rollback = () => {
        return util.promisify( connection.rollback )
            .call( connection );
    }
    return {
        query : query,
        close : close,
        beginTransaction : beginTransaction,
        commit : commit,
        rollback : rollback
    }
}

