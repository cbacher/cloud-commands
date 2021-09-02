import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import {AmazonLinuxEdition, AmazonLinuxGeneration, AmazonLinuxStorage, AmazonLinuxVirt} from '@aws-cdk/aws-ec2';
import * as path from "path";
import {readFileSync} from "fs";

export class CdkEc2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpcId = 'vpc-01adb3d08c7751eae';
    // looking up by subnet id cause cdk synth to complain about not having the AZ. Also, there was a warning
    // for routetable id from the lookup too.
    const subnetId = 'subnet-0a5428b0215c25db5';
    const subnetAz = 'us-east-1a';
    const routeTableId = 'rtb-069a8baed8837e1f3';

    const securityGroupId = 'sg-093e5b865f4d42e1e';
    const ec2S3ReadWriteRoleArn = 'arn:aws:iam::475420082780:role/ec2-read-write';
    const userDataFileName = 'install-run-application.sh';
    const keyName = 'CloudCmdKeyPair';

    // find vpc
    const existingVpc = ec2.Vpc.fromLookup(this, 'ImportVPC', {
      isDefault: false,
      vpcId: vpcId
    });

    // find subnet
    const existingSubnet = ec2.Subnet.fromSubnetAttributes(this, 'ImportSubNet', {
      subnetId: subnetId,
      routeTableId: routeTableId,
      availabilityZone: subnetAz
    });

    // find security group
    const existingSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, 'SecurityGroup', securityGroupId);

    // create ec2
    const amzLinux = ec2.MachineImage.latestAmazonLinux({
      generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
      edition: AmazonLinuxEdition.STANDARD,
      virtualization: AmazonLinuxVirt.HVM,
      storage: AmazonLinuxStorage.GENERAL_PURPOSE
    });

    const t3Nano = new ec2.InstanceType('t3.nano');

    // get role that allows read/write from the s3 bucket
    const s3ReadWriteRole = iam.Role.fromRoleArn(this, 's3ReadWriteRole', ec2S3ReadWriteRoleArn, {
      mutable: false
    });

    // instance
    const instance = new ec2.Instance(this, 'SpringBootInstance', {
      instanceType: t3Nano,
      vpc: existingVpc,
      role: s3ReadWriteRole,
      machineImage: amzLinux,
      securityGroup: existingSecurityGroup,
      keyName: keyName,
      vpcSubnets: {
        availabilityZones: [subnetAz],
        subnets: [existingSubnet]
      }
    });

    // read the file out and add to the instance
    const userDataScript = readFileSync('./lib/' + userDataFileName, 'utf8');
    instance.addUserData(userDataScript);
  }
}
