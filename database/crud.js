var mongodb = require('mongodb');
var url = "mongodb://localhost:27017/";
//var url = "mongodb+srv://balakumar12:balakumar12@cluster1.tpblc.mongodb.net/Login?retryWrites=true&w=majority";

module.exports = {
    Register(data){
        console.log('calling reg')
        return new Promise(function(resolve,reject){
            mongodb.connect(url,function(err,connection){
                if(err){
                    reject(err);
                }
                var mongoclient = connection.db('login');
                var collection = mongoclient.collection('users');
                collection.insertOne(data).then(function(data){
                    console.log(data.insertedId);
                    resolve(data.insertedId);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                });
            });
        });
    },

    findByUsername(user){
        return new Promise (function(resolve,reject){
            mongodb.connect(url,function(err,connection){
                if(err){
                    reject(err);
                    console.log(err);
                }
                var mongoClient = connection.db('login');
                var collection = mongoClient.collection('users');
                collection.findOne({ $or : [{phoneNumber:user},{email:user}]}).then(function(userData){
                    resolve(userData);
                
                }).catch(function(err){
                    console.log(err);
                });
            });
        });
        
        
    },

    findById(id) {
        console.log('r we in findbyid');
        return new Promise (function(resolve,reject){
            mongodb.connect(url,function(err,connection){
                if(err){
                    reject(err);
                    console.log(err);
                }
                var mongoClient = connection.db('login');
                var collection = mongoClient.collection('users');
                console.log(id);
                collection.findOne({_id:id}).then(function(userData){
                    console.log('doc',userData);
                    resolve(doc);
                
                }).catch(function(err){
                    console.log('do we got err');
                    console.log(err);
                });
            });
        });
        

    }
 
}