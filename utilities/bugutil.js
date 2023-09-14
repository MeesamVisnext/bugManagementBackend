const CustomError = require('../helper/CustomError')
class bugUtil {
    static validateBug({
        bug_title,
        type,
        developer,
        project_id
    }){
        if (!bug_title || !type || !developer || !project_id) {
            throw new CustomError('bug_title or type or developer or project is missing', 400);
        }
    }
}

module.exports = bugUtil;