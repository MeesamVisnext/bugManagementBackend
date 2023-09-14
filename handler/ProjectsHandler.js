const db = require('../helper/db');
const CustomError = require('../helper/CustomError')

class ProjectsHandler {
  static async GetProjects(user_id) {
    console.log('comming in hand');
    console.log(user_id);

    try {
      const projects = await db
        .select('projects.*')
        .from('projects')
        .join('user_project', 'projects.project_id', '=', 'user_project.project_id') // Adjust column names as needed
        .where('user_project.user_id', '=', user_id) // Adjust column names as needed
        .orderBy('projects.project_id', 'asc'); // Replace 'project_id' with the column you want to use for sorting
      return projects;
    } catch (error) {
      console.log(error)
      throw new CustomError('Projects can be fetched successfully', 500);
    }
  }
  static async addProject({ project_description, project_name }) {
    console.log('comming in hand');
    try {
      const project_id = await db('projects').insert({
        project_name: project_name,
        project_description: project_description,
      }).returning('project_id');

      return project_id[0];
    } catch (error) {
      console.log(error)
      throw new CustomError('Project can not be added successfully', 500);
    }
  }
  static async addUsersToProject(project_id, user_ids, user_id) {
    try {
      const userProjectRecords = user_ids.map(user_id => ({
        project_id: project_id.project_id,
        user_id: user_id
      }));

      // Add the manager to the array
      userProjectRecords.push({
        project_id: project_id.project_id,
        user_id: user_id
      });

      await db('user_project').insert(userProjectRecords);
    } catch (error) {
      console.error('Error adding users to project:', error);
      throw new CustomError('Error adding users to project:', 500);
    }
  }
  static async updateProject({ project_id, project_description, project_name }) {
    console.log('comming in hand');
    try {
      const updatedProject = await db('projects')
        .where({ project_id })
        .update({
          project_name: project_name,
          project_description: project_description,
        })
      return updatedProject;
    } catch (error) {
      console.log(error)
      throw new CustomError('Project can not be updated successfully', 500);
    }
  }
  static async updateUsersToProject(project_id, user_ids, user_id) {
    try {
      await db('user_project')
        .where({ project_id })
        .del();

      const userProjectRecords = user_ids.map(user_id => ({
        project_id: project_id,
        user_id: user_id
      }));

      // Add the manager to the array
      userProjectRecords.push({
        project_id: project_id,
        user_id: user_id
      });

      await db('user_project').insert(userProjectRecords);
    } catch (error) {
      console.error('Error updating users to project:', error);
      throw new CustomError('Error updating users to project:', 500);
    }
  }
}
module.exports = ProjectsHandler;