const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const passport = require('passport');


// ==== Bring in USER MODEL

let User = require('../models/Users');

// ==== Render Register form

router.get('/register', (req, res) => {
    res.render('register', {
        errors: false
    })
})

// ==== Submit Register Form

router.post('/register', [
    // Validating all the input fields

    check('email').isEmail().trim().withMessage('Email required'),
    check('username').isLength({ min: 1 }).trim().withMessage('Username required'),
    check('password').isLength({ min: 1 }).trim().withMessage('Password required'),
    check('password2')
        .isLength({ min: 1 })
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords dont match');
            } else {
                return true;
            }
        })
        .trim()
], (req, res) => {
    // If any field is not validated...

    let errors = validationResult(req);
    

    if (!errors.isEmpty()) {
        errors = errors.errors;
        res.render('register', {
            errors: errors
        })
        
        console.log(errors);
    } else {

        let user = new User();

        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;

        // hashing password

        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(user.password, salt, (err, hash) => {
                if (err) throw err;

                user.password = hash;

                user.save((err) => {
                    if (err) {
                        console.log(err)
                        return;
                    } else {
                        req.flash('success', 'You are now registered')
                        res.redirect('/users/login')
                    }
                })
            })
        })
    }
})

// ==== Render LOGIN page

router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        falureFlash: true,
        successFlash: 'Welcome!'
    })(req, res, next);
})

// LOGOUT

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
})

// ACCESS CONTROL

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

module.exports = router;