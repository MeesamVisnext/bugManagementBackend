const CustomError = require('../helper/CustomError');
const db = require('../helper/db');
class SignUpHandler{
    static async addUser(userData){
    
        try{
            console.log('Entering Handler');
            await db('users').insert(userData);
        }
        catch(error){
            console.log(error)
            throw new CustomError('Error while Signing up' , 500)
        }
        // finally{
        //     await db.destroy();
        // }
    }
}
module.exports = SignUpHandler;

