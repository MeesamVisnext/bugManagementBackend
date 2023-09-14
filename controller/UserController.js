const CustomError = require('../helper/CustomError');
const UserService = require('../services/UserServices')
class UserController {
    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            if (users) {
                res.status(200).json({ message: 'All Users Fetched' ,users})
            }
        }
        catch (error) {
            res.status(error.status).json({message: error.message})
        }

    }
    static async getUsersByProjectId(req, res) {
        const project_id = req.query.project_id;
        const user_id = req.userId; 
        try {
            const users = await UserService.getUsersByProjectId(project_id,user_id);
            if (users) {
                res.status(200).json({ message: 'Users Fetched against this project' ,users})
            }
        }
        catch (error) {
            res.status(error.status).json({message: error.message})
        }
    }
    static async getAssignedUsers(req, res){
        const project_id = req.query.project_id;
        try {
            const users = await UserService.getAssignedUsers(project_id);
            if (users) {
                res.status(200).json({ message: 'Users Fetched against this project' ,users})
            }
        }
        catch (error) {
            res.status(error.status).json({message: error.message})
        } 
    }
}
module.exports = UserController;