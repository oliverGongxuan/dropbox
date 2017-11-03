var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/admin";
function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('users');
        coll.findOne({username: msg.username, password: msg.password}, function(err, user){
            // console.log("user exists?? "+user.username+" equal? "+msg.username);
            console.log("user is ture?");
            console.log(user.username==msg.username && user.password==msg.password);
            if (user.username==msg.username && user.password==msg.password) {
                res.code="200";
                res.value = "success login";

            } else {
                res.code = "401";
                res.value = "Failed Login";
            }
            callback(null, res);
        });
    });
    // callback(null, res);
}

exports.handle_request = handle_request;