# Accessing Database (Using Console)

- Update your Spring Boot application to use Spring Data
- Create a new RDS (Not Aurora) PostgreSQL database and an User Table (must be private subnet)
- Review the RDS Database Configurations
- Update your application to access the database and expose CRUD Rest APIs for the user table.
- Deploy the application to EC2
- Expose the application so that it can be accessed
- Manually destroy your services

## What did you learn?

- During RDS creation, created a subnet group in multiple AZs and a Security Group to allow port 5432 in.
- Built demo app with database connection information and placed the jar in s3, gave the instance permission to pull from s3 and used the aws-cli to do it (policy below).
- PostgreSQL allows you to create a User table, but it must be quoted (e.g. "User") however, hibernate does not quote the table name. 
- I treated the web server as a bastion host as well. I should have set up a separate instance as the bastion for security reasons. I also installed postgres client on it and used it to tunnel database connections over ssh for pgadmin. 
- Have to make sure that the webserver is started in the backgroup otherwise, it'll die when you log off.
- The security group for the web server allowed 80, 8080 and ssh from only my aws workspace.

## Commands

### Create S3 Bucket
```
aws s3 mb s3://123-cfb-files 
```

### Copy file from local to the bucket
```
aws s3 cp db-demo.jar s3://123-cfb-files 
```

### Yum commands run on ec2 bastion
```
# update yum
sudo yum update -y

# install postgresql client for administration
sudo amazon-linux-extras install postgresql10

# install java
sudo amazon-linux-extras install java-openjdk11

```

### Created a role 'ec2-read-write' with attached policy
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::123-cfb-files"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::123-cfb-files/*"
            ]
        }
    ]
}
```

### Command to copy spring boot app
```
aws s3 cp s3://123-cfb-files/db-demo.jar db-demo.jar 
```

### Start spring boot on web server
```
#start the app
sudo java -jar db-demo.jar --server.port=80 & 
```