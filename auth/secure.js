module.exports = function(){
    return function(req,res,next){
        if(req.isAuthenticated()){
            console.log('passing from middleware');
            next();
        }
        else{
            res.render('login');
        }
    }
}