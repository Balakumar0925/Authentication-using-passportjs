var express = require('express');
var app =  express();
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('passport');
var session  = require('express-session');
const flash = require('express-flash');

require('./auth/passport')(passport);

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