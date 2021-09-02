#!/bin/bash
# writes output for user data execution to a viewable log file
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
# update yum
sudo yum update -y

# install java
sudo amazon-linux-extras install java-openjdk11

# get the spring boot app from s3
aws s3 cp s3://123-cfb-files/db-demo.jar ~/db-demo.jar

#start the app
java -jar  ~/db-demo.jar
