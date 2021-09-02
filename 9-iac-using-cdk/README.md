# IaC (Using CDK)
- Provision an EC2 server using Cloudformation
- Destroy your stack

## What did you learn?
- I started with the cdkworkshop project using python. I was frustrated with my lack of knowledge on configuring IntelliJ for python that I decided to switch gears to TypeScript.
- When building the cdk scafolding I used the "cdk init app --language typescript" command. This tripped me up a little because I thought "app" in the command could be any app name. But that is not true.
- While coding through the stack, I utilized 'cdk synth' as a means of validating my syntax.
- I utilized vpc lookups in order to find existing resources (vpc, security group and subnet) based on their ids. Because of this, the cdk required access to Account and Region. Luckily when the scafolding is created there is a line in the app creation that can be uncommented out for this exact reason.
- When doing the lookup for the subnet by subnetId only, the 'cdk synth' failed because the AZ of the subnet is also required. In addition, a warning appeared stating that the route table id could be null. Both values are on the subnet, so I was surprised that these 2 pieces of information was required or a problem.
- I found an example of populating the user data from a file in s3. I decided to use that to populate the user data from a local file. That was the wrong approach, however when I made changes to the user data, it showed up in the 'cdk synch', but when deployed the previous "wrong" user data was used. I'm not 100% sure that was the case, but it seemed to happen more than once. I had to instead destroy and deploy the stack as new.
- Adding the User Data Command to EC2 prepends "#!/bin/bash" to the commands listed in the file.
- From Rijavan; adding the line below will output the execution of the User Data to 'var/log/user-data.log' file. This will help troubleshoot any startup issues.
```
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
```

## Commands
### Read user data file and put it into the ec2 instance.
```
    // read the file out and add to the instance
    const userDataScript = readFileSync('./lib/' + userDataFileName, 'utf8');
    instance.addUserData(userDataScript);
```
### Role lookup by ARN
```
    // get role that allows read/write from the s3 bucket
    const s3ReadWriteRole = iam.Role.fromRoleArn(this, 's3ReadWriteRole', ec2S3ReadWriteRoleArn, {
      mutable: false
    });
```
### Subnet lookup by attributes (NOTE: look up by id caused errors around AZs during 'cdk synth')
```
    const existingSubnet = ec2.Subnet.fromSubnetAttributes(this, 'ImportSubNet', {
      subnetId: subnetId,
      routeTableId: routeTableId,
      availabilityZone: subnetAz
    });
```
### VPC lookup by id (NOTE: AWS recomends looking up by tag rather than ids because it will make the code more flexible)
```
    // find vpc
    const existingVpc = ec2.Vpc.fromLookup(this, 'ImportVPC', {
      isDefault: false,
      vpcId: vpcId
    });
```

