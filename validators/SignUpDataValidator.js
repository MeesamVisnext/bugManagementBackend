const db = require('../helper/db');
const CustomError = require('../helper/CustomError');

class SignUpDataValidator {

    static async isUserNameExist(username, email) {
        try {
            console.log('entering validators')
            const result = await db('users')
                .where(function () {
                    this.where('users.user_name', username)
                        .orWhere('users.email', email);
                })
                .count('* as count');
            // console.log('entering validators');
            // console.log(result);
            const count = parseInt(result[0].count);
            // console.log(count);
            return count;
        }
        catch (error) {
            console.log(error);
            throw new CustomError('Internal Server Error', 500)
        }
        // finally {
        //     await db.destroy(); // Close the database connection when done.
        // }
    }

}
module.exports = SignUpDataValidator;