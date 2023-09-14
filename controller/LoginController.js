const LoginService = require('../services/LoginService')
class LoginController {
    static async Login(req, res, next) {
        const { email, password } = req.body;
        console.log('Entering controller');
        try {
            const { token, user } = await LoginService.Login({ email, password });

                res.cookie('jwtToken', token, {
                    httpOnly: true, // Prevent JavaScript from accessing the cookie
                    secure: true,   // Use secure cookies for HTTPS
                    maxAge: 3600000, // Token expiration time in milliseconds (1 hour in this example)
                });
                res.json({ success: true, token});
        }
        catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }
}
module.exports = LoginController;