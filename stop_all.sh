#! /bin/sh
zkserver stop &
/usr/local/Cellar/kafka/0.11.0.1/bin/kafka-server-stop &
mongod --shutdown
