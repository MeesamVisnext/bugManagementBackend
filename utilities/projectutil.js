const CustomError = require('../helper/CustomError')
class projectUtil {
    static validateProject({project_name}){
        if(project_name==='')
        {
            throw new CustomError('Project Name or Project Dscription is missing', 400);
        }

    }
    static validateProjectId(project_id){
        if(!project_id){
            throw new CustomError('No Projects are selected against which you want to access users',400)
      }
    }
}

module.exports = projectUtil;