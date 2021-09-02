# EC2 and App Deployment

- Create a Spring Boot "Hello World" application.
- Provision an EC2 instance (make sure it is in Public subnet)
- Deploy the application to EC2- Expose the application to EC2
- Manually destroy your services

## What did you learn?

- Create an S3 bucket to upload the spring boot application.
- The spring boot application in S3 needs to be public for the instance to call wget.
- Launch and instance and execute a yum install for the jdk 11, copy from s3 and start application.
- Point aws ec2 launch-instances command to a file that contains user data to download jdk 11, copy application from s3 and start it on port 80.

## Commands

### Create S3 Bucket
```
aws s3 mb s3://123-cfb-files 
```

### Copy file from local to the bucket
```
aws s3 cp demo.jar s3://123-cfb-files 
```

### Yum commands to run on EC2 startup (install-run-application.sh)
```
# update yum
sudo yum update -y
# install java
sudo amazon-linux-extras install java-openjdk11

# get teh spring boot app from s3
wget https://123-cbacher-files.s3.amazonaws.com/demo.jar

#start the app
java -jar demo.jar --server.port=80
```

### Describe subnets to find a public subnet id
```
aws ec2 describe-subnets --filters Name='vpc-id',Values='vpc-01adb3d08c7751eae'
```

### Start EC2 with user data
```
aws ec2 run-instances --image-id ami-048f6ed62451373d9 --count 1 --instance-type t2.micro --key-name CloudCmdKeyPair --security-group-ids sg-067a3e0ad40e039dc --subnet-id subnet-09b8c8b94b37b147a --associate-public-ip-address --user-data file://install-run-application.sh
```