var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/admin";
require('./passport')(passport);

var users = [
    {
        username: "mike",
        password: "mike"
    },
    {
        username: "tom",
        password: "tom"
    },
    {
        username: "john",
        password: "john"
    },
    {
        username: "mac",
        password: "mac"
    }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with folder1 resource');
});

router.post('/doLogin', function (req, res, next) {
    passport.authenticate('login', function(err, user) {
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        req.session.user = user.username;
        console.log(req.session.user);
        console.log("session initilized");
        return res.status(201).send();
    })(req, res);
});


router.post('/doSignup', function (req, res, next) {
    // var reqLastname = req.body.lastname;
    // var reqPassword = req.body.password;
    // var reqEmail = req.body.email;
    // var reqFirstname = req.body.firstname;
    const data = req.body;
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('users');

        coll.insert({
            username: data.lastname,
            firstname:data.firstname,
            password:data.password,
            email:data.email
        }, function(err, user){
            if(err){
                throw err;
            }
            console.log("user data saved");
        });

    });

});

router.post('/doLogout', function (req, res) {
    console.log("Logout User:"+req.session.user);
    req.session.destroy();
    console.log('Session destroyed');
    res.status(201).json({message: "Logout successful"});
});

router.post('/uploadAccount', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;

    var getUser="select * from users where lastname='"+reqUsername+"' and password='" + reqPassword +"'";
    console.log("Query is:"+getUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                console.log("valid Login");
                req.session.username = reqUsername;
                console.log("Session initialized");
                res.status(201).json({message: "Login successful"});
            }
            else {
                console.log("Invalid Login");
                res.status(401).json({message: "Login failed"});
            }
        }
    },getUser);
});

module.exports = router;
