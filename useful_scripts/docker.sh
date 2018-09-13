#!/bin/bash

echo "-------------------------------"
echo "  > listing containers"
sudo docker ps -a

echo "-------------------------------"
echo "  > stopping containers"
sudo docker stop solr-aef
sudo docker stop mongodb-aef
sudo docker stop rabbitmq-aef

echo "-------------------------------"
echo "  > removing containers"
sudo docker rm solr-aef
sudo docker rm mongodb-aef
sudo docker rm rabbitmq-aef

echo "-------------------------------"
echo "  > creating containers"
sudo docker run --name solr-aef -t -p 8983:8983 -d solr:5.5
sudo docker run --name mongodb-aef -t -p 27017:27017 -d mongo:3.0
sudo docker run --name rabbitmq-aef -t -p 5672:5672 -p 15672:15672 -d rabbitmq:3.6

echo "-------------------------------"
echo "  > configuring solr-aef"
sleep 1
sudo docker exec solr-aef solr create -c sief
sudo docker exec solr-aef solr create -c sief-test
sudo docker cp sief-back/misc/schema.xml solr-aef:/opt/solr/server/solr/sief/conf/managed-schema
sudo docker cp sief-back/misc/solrconfig.xml solr-aef:/opt/solr/server/solr/sief/conf/solrconfig.xml
sudo docker cp sief-back/misc/schema.xml solr-aef:/opt/solr/server/solr/sief-test/conf/managed-schema
sudo docker cp sief-back/misc/solrconfig.xml solr-aef:/opt/solr/server/solr/sief-test/conf/solrconfig.xml
sudo docker restart solr-aef

echo "-------------------------------"
echo "  > configuring rabbitmq-aef"
sudo docker cp sief-back/env_setup/rabbitmq.config rabbitmq-aef:/etc/rabbitmq/rabbitmq.config
sudo docker exec rabbitmq-aef rabbitmq-plugins enable rabbitmq_management
sudo docker exec rabbitmq-aef rabbitmqctl add_vhost sief
sudo docker exec rabbitmq-aef rabbitmqctl add_user sief sief
sudo docker exec rabbitmq-aef rabbitmqctl set_user_tags sief management
sudo docker exec rabbitmq-aef rabbitmqctl set_permissions -p sief sief ".*" ".*" ".*"
sudo docker exec rabbitmq-aef rabbitmqctl add_vhost sief-test
sudo docker exec rabbitmq-aef rabbitmqctl set_permissions -p sief-test guest ".*" ".*" ".*"
sudo docker restart rabbitmq-aef
