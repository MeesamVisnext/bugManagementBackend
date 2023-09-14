const BugHandler = require('../handler/BugHandler');
const CustomError = require('../helper/CustomError');
const BugValidator = require('../validators/BugValidator');
const bugutil = require('../utilities/bugutil');
class BugService {
    static async addBug({
        bug_title,
        bug_description,
        deadline,
        developer,
        project_id,
        ss,
        type,
        creater
    }) {
        try {
            console.log('comming service')
            bugutil.validateBug({
                bug_title,
                type,
                developer,
                project_id
            })
            const count = await BugValidator.isBugExist(bug_title);
            console.log(count);
            if (count > 0) {
                throw new CustomError('Bug Already Exist', 409);
            }
            else {
                return await BugHandler.addBug({
                    bug_title,
                    bug_description,
                    deadline,
                    developer,
                    project_id,
                    ss,
                    type,
                    creater
                });
            }
        }
        catch (error) {
            throw new CustomError(error.message, error.status);
        }
    }
    static async getBugsCreated(user_id){
        try
        { 
         return BugHandler.getBugsCreated(user_id);
         }
         catch(error){
             throw new CustomError(error.message,error.status);
         }
    }
    static async getBugsAssigned(user_id){
        try
        { ;
         return BugHandler.getBugsAssigned(user_id);
         }
         catch(error){
             throw new CustomError(error.message,error.status);
         }
    }
     static async updateBugStatus(bug_id,state){
        try
        { 
         return BugHandler.updateBugStatus(bug_id,state);
         }
         catch(error){
             throw new CustomError(error.message,error.status);
         }
    }
    
}
module.exports = BugService