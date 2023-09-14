const { response } = require('../app');
const CustomError = require('../helper/CustomError');
const ProjectService = require('../services/ProjectService')
class ProjectsController {
    static async GetProjects(req, res) {
        console.log('comming controller')
        try {
            const user_id = req.userId
            const projects = await ProjectService.GetProjects(user_id);
            if (projects) {
                res.status(200).json({ message: 'Projects against this manager got successfully', projects })
            }
        }
        catch (error) {
            res.status(error.status).json(error.message)
        }

    }
    static async addProject(req, res) {
        try {
            const { project_description, project_name, user_ids } = req.body;
            const user_id = req.userId

            const project_id = await ProjectService.addProject({ project_description, project_name });
            await ProjectService.addUsersToProject(project_id, user_ids, user_id);
            res.status(200).json({ message: 'Project added successfully' });


        } catch (error) {
            res.status(error.status).json({ message: error.message })
        }
    
    }
    static async updateProject(req, res) {
        try {
            const { project_id, project_description, project_name, user_ids } = req.body;
            const user_id = req.userId;
            await ProjectService.updateProject({ project_id, project_description, project_name });
            await ProjectService.updateUsersToProject(project_id, user_ids, user_id);
            res.status(200).json({ message: 'Project Updated Successfully' });
        } catch (error) {
            res.status(error.status).json({ message: error.message })
        }
    
    }
}
module.exports = ProjectsController;