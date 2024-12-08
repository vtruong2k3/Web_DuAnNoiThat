// server/routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");
const AuthController= new authController()
const routerAuth = express.Router();


routerAuth.post('/register',AuthController.userRegister)
routerAuth.post('/login',AuthController.userLogin)
routerAuth.post('/login',AuthController.userLogin)
routerAuth.get('/get-user',AuthController.getUser)
module.exports = routerAuth;
