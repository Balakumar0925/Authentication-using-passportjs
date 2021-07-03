var express = require('express');
var passport = require('passport');
var router = express.Router();


var db = require('../database/crud');


router.get('/login',function(req,res){
    res.render('login');
});

router.get('/register',function(req,res){
    res.render('register');
});

router.post('/register',function(req,res){

    var Reg = new RegExp(/[a-z0-9]\w+@[a-z]\w+.[a-z]\w.+/);
    
    let user = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber:req.body.phoneNumber,
        password:req.body.password
    };

    var emailvalidated = Reg.test(user.email);

    db.findByUsername(user).then(function(data){
        if(data == null){
            if(emailvalidated == true){
                db.Register(user).then(function(value){
                    res.render('register');
                }).catch(function(err){
                    req.flash('info', 'Unable to create on the system');
                    res.render('register');
            });
          }
            else {
                req.flash('info','Invalied email address');
            res.render('register');
            }

        }
        else {
            req.flash('info','user already exit in system');
            res.render('register');
        }
    }).catch(function(err){
        console.log(err);
    });
});

router.post('/login',function(req, res, next){
    console.log('login route');
    passport.authenticate( 'local', {
        successRedirect:'/userhome',
        failureRedirect:'/views/login',
        failureFlash:true
    },console.log('passport'))(req, res, next);
});

router.get('/logout',  (req, res) => {
    req.logout();
    //req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });



module.exports = router;