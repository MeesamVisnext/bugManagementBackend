const CustomError = require('../helper/CustomError');
const BugService = require('../services/BugServices');
const upload = require('../config/multerConfig'); // Import multer config
class BugController {
    static async addBug(req, res) {
        console.log('comming controller')
        try {
            const creater = req.userId;
            const {
                bug_title,
                bug_description,
                deadline,
                developer,
                project_id,
                type
            } = JSON.parse(req.body.bugData);
            const ss = req.file ? req.file.path : null;
            console.log(bug_title, type);
            const bug_id = await BugService.addBug({
                bug_title,
                bug_description,
                deadline,
                developer,
                project_id,
                ss:ss,
                type,
                creater
            });
            console.log('going service');
            if (bug_id) {
                console.log('going service 1');

                res.status(200).json({ message: 'Bug Added Successfuly' })
                console.log('going service 2');

            }
        }
        catch (error) {
            console.log('going service 3 ', error);

            res.status(error.status).json({ message: error.message })
        }

    }
    static async getBugsCreated(req, res) {
        try {
            const user_id = req.userId;
            const bugsCreated = await BugService.getBugsCreated(user_id);
            console.log(bugsCreated);
            if (bugsCreated) {
                res.status(200).json({ message: 'Bugs that you have created got successfully', bugsCreated })
            }
        }
        catch (error) {
            res.status(error.status).json({ message: error.message })
        }

    }
    static async getBugsAssigned(req, res) {
        try {
            const user_id = req.userId;
            const bugsAssigned = await BugService.getBugsAssigned(user_id);
            if (bugsAssigned) {
                res.status(200).json({ message: 'Bugs that are assigned to got successfully', bugsAssigned })
            }
        }
        catch (error) {
            res.status(error.status).json({ message: error.message })
        }

    }
    static async updateBugStatus(req, res) {
        // console.log('comming controller');
        try {
            const { bug_id } = req.params;
            const { state } = req.body;
            const msg = await BugService.updateBugStatus(bug_id,state)
            if (msg) {
                res.status(200).json({ message: msg })
            }
        }
        catch {
            res.status(error.status).json({ message: error.message })
        }
    }

}
module.exports = BugController;