var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/admin";
var kafka = require('./kafka/client');
module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username   , password, done) {
        // try {
        //     mongo.connect(mongoURL, function(){
        //         console.log('Connected to mongo at: ' + mongoURL);
        //         var coll = mongo.collection('users');
        //
        //         coll.findOne({username: username, password:password}, function(err, user){
        //             console.log("user is ture?");
        //             console.log(user==true);
        //             if (user) {
        //                 done(null, {username: username, password: password});
        //
        //             } else {
        //                 done(null, false);
        //             }
        //         });
        //     });
        // }
        // catch (e){
        //     done(e,{});
        // }
        kafka.make_request('login_topic3',{"type":"login","username":username,"password":password}, function(err,results){
            console.log('in passport result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    done(null,{username:username,password:username});
                }
                else {
                    done(null,false);
                }
            }
        });
    }
    ));
};

