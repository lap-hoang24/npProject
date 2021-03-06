
// ====== DEPENDENCIES  ========================================
const mailer_newsletters = require("./mailer-newsletters");
const mailer_pwd = require('./mailer-pwd_recovery');
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const AvaColor = require('./avatar-color-generator');
const Event = require('../models/Event');
const User = require('../models/Users');

// ====== REGISTER  =========================================
exports.getRegisterForm = (req, res) => {
   req.logout();
   console.log(req.user);

   res.render('pages/register', { errors: false })
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
      user.avatar = AvaColor.avatarGenerator();
      user.color = AvaColor.colorGenerator();

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
                  res.redirect('/users/login');
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
   passport.authenticate('local', (err, user, info) => { // custom callback
      if (err) throw err;

      if (!user) {
         req.flash('error', 'Invalid username or password');
         return res.redirect('/users/login');
      };

      req.logIn(user, (err) => {
         if (err) throw err;

         const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

         res.cookie('jwt_token', token, { httpOnly: true }); //save token in cookies

         return res.redirect('/');
      })
   })(req, res, next);
}

// ====== LOGOUT  =====================================

exports.getLogout = (req, res) => {
   req.logout();
   req.flash('success', 'You are logged out');
   res.redirect('/');
}

// ==== PASSWORD RECOVERY PROCESS  ====================

exports.getPwdRecoverForm = (req, res) => {
   res.render('pages/email_recovery', {})
}

exports.postPwdRecoverForm = async (req, res) => {
   let query = { email: req.body.email };

   try {
      let user = await User.findOne(query)

      mailer_pwd(user);
      res.render('pages/email_sent', { user: false })
   } catch (err) {
      console.error(err)
   }
}


// ====== PASSWORD CHANGE PROCESS  ========================

exports.getPwdChangeForm = async (req, res) => {
   try {
      let user = await User.findOne({ _id: req.params.id })

      res.render('pages/change_password', { user })
   } catch (err) {
      console.error(err)
   }
}

exports.postPwdChangeForm = (req, res) => {

   // If password and password2 dont match
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

// NEWSLETTER SUBSCRIPTION ==============

exports.getNewslettersSub = (req, res) => {
   res.render('pages/newsletters_sub', {});
}



exports.userSubscribe = (req, res) => {
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

// exports.userSubscribe = async (req, res) => {
//    try {
//       let done = User.findOneAndUpdate({ _id: res.locals.user._id }, { $set: { newsletter_sub: true } }, { upsert: true });
//       console.log(done);
//       mailer_newsletters(res.locals.user);
//       res.redirect('/');

//    } catch (err) {
//       console.error(err);
//    }
// }


// exports.userUnsubscribe = async (req, res) => {
//    try {
//       let done = User.findOneAndUpdate({ _id: res.locals.user._id }, { $set: { newsletter_sub: false } }, { upsert: true })
//       console.log(done);
//       res.redirect('/');
//    } catch (err) {
//       console.error(err);
//    }
// }

exports.userUnsubscribe = (req, res) => {
   User.findOneAndUpdate({ _id: res.locals.user._id }, {
      $set: {
         newsletter_sub: false
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

exports.userWithSub = async (req, res) => {
   try {
      let users = User.find({ newsletter_sub: true })
      users.forEach((user) => { mailer_newsletters(user) })
   } catch (err) {
      console.error(err);
   }
}

//================== USER WAS AT LIVE CHECKBOX ====================================

// exports.wasThere = async (req, res) => {
//    try {
//       let done = await Event.findOneAndUpdate({ _id: req.body.event_id },
//          { $push: { users_was_there: req.body.user_id } },
//          { upsert: true });

//       res.redirect("back");

//    } catch (err) {
//       console.error(err);
//    }
// }

// exports.ifWasThere = async (req, res) => {
//    try {
//       let event = await Event.findById({ _id: req.body.event_id })
//       console.log(event)

//       const numOfUsers = event.users_was_there.length
//       // if user checked
//       if (event.users_was_there.includes(req.body.user_id)) {
//          console.log(numOfUsers);
//          res.send("yes");
//       } else {
//          console.log(numOfUsers);
//          // res.send(event.users_was_there.length);
//          res.send('no');
//       }

//    } catch (err) {
//       console.error(err)
//    }
// }

// exports.uncheckWasThere = async (req, res) => {
//    try {
//       let event = await Event.findOneAndUpdate({ _id: req.body.event_id },
//          { $pull: { users_was_there: req.body.user_id } }); // this returned "event" hasn't been updated from $pull

//       let eventUpdated = await Event.findById({ _id: req.body.event_id });

//       if (eventUpdated.users_was_there.includes(req.body.user_id)) {
//          res.send('yes');
//       } else {
//          res.send('no');
//          console.log('uncheck');
//       }

//    } catch (err) {
//       console.error(err);
//    }
// }

//================== USER WAS AT LIVE CHECKBOX ====================================

exports.wasThere = async (req, res) => {
   try {
      let done = await Event.findOneAndUpdate({ _id: req.body.event_id },
         { $push: { users_was_there: req.body.user_id } },
         { upsert: true });

      res.redirect("back");

   } catch (err) {
      console.error(err);
   }
}

exports.ifWasThere = async (req, res) => {
   try {
      let event = await Event.findById({ _id: req.body.event_id })
      const numOfUsers = event.users_was_there.length
      console.log(numOfUsers);
      // if user checked
      if (event.users_was_there.includes(req.body.user_id)) {
         res.send({this_user: true, num_of_users: numOfUsers});
      } else {
         res.send({this_user: false, num_of_users: numOfUsers});
      }

   } catch (err) {
      console.error(err)
   }
}

exports.uncheckWasThere = async (req, res) => {
   try {
      let event = await Event.findOneAndUpdate({ _id: req.body.event_id },
         { $pull: { users_was_there: req.body.user_id } }); // this returned "event" hasn't been updated from $pull

      let eventUpdated = await Event.findById({ _id: req.body.event_id });

      if (eventUpdated.users_was_there.includes(req.body.user_id)) {
         res.send('yes');
      } else {
         res.send('no');
         console.log('uncheck');
      }

   } catch (err) {
      console.error(err);
   }
}