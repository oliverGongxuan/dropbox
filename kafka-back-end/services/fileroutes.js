var glob = require('glob');
function handle_request(msg, callback){
    console.log("In handle list file request:"+ JSON.stringify(msg));

    var resArr = [];
    glob("public/uploads/*.jpeg", function (er, files) {
        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.img = 'uploads/'+file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });
        console.log(resArr);
        // res.status(200).send(resArr);
        callback(null, resArr);
    });

}

exports.handle_request = handle_request;