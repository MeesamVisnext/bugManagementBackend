const CustomError = require('../helper/CustomError');
const bcrypt = require('bcrypt');
const LoginHandler = require('../handler/LoginHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('config');

class LoginService {
    // static secretKey = crypto.randomBytes(32).toString('hex');

    static async Login({ email, password }) {
        console.log('Entering Service');
        // Generate a random secret key
        console.log('Secret Key:', config.secretKey);
        console.log(password);
        try {
            const user = await LoginHandler.getUserByEmail(email);
            console.log(user);

            // If the user doesn't exist or the password doesn't match, return null
            if (!user || !await bcrypt.compare(password, user.password)) {
                throw new CustomError('Invalid Crediantials',401)
            }
            else{
                const token = jwt.sign({ user }, config.secretKey, { expiresIn: '1h' });
                return {token,user};   
            }
        }
        catch (error) {
            console.log(error);
            throw new CustomError(error.message, error.status);
        }
    }
}
module.exports = LoginService;