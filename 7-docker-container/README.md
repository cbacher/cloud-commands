# Docker Container (Using Console and CLI)
- Install Docker on your primary EC2 server
- Containerize your Spring Boot application
- Run the application within a container

## What did you learn?
- Installing Docker on an EC2 instance is pretty trivial, but not sure how useful on a single instance without Docker enterprise.
- Creating a Docker image with the spring boot application is trivial if all is self contained on the EC2 instance.

## Commands

### Install Docker on EC2 instance (from Stack Exchange)
```
# update yum
sudo yum update -y

# install docker
sudo yum install docker -y

# start docker
sudo service docker start

# modify ec2-user so sudo is not needed for docker
sudo usermod -a -G docker ec2-user
```

### Docker File
With the spring boot jar "db-demo.jar" in a directory called target and 
this Dockerfile in the root.
```
FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} db-demo.jar
ENTRYPOINT ["java","-jar","/db-demo.jar"]
```

### Build Docker Image
```
docker build -t cbacher/db-demo .
```

### Run docker Image
On the EC2 instance run the command and expose the 8080 port since my Target Group is forwarding to 8080.
```
docker run -p 8080:8080 cbacher/db-demo
```
