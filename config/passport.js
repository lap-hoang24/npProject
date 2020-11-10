const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const brcyptjs = require('bcryptjs');


module.exports = (passport) => {
    // Local Strategy

    passport.use(new LocalStrategy(function (username, password, done) {
        // Match username 

        let query = { username: username };

        User.findOne(query, function (err, user) {
            // check for error
            if (err) { return done(err) }

            // if there's no user found
            if (!user) {
                return done(null, false, { message: 'No user found' });
            }
            // if there's a user, perform match password
            brcyptjs.compare(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Wrong password' });
                }
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


    // passport.use(new JWTStrategy({
    //     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //     secretOrKey   : process.env.ACCESS_TOKEN_SECRET
    // },

    // function (jwtPayload, done) {
    
    //     //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    //     return User.findOneById(jwtPayload.id)
    //         .then(user => {
    //             return done(null, user);
    //         })
    //         .catch(err => {
    //             return done(err);
    //         });
    // }
    // ));
}

