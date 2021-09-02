# ALB and AutoScaling with IaC AWS CDK

## What did you learn?
* For some deploys --required approval is needed to deploy the stack.
* Using the default "AMI" of new ec2.AmizonLinuxImage() had issues with running the User Data. Not sure why that was the case.
* Troubleshooting is difficult at best.
* Changing the security group and running a deploy made it appear it was "hung". I think CloudFormation was not stopping the current running instances (which were using the wrong security group) and was waiting for those resources to clear before changing to the new security group. I ended up going out and manually stopping all of the instances and the CloudFormation was able to finish successfully. The auto scaling group was able to recognize that no instance was running and fired up new ones with the proper security groups.
* Creating the ALB security group it appears that the 0.0.0.0/0 is added be default. I could not find a way to remove it other than logging into the console and manual removing it.

## Commands
Recieved the error:
```
"--required-approval" is enabled and stack includes security-sensitive updates....
```
Used the command switch require-approval to get around it.
```
cdk deploy --require-approval never
```


