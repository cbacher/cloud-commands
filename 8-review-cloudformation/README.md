# Review Cloudformation and AWS CLI (Using IaC)
- Provision an EC2 server using Cloudformation
- Destroy your stack

## What did you learn?
- I utilized a YouTube video on provisioning an EC2 service using a cloudformation stack template https://www.youtube.com/watch?v=cxW9s8PjEvA.
- Found that we can parameterize the values and add default values if needed.
- Creating the stack was much easier that I expected.

## Commands
```
aws cloudformation create-stack --stack-name demo-spring-boot-server --template-body file://basic-amazon-ec2-instance-ssm.yaml --parameters ParameterKey=InstanceType,ParameterValue=t2.micro ParameterKey=KeyName,ParameterValue=CloudCmdKeyPair ParameterKey=SubnetId1,ParameterValue=subnet-0a5428b0215c25db5 ParameterKey=VpcId,ParameterValue=vpc-01adb3d08c7751eae --tags Key=Name,Value="WebServer" --capabilities CAPABILITY_IAM
```