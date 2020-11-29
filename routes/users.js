const express = require('express');
const router = express.Router();
const UserController = require('../controller/user-control');
const Validator = require('../middlewares/validator');
const checkAuthentication = require('../middlewares/auth');

// ==== Bring in USER MODEL


// ==== REGISTER====

router.get('/register', UserController.getRegisterForm);

router.post('/register', Validator.registerFromValidation , UserController.postRegisterForm)

// ==== LOGIN ====

router.get('/login', UserController.getLoginForm);

router.post('/login', UserController.postLoginForm)


// LOGOUT =====

router.get('/logout', UserController.getLogout);

// ===== PASSWORD RECOVERY PROCESS===

router.get('/recover_password', checkAuthentication, UserController.getPwdRecoverForm);

router.post('/recover_password', checkAuthentication, UserController.postPwdRecoverForm);


// ===== CHANGE PASSWORD PAGES ===

router.get('/change_password/:id', checkAuthentication,UserController.getPwdChangeForm);

router.post('/change_password/:id', Validator.pwdChangeValidation , checkAuthentication, UserController.postPwdChangeForm);

// GET NEWSLETTER SUBSCRIPTION

router.get('/newsletters', checkAuthentication, UserController.getNewslettersSub);

router.get('/subscribe', checkAuthentication, UserController.userSubscribe);

router.get('/unsubscribe', checkAuthentication, UserController.userUnsubscribe);

router.get('/sendNewsletters', checkAuthentication, UserController.userWithSub);

// USER WAS AT LIVE

router.post('/wasThere', UserController.wasThere);

router.post('/ifWasThere', UserController.ifWasThere);

router.post('/uncheckWasThere', UserController.uncheckWasThere);


module.exports = router;