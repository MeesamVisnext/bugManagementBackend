const SignUpService = require('../services/SignUpSevice');

class SignUpController {
    static async SignUpUser(req, res) {
        const { email, password, userType, username } = req.body;
        console.log('Entering controller');
        try {
            const message = await SignUpService.addUser({ email, password, userType, username });
            console.log(message);
                res.status(200).json({
                    success: true,
                    message:'SignUp Successful'
                });
        }
        catch(error) {
            res.status(error.status).json({ message: error.message });
        }
    }
}
module.exports = SignUpController;