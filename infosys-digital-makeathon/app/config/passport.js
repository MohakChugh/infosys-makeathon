var LocalStrategy       = require('passport-local').Strategy;
var TwitterStrategy     = require('passport-twitter').Strategy;
var authConfig          = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {
        return cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        return cb(null, obj);
    });

    // REGISTRAZIONE CON E-MAIL
    passport.use(

        'local-signup', 
        
        new LocalStrategy(
            
            {
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true 
            },

            function(req, email, password, done) {

                process.nextTick(function() {

                    User.findOne({ 'email' :  email }, function(err, user) {
                        
                        if (err) return done(err);

                        if (user) {

                            return done(null, false, req.flash('signinMessage', 'Utente già esistente.'));

                        } else {

                            var newUser             = new User();
                            newUser.fullName        = req.body.name || '';
                            newUser.email           = email;
                            newUser.local.password  = newUser.generateHash(password);
                            
                            newUser.save(function(err) {
                                if (err) throw err;
                                return done(null, newUser);
                            });
                        }

                    });    

                });
            }
        )
    );

    // LOGIN CON E-MAIL
    passport.use(

        'local-login',

        new LocalStrategy(
            {
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true 
            },
            function(req, email, password, done) { 

                User.findOne({ 'email' :  email }, function(err, user) {

                    if (err) return done(err);

                    if (!user) {
                        return done(null, false, req.flash('signinMessage', 'Questo utente non esiste.')); 
                    }

                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('signinMessage', 'Oops! La password non è corretta.')); 
                    }

                    return done(null, user);
                });

            }
        )
    );

    // TWITTER
    passport.use(
        new TwitterStrategy({
            consumerKey     : authConfig.twitterAuth.consumerKey,
            consumerSecret  : authConfig.twitterAuth.consumerSecret,
            callbackURL     : "/oauth/twitter/callback"
        },
        function(token, tokenSecret, profile, cb) {
            var user = {
                _id: profile.id,
                username: profile.username
            };
            return cb(null, user);
            // ------- Store profile in DB Code Template ---------
            // process.nextTick(function() {

            //     User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

            //         if (err) return done(err);

            //         if (user) {
            //             return done(null, user); 
            //         } else {
                        
            //             var newUser = new User();
            //             newUser.twitter.id = profile.id;
            //             newUser.twitter.token = token;
            //             newUser.twitter.username = profile.username;
            //             newUser.twitter.displayName = profile.displayName;

            //             newUser.save(function(err) {
            //                 if (err) throw err;
            //                 return done(null, newUser);
            //             });
            //         }
            //     });

            // });
        })
    );

};