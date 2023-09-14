const ProjectsHandler = require('../handler/ProjectsHandler');
const CustomError = require('../helper/CustomError');
const ProjectValidator = require('../validators/ProjectValidator');
const projectutil = require('../utilities/projectutil');
class ProjectService{
    static async GetProjects (user_id){
        try
       { 
        return ProjectsHandler.GetProjects(user_id);
        }
        catch(error){
            throw new CustomError(error.message,error.status);
        }
    }
    static async addProject ({project_description,project_name}){
        try
       { 
        projectutil.validateProject({project_name});
        const count = await ProjectValidator.isProjectNameExist(project_name);
        if(count>0){
            throw new CustomError('Project Already Exist',409);
        }
        else{

            return ProjectsHandler.addProject({project_description,project_name});
        }
        }
        catch(error){
            throw new CustomError(error.message,error.status);
        }
    }
    static async addUsersToProject(project_id, user_ids, user_id){
        try
        { 
         return ProjectsHandler.addUsersToProject(project_id, user_ids, user_id);
         }
         catch(error){
             throw new CustomError(error.message,error.status);
         }
    }
    static async updateProject ({project_id, project_description, project_name}){
        try
       { 
            projectutil.validateProject({project_name});

            return ProjectsHandler.updateProject({project_id, project_description, project_name});
        }
        catch(error){
            throw new CustomError(error.message,error.status);
        }
    }
    static async updateUsersToProject(project_id, user_ids, user_id){
        try
        { 
         return ProjectsHandler.updateUsersToProject(project_id, user_ids, user_id);
         }
         catch(error){
             throw new CustomError(error.message,error.status);
         }
    }
}
module.exports= ProjectService