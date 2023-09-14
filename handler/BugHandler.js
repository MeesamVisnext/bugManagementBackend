const db = require('../helper/db');
const CustomError = require('../helper/CustomError');
// const fs = require('fs');

class BugHandler {
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
        console.log('comming in hand');
        //   const imageBuffer = await fs.readFile(ss.path);
        try {
            const bug_id = await db('bugs').insert({
                bug_title: bug_title,
                bug_description: bug_description,
                deadline: deadline,
                developer: developer,
                project_id: project_id,
                ss: ss,
                type: type,
                creater: creater
            }).returning('bug_id');

            return bug_id[0];
        } catch (error) {
            console.log(error)
            throw new CustomError('Bug can not be added successfully', 500);
        }
    }
    static async getBugsCreated(user_id) {
        // console.log('comming in hand');
        // console.log(user_id);

        try {
            const bugs = await db
                .select('bugs.*')
                .from('bugs')
                .where('bugs.creater', '=', user_id) // Adjust column names as needed
        
            return bugs;
        } catch (error) {
            // console.log(error)
            throw new CustomError('Bugs can not be fetched successfully', 500);
        }
    }
    static async getBugsAssigned(user_id) {
        // console.log('comming in hand');
        // console.log(user_id);

        try {
            const bugs = await db
                .select('bugs.*')
                .from('bugs')
                .where('bugs.developer', '=', user_id) // Adjust column names as needed
        
            return bugs;
        } catch (error) {
            // console.log(error)
            throw new CustomError('Bugs can not be fetched successfully', 500);
        }
    }
    static async updateBugStatus(bug_id,state){
        // console.log('comming in hand');

        try {
            const updatedBug = await db('bugs')
            .where('bug_id', bug_id)
            .update({ state }, ['bug_id', 'state']); 
            if(updatedBug){
                return 'Bug Status Updated successfully'
            }
            else{
                throw new CustomError('Bug status can not be updated successfully', 500)
            }
        } catch (error) {
            // console.log(error)
            throw new CustomError('Bug status can not be updated successfully', 500);
        }
    }
}
module.exports = BugHandler;