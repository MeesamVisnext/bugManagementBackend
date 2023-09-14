const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const projectRoutes = require('./projects')
const bugRoutes = require('./bug')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({"message": "Welcome to website"});
});

router.use('/api/v1/users', userRoutes)
router.use('/api/v1/projects', projectRoutes)
router.use('/api/v1/bugs', bugRoutes)
module.exports = router;
