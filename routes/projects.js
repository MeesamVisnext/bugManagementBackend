const express = require('express');
const authenticateToken = require('../middleware/authentication')
const ProjectsController = require('../controller/ProjectsController');
const router = express.Router();

// router.get('/users', UserController.getUser);

router.get('/', authenticateToken , ProjectsController.GetProjects);
router.post('/addproject', authenticateToken , ProjectsController.addProject);
router.put('/updateproject', authenticateToken, ProjectsController.updateProject);

module.exports = router;
