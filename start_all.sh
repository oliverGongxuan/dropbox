#! /bin/sh
zkserver start 
/usr/local/Cellar/kafka/0.11.0.1/bin/kafka-server-start /usr/local/etc/kafka/server.properties 
sudo /usr/local/Cellar/mongodb/3.4.9/bin/mongod 
cd ./nodelogin/
npm start
cd ../reactlogin/
npm start
