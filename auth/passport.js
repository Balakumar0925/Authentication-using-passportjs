var LocalStrategy = require('passport-local').Strategy;
var db = require('../database/crud');

module.exports = function(passport){
    console.log('comeing passport');

    passport.use(new LocalStrategy({usernameField:'email'}, function(phoneNumber,password,done){
        console.log('hii', phoneNumber);
        console.log('from passport2');
       db.findByUsername(phoneNumber).then(function(user){
           console.log(user);
           if(!user){
               return done(null,false,'user not  found');

           }
           else if(password !== user.password){
            console.log("from passport telling no user");
               return done(null,false,'password is not matching');
           }
           else{
            console.log('from passport saying user do exist');
               return done(null,user);
           }
       }).catch(function(err){
           console.log(err);
       });
    })
    );


    passport.serializeUser(function(user,done){
       return done(null,user);
    });

    passport.deserializeUser(function(user,done){
        db.findByUsername(user.phoneNumber).then(function(user){
            return done(null,user);
        });
    });
};
