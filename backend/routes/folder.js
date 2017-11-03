var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var nodemailer = require('nodemailer');
// var testFolder = './routes/';
var mkdirp = require('mkdirp');
var fs = require('fs');
router.post('/createFolder', function (req, res, next) {
    var reqfoldername = req.body.foldername;
    console.log('path is '+'/doc/'+reqfoldername);
    mkdirp('./doc/'+reqfoldername, function (err) {
        if (err) console.error(err)
        else console.log('create folder sucess!')
    });
});

router.get('/', function (req, res, next) {
    var response = "";
    // testFolder = req.param('dir');
    var path = "./doc/";
    console.log("list folders path:"+path);
    fs.readdir(path, function (err, files)
    {
        console.log(files.length);
        console.log(files);
        // for(var i=0;i<files.length;i++)
        // {
        //     response += files[i]+",";
        // }
        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.folder = file;
            return imgJSON;
        });
        console.log("resArr: "+resArr);
        res.status(200).send(resArr);
    });

});
router.post('/sharing', function (req, res, next) {
    var fromUser = req.body.fromUser;
    var fromPass = req.body.fromPassword;
    var toUser = req.body.toUser;
    var shareFile = req.body.shareFile;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromUser,
            pass: fromPass
        }
    });
    var mailOptions = {
        from: fromUser,
        to: toUser,
        subject: '',
        text: '',
        attachments: [
            {   // filename and content type is derived from path
                path: shareFile
            }
        ]
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(401).send();
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201).send();
        }
    });
});
router.post('/loadDirPage', function (req, res, next) {
    ejs.renderFile('./views/ListDir.ejs',function(err, result) {
        if (!err) {
            res.end(result);
        }
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
    //res.render("ListDir");
});

module.exports = router;