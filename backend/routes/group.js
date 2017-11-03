var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/admin";
require('./passport')(passport);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with folder1 resource');
});

router.post('/createGroup', function (req, res, next) {
    var reqGroupName = req.body.groupName;
    MongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        db.createCollection(reqGroupName, function(err) {
            if (err) throw err;
            console.log("Collection showed!");
            db.close();
            return res.status(201).send();
        });
    });
});


router.post('/addMember', function (req, res, next) {
    var reqUsername = req.body.memberId;
    var reqGroupName = req.body.groupName;
    const data = req.body;
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection(reqGroupName);

        coll.insert({
            memberId: data.memberId
        }, function(err, user){
            if(err){
                throw err;
            }
            console.log("member data saved");
            return res.status(201).send();
        });

    });

});


router.post('/showMember', function (req, res, next) {

    var reqGroupName = req.body.groupName;
    // const data = req.body;
    // mongo.connect(mongoURL, function(){
    //     console.log('Connected to mongo at: ' + mongoURL);
    //     var coll = mongo.collection(reqGroupName+"");
    //     var resArr = coll.find();
    //     res.send(resArr);
    //
    // });
    mongo.connect(mongoURL, function() {
        // var coll = mongo.collection('' + reqGroupName);
        var coll = mongo.collection("group1");
        coll.find({}).toArray(function(err, documents) {
            if (err) throw err;
            console.log(documents);
            res.send(documents);
        });
    });
});

router.post('/deleteMember', function (req, res, next) {
    var reqUsername = req.body.memberId;
    var reqGroupName = req.body.groupName;
    const data = req.body;
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection(reqGroupName);

        coll.remove({
            memberId: reqUsername
        });
        return res.status(201).send();
    });
});

router.post('/deleteGroup', function (req, res, next) {

    var reqGroupName = req.body.groupName;
    MongoClient.connect(mongoURL, function(err, db) {
        if (err) throw err;
        db.collection(reqGroupName+"").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) {
                console.log("Collection deleted");
                db.close();
                return res.status(201).send();
            }else{
                db.close();
            }

        });
    });
});
module.exports = router;