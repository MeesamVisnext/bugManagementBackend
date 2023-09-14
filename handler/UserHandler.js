const db = require('../helper/db');
const CustomError = require('../helper/CustomError')

class UserHandler {
    static async getUsers() {
        console.log('comming in hand');
        try {
            const users = await db
                .select('users.*')
                .from('users')
                .whereIn('users.user_type', ['QA', 'Developer'])

            return users;
        } catch (error) {
            console.log(error)
            throw new CustomError('Internal Server Error', 500);
        }
    }
    static async getUsersByProjectId(project_id, user_id) {
        console.log('comming in hand');
        try {
            const users = await db('users')
                .select('*')
                .join('user_project', 'users.user_id', 'user_project.user_id')
                .where('user_project.project_id', project_id)
                .where('users.user_type', 'Developer')
                .whereNot('users.user_id', user_id);
            return users;
        } catch (error) {
            console.log(error)
            throw new CustomError('Internal Server Error', 500);
        }
    }
    static async getAssignedUsers(project_id) {
        console.log('comming in hand');
        try {
            const users = await db('users')
                .select('*')
                .join('user_project', 'users.user_id', 'user_project.user_id')
                .where('user_project.project_id', project_id)
            return users;
        } catch (error) {
            console.log(error)
            throw new CustomError('Internal Server Error', 500);
        }
    }

}
module.exports = UserHandler;