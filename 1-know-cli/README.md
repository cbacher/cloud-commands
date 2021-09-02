# Get to know the CLI

- Using the AWS CLI perform some commands in S3
- Store a file in S3
- Read the file
- Create an EC2 instance
- Perform some linux commands on the instance
- Destroy your EC2 instance

## What did you learn?

- The aws cli documentation is located here: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/
- S3 allows for inclusion and exclusion for files uploads.
- Can perform, list, move, copy, sync etc not only between local and S3 but also between S3 buckets.

- Need to create a Security Group that allows SSH and Key Pairs before creating the EC2 instance.
- The subnet needs to be public in order for it to be exposed.
- Key Pairs can be reused.

## Commands

### Create S3 Bucket
```
aws s3 mb s3://123-cfb-files 
```

### List Buckets
```
aws s3 ls s3://123-cfb-files 
```

### Copy file from local to the bucket
```
aws s3 cp myfile.txt s3://123-cfb-files 
```

### Pipe data to a file in a bucket
```
echo "Hello there" | aws s3 cp - s3://123-cfb-files/hello.txt
```

### Copy file from bucket with same name
```
aws s3 cp s3://123-cfb-files/hello.txt - 
aws s3 cp s3://123-cfb-files/myfile.txt - 
```

### Create a security group in a specified vpc
```
aws ec2 create-security-group --vpc-id vpc-01adb3d08c7751eae --group-name cloud-cmd-sg --description 'My security group'
```

### Create a keypair
```
aws ec2 create-key-pair --key-name CloudCmdKeyPair --query 'KeyMaterial' --output text > CloudCmdKeyPair.pem
```

### Describe a subnet(s) to get the ids
```
aws ec2 describe-subnets --filters Name='vpc-id',Values='vpc-01adb3d08c7751eae'
```

### Create an EC2 instance
```
aws ec2 run-instances --image-id ami-048f6ed62451373d9 --count 1 --instance-type t2.micro --key-name CloudCmdKeyPair --security-group-ids sg-067a3e0ad40e039dc --subnet-id subnet-09b8c8b94b37b147a --associate-public-ip-address
```