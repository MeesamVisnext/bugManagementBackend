const db = require('../helper/db');
const CustomError = require('../helper/CustomError');

class BugValidator {

    static async isBugExist(bug_title) {
        try {
            console.log('entering validators')
            const result = await db('bugs')
                .where('bugs.bug_title', bug_title)
                .count('* as count');
            const count = parseInt(result[0].count);
            return count;
        }
        catch (error) {
            console.log(error);
            throw new CustomError('Internal Server Error', 500);
        }
    }

}
module.exports = BugValidator;