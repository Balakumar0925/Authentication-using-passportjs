var FacebookStratergy = require('passport-facebook').Strategy;
let passport = require('passport');

module.exports = function(){
    passport.use(new FacebookStratergy( {
        clientID:'3080703598824162',
        clientSecret:'282ae3738fc4c7b432208884e7d93767',
        callbackURL:'https://localhost:3000/views/facebook/user'
    },function(accessToken,refreshToken,profile,done){
       
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