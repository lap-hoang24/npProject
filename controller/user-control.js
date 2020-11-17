

// ====== DEPENDENCIES  ==========================================
const mailer_newsletters = require("./mailer-newsletters");
const mailer_pwd = require('./mailer-pwd_recovery');
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


// ==== Bring in USER MODEL =================================
let User = require('../models/Users');

// ====== REGISTER  =========================================
exports.getRegisterForm = (req, res) => {
   req.logout();
   console.log(req.user);

   res.render('pages/register', {
      errors: false
   })
   // res.redirect('/users/register');
}


exports.postRegisterForm = (req, res) => {
   // If any field is not validated...

   let errors = validationResult(req);

   if (!errors.isEmpty()) {
      errors = errors.errors;

      res.render('pages/register', {
         errors: errors,
         user: false
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
}

// ====== LOGIN  ==============================

exports.getLoginForm = (req, res) => {
   res.render('pages/login');
}


exports.postLoginForm = (req, res, next) => {
   // Authenticate User 
   passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true,
      successFlash: true
   })(req, res, next);
   // passport.authenticate('login', { session: true }, (err, user, info) => {
   //     if (err || !user) {
   //         return res.status(400).json({
   //             message: 'Something is not right',
   //             user: user
   //         });
   //     }
   //     req.login(user, { session: false }, (err) => {
   //         if (err) {
   //             res.send(err);
   //         }
   //         user_id = { user_id: user._id };

   //         // generate a signed json web token with the contents of user object and return it in the response
   //         const token = jwt.sign(user_id, process.env.ACCESS_TOKEN_SECRET);
   //         console.log(token);
   //         // save token in localStorage

   //         res.render("index", {
   //             user: user
   //         });

   //     });
   // })(req, res);

}

// ====== LOGOUT  =====================================

exports.getLogout = (req, res) => {
   req.logout();
   req.flash('success', 'You are logged out');
   res.redirect('/');
}

// ==== PASSWORD RECOVERY PROCESS  ====================

exports.getPwdRecoverForm = (req, res) => {
   res.render('pages/email_recovery', {
      user: false
   })
}

exports.postPwdRecoverForm = (req, res) => {
   let query = { email: req.body.email };

   User.findOne(query, (err, user) => {
      if (err) {
         console.log(err);
      } else {
         mailer(user);
         console.log(user)
         res.render('pages/email_sent', {
            user: false
         })
      }
   })
}


// ====== PASSWORD CHANGE PROCESS  ========================

exports.getPwdChangeForm = (req, res) => {
   User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
         console.log(err)
      } else {
         res.render('pages/change_password', {
            user: user
         })
      }
   })
}

exports.postPwdChangeForm = (req, res) => {

   // If password and password 2 dont match
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      errors = errors.errors;

      res.render('pages/change_password/:id', {
         errors: errors,
         user: false
      })

      console.log(errors);

   } else {
      let newPassword = req.body.password;

      bcryptjs.genSalt(10, (err, salt) => {
         bcryptjs.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;

            newPassword = hash;

            User.findOneAndUpdate({ _id: req.params.id }, {
               $set: {
                  password: newPassword
               }
            }, (err, resa) => {
               if (err) {
                  console.log(err);
                  return;
               } else {
                  req.flash('success', "password updated")
                  res.redirect('/users/login')
               }
            })
         })
      })
   }
}

// NEWSLETTER SUBSCRIPTION

exports.getNewslettersSub = (req, res) => {
   User.findOneAndUpdate({ _id: res.locals.user._id }, {
      $set: {
         newsletter_sub: true
      }
   }, (err, resa) => {
      if (err) {
         console.error(err);
         return
      } else {
         // req.flash("success", "Newsletters Subcribed!");
         res.redirect('/');
      }
   }, {
      upsert: true
   })
}


// GET USERS WITH NEWSLETTER SUBSCRIPTION

exports.userWithSub = (req, res) => {
   User.find({ newsletter_sub: true }, (err, users) => {
      if (err) {
         console.error(err);
         return
      } else {
         users.forEach((user) => { mailer_newsletters(user) })
      }
   })
}