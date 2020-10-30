const express = require('express');
const router = express.Router();
const UserController = require('../controller/user-control');
const checkAuth = require('../controller/auth');
const Validator = require('../controller/validator');

// ==== Bring in USER MODEL

let User = require('../models/Users');

// ==== Render Register form

router.get('/register', UserController.getRegisterForm);

// ==== Submit Register Form

router.post('/register', Validator.registerFromVal , UserController.postRegisterForm)

// ==== Render LOGIN page

router.get('/login', UserController.getLoginForm);

router.post('/login', UserController.postLoginForm)


// LOGOUT =====

router.get('/logout', UserController.getLogout);

// RENDER PASSWORD RECOVERY PROCESS===

router.get('/recover_password', UserController.getPwdRecoverForm);

router.post('/recover_password', UserController.postPwdRecoverForm);


// RENDER CHANGE PASSWORD PAGE

router.get('/change_password/:id',UserController.getPwdChangeForm);

router.post('/change_password/:id', Validator.pwdChangeVal , UserController.postPwdChangeForm);


module.exports = router;