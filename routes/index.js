var express = require('express');
var router = express.Router();
var middleware = require('../auth/secure');

router.get('/',function(req,res){
    res.render('home');
});

router.get('/userhome', middleware(), function(req,res){
    console.log('coming to route');
    req.flash('info',req.session.passport.user);
    res.render('userhome');
});

module.exports =router;