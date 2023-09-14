const UserHandler = require('../handler/UserHandler');
const CustomError = require('../helper/CustomError');
const projectUtil = require('../utilities/projectutil');
class UserService {
    static async getUsers() {
        try {
            return UserHandler.getUsers();
        }
        catch (error) {
            throw new CustomError(error.message, error.status);
        }
    }
    static async getUsersByProjectId(project_id, user_id) {
        try {
            projectUtil.validateProjectId(project_id);
            return UserHandler.getUsersByProjectId(project_id, user_id);
        }
        catch (error) {
            throw new CustomError(error.message, error.status);
        }
    }
    static async getAssignedUsers(project_id){
        try {
            projectUtil.validateProjectId(project_id);
            return UserHandler.getAssignedUsers(project_id);
        }
        catch (error) {
            throw new CustomError(error.message, error.status);
        }
    }
}
module.exports = UserService