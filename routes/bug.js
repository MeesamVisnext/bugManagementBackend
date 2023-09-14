const express = require('express');
const authenticateToken = require('../middleware/authentication');
const BugController = require('../controller/BugController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const originalname = file.originalname;
        const cleanedFilename = originalname.replace(/\s+/g, '_');
        cb(null, new Date().toISOString() + cleanedFilename);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/gif' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage , fileFilter:fileFilter});


const router = express.Router();

// router.get('/users', UserController.getUser);
router.put('/:bug_id', authenticateToken, BugController.updateBugStatus);
router.get('/assigned', authenticateToken, BugController.getBugsAssigned);
router.get('/created', authenticateToken, BugController.getBugsCreated);
router.post('/addbug', authenticateToken, upload.single('image'), BugController.addBug);

module.exports = router;
