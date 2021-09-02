#!/bin/bash
# writes output for user data execution to a viewable log file
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# update yum
sudo yum update -y
# install java
sudo amazon-linux-extras install java-openjdk11

# get teh spring boot app from s3
wget https://123-cbacher-files.s3.amazonaws.com/demo.jar

#start the app
java -jar demo.jar --server.port=80
