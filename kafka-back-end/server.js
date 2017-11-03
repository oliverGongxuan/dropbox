var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var fileroutes = require('./services/fileroutes');

var topic_name = 'login_topic3';
var listfile_topic = 'listfile_topic1';
var consumer = connection.getConsumer(topic_name);
var listfile_consumer = connection.getConsumer(listfile_topic);
var producer = connection.getProducer();
var listfile_producer = connection.getProducer();
console.log('kafka server is running');
consumer.on('message', function (message) {
    console.log('login message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    if(data.data.type=='login'){
        login.handle_request(data.data, function(err,res){
            console.log('after handle login:'+res);
            console.log("login cod:"+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }else if(data.data.type=='listfile'){
        fileroutes.handle_request(data.data, function(err,res){
            console.log('after handle listfile:'+res);
            console.log("listfile cod:"+res.code);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }
});