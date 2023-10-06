const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const {  auth_singup, auth_login } = require("../controllers/auth.controllers");
const authPath = express.Router();
const { rolefunction } = require('../middleware/rbac.middleware');
const { authentication } = require("../middleware/auth.middleware");
 

require("dotenv").config();

authPath.post("/signup",authentication, rolefunction('superadmin'), auth_singup);
authPath.post('/login', auth_login);
module.exports = { authPath };
