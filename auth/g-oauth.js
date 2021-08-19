//var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('./keys');
var user = require('../database/crud');

module.exports = function(passport) {
    console.log('using passport');
    passport.use(new GoogleStrategy({
        callbackURL: 'https://loginusingpassport.herokuapp.com/views/google/user',
        clientID: keys.google.ClientID,
        clientSecret: keys.google.ClientSecret
   }, function(accessToken,refreshToken,profile,done){
       console.log('coming here');
       console.log(profile);
        user.Register(profile);
      /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
           return done(null, user);
       });*/
       //console.log('hi from google oauth');
      // console.log(profile);
       return done(null, profile);
   })
   );
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
}