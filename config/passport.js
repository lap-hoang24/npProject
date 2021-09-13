const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const brcyptjs = require('bcryptjs');



module.exports = (passport) => {
    // Local Strategy

    passport.use('local',
        new LocalStrategy(function (username, password, done) {
            // Match username 
            let query = { username: username };

            User.findOne(query, function (err, user) {
                if (err) { return done(err) }

                if (!user) { return done(null, false, { message: 'Invalid username or password' }); }

                brcyptjs.compare(password, user.password, function (err, isMatch) {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else { return done(null, false, { message: 'Invalid username or password' }); }
                })

            })

            passport.serializeUser(function (user, done) {
                done(null, user.id);
            });

            passport.deserializeUser(function (id, done) {
                User.findById(id, function (err, user) {
                    done(err, user);
                });
            });
        }))
}

