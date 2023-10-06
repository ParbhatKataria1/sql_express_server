
const express = require('express');
const coursesPath = express.Router();
const { rolefunction } = require('../middleware/rbac.middleware');
const { courses_post } = require('../controllers/courses.controller');
const { authentication } = require('../middleware/auth.middleware');

coursesPath.post('/',authentication,  rolefunction('teacher', 'superadmin'), courses_post);
module.exports = {coursesPath}