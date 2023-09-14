const db = require('../helper/db');
const CustomError = require('../helper/CustomError');

class ProjectValidator {

    static async isProjectNameExist(project_name) {
        try {
            console.log('entering validators')
            const result = await db('projects')
                .where('projects.project_name', project_name)
                .count('* as count');
            const count = parseInt(result[0].count);
            return count;
        }
        catch (error) {
            console.log(error);
            throw new CustomError('Internal Server Error',500);
        }
    }

}
module.exports = ProjectValidator;