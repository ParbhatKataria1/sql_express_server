
const express = require('express');
const { rolefunction } = require('../middleware/rbac.middleware');
const { students_get, students_post, students_put, students_delete } = require('../controllers/student.controllers');
const { authentication } = require('../middleware/auth.middleware');
const studentsPath = express.Router();

studentsPath.get('/',authentication, rolefunction('teacher', 'superadmin'), students_get )

studentsPath.post('/',authentication, rolefunction('teacher', 'superadmin'),students_post)

studentsPath.put('/:id',authentication, rolefunction('teacher', 'superadmin'), students_put );

studentsPath.delete('/:id',authentication, rolefunction('teacher', 'superadmin'), students_delete )

module.exports = {studentsPath}