var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var kafka = require('./kafka/client');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

var upload = multer({storage:storage});

/* GET users listing. */
router.get('/', function (req, res, next) {
    // var resArr = [];
    // glob("public/uploads/*.jpeg", function (er, files) {
    //     var resArr = files.map(function (file) {
    //         var imgJSON = {};
    //         imgJSON.img = 'uploads/'+file.split('/')[2];
    //         imgJSON.cols = 2  ;
    //         return imgJSON;
    //     });
    //     // console.log(resArr);
    //     res.status(200).send(resArr);
    // });
    kafka.make_request('login_topic3',{"type":"listfile"}, function(err,results){
        console.log('in fileroutes.js result');
        console.log(results);
        if(err){
            res.status(400).send("err");
        }
        else
        {
            res.status(200).send(results);
        }
    });
});

router.post('/upload', upload.single('mypic'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    res.status(204).end();
});
module.exports = router;
