
async function getUserSingle(user) {
    const db = require('../configs/db')();
    try {
         var result = await db.query("select * from trx_auth where auth_id = '"+user+"'");
         return result[0];
    } catch (error) {
        console.log(error);
    } finally {
        await db.close();
    }
};

async function createUser(user){
    const db = require('../configs/db')();
    const {
        auth_id,
        password
    } = user;
    try {
        return await db.query("insert into trx_auth(auth_id,auth_credential_hash,user_unique_id) values ('"+auth_id+"','"+password+"','USER-0001')");
    } catch (error) {
        console.log(error);
    }finally{
        await db.close();
    }
}

async function updateUser(user){
    const db = require('../configs/db')();
    const {
        auth_id,
        password
    } = user;
    try {
        return await db.query("update trx_auth set auth_credential_hash = '"+password+"' where auth_id = '"+auth_id+"'");
    } catch (error) {
        console.log(error);
    }finally{
        await db.close();
    }
}

module.exports = {
    getUserSingle,
    createUser,
    updateUser
}