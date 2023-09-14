const CustomError = require('../helper/CustomError');
const SignUpDataValidator = require('../validators/SignUpDataValidator');
const bcrypt = require('bcrypt')
const SignUpHandler = require('../handler/SignUpHandler');

class SignUpService {
    static async addUser({ email, password, userType, username }) {
        try {
            console.log('Entering Services');
            const count = await SignUpDataValidator.isUserNameExist(username,email); 
            if (!email || !password || !userType || !username) {
                throw new CustomError('Incomplete Information in the request', 400);
            }
            else if (count > 0) {
                // console.log(count);
                throw new CustomError('User Already Exist',409);
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
                const userData = {
                    email: email,
                    password: hashedPassword,
                    user_name: username,
                    user_type: userType
                }
                SignUpHandler.addUser(userData);
            }
        }  
        catch(error){
            console.log(error)
            throw new CustomError(error.message,error.status);
        }
    }
}
module.exports = SignUpService;