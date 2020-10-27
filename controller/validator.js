
const { check, validationResult } = require('express-validator');

// === REGISTER FORM VALIDATOR


exports.registerFromVal = [
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
];


// === PASSWORD CHANGE FORM VALIDATOR

exports.pwdChangeVal = [
    check('password').isLength({ min: 1 }).trim().withMessage('New password required'),
    check('password2').isLength({ min: 1 }).trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords dont match');
        } else {
            return true;
        }
    })
]