var express = require('express');
var app =  express();
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('passport');
var session  = require('express-session');
const flash = require('express-flash');
let port = process.env.PORT || 3000 ;

var fs =require('fs');
var https = require('https');
const { KeyObject } = require('crypto');


app.get('/',function(req,res){
  if(req.protocol == 'http'){
    res.redirect('https://localhost:3000');
  }
});

require('./auth/passport')(passport);

require('./auth/g-oauth')(passport);

require('./auth/facebook')();

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

app.use(passport.initialize());
app.use(passport.session()); 


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json(true));
app.use(express.static('public'));

app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));

app.use(flash());


app.use('/', require('./routes/index'));
app.use('/views',require('./routes/user'));

app.listen(8000,function(){
    console.log('server running');
});


const key = fs.readFileSync('./sslkey/domain.key','utf-8');
const csr = fs.readFileSync('./sslkey/domain.crt','utf-8');

/*const server = https.createServer({key:key,cert:csr}, app).listen(port, function(){
  console.log('server listening on the port ' + port);
});*/