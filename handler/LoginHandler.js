const db = require('../helper/db');
const CustomError = require('../helper/CustomError')

class LoginHandler{
    static async getUserByEmail(email) {
        console.log('Entering Handler');
        console.log(email);

        try {
          const user = await db('users').where({email : email }).first();
          console.log(user);
          return user;
        } catch (error) {
            console.log(error)
          throw new CustomError('Internal Server Error',500);
        }
      }
}
module.exports = LoginHandler;