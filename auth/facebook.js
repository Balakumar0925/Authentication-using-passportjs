var FacebookStratergy = require('passport-facebook').Strategy;
let passport = require('passport');
var keys = require('./keys');
var user = require('../database/crud');


module.exports = function(){
    passport.use(new FacebookStratergy( {
        clientID:keys.facebook.ClientID,
        clientSecret:keys.facebook.ClientSecret,
        callbackURL:'https://loginusingpassport.herokuapp.com/views/facebook/user'
    },function(accessToken,refreshToken,profile,done){
        user.Register(profile);
        console.log(profile);
        return done(null, profile);
    }));

    passport.serializeUser(function(user,done){
        return done(null,user);
    });

    passport.deserializeUser(function(user,done){
        return done(null,user);
    });
};