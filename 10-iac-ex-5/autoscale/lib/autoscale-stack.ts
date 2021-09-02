import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as iam from '@aws-cdk/aws-iam'
import {readFileSync} from "fs";
import {AmazonLinuxEdition, AmazonLinuxGeneration, AmazonLinuxStorage, AmazonLinuxVirt} from "@aws-cdk/aws-ec2";

export class AutoscaleStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpcTags = {
            'Name': 'aws-controltower-VPC'
        };
        const userDataFileName = 'install-run-application.sh';
        const securityGroupId = 'sg-093e5b865f4d42e1e';
        const sshKeyName = 'CloudCmdKeyPair';
        const ec2S3ReadWriteRoleArn = 'arn:aws:iam::475420082780:role/ec2-read-write';

        // find vpc
        const existingVpc = ec2.Vpc.fromLookup(this, 'ExistingVPC', {
            isDefault: false,
            tags: vpcTags
        });

        // get role that allows read/write from the s3 bucket
        const s3ReadWriteRole = iam.Role.fromRoleArn(this, 's3ReadWriteRole', ec2S3ReadWriteRoleArn, {
            mutable: false
        });

        const securityGroup = ec2.SecurityGroup.fromLookup(this, 'SecurityGroupSpringBoot', securityGroupId);

        // create ec2
        const amzLinux = ec2.MachineImage.latestAmazonLinux({
            generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
            edition: AmazonLinuxEdition.STANDARD,
            virtualization: AmazonLinuxVirt.HVM,
            storage: AmazonLinuxStorage.GENERAL_PURPOSE
        });

        // read the file out to add the contents to the configuration
        const userDataScript = readFileSync('./lib/' + userDataFileName, 'utf8');
        const userData = ec2.UserData.custom(userDataScript);

        const autoScalingGroup = new autoscaling.AutoScalingGroup(this, 'ASGSpringBoot', {
            vpc: existingVpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
            machineImage: amzLinux,
            userData: userData,
            minCapacity: 3,
            maxCapacity: 5,
            keyName: sshKeyName,
            role: s3ReadWriteRole,
            securityGroup: securityGroup
        });

        const albSecurityGroup = new ec2.SecurityGroup(this, 'AlbSecurityGroup', {
            vpc: existingVpc
        });
        // TODO: why is it still adding everyone for 80?
        albSecurityGroup.addIngressRule(ec2.Peer.ipv4('3.83.200.219/32'), ec2.Port.tcp(80))

       const loadBalancer = new elbv2.ApplicationLoadBalancer(this, 'ALBSpringBoot', {
            vpc: existingVpc,
            internetFacing: true,
            securityGroup: albSecurityGroup
        });

        const listener = loadBalancer.addListener('ListenerSpringBoot', {
            port: 80
        });

        listener.addTargets('TargetSpringBoot', {
            port: 8080,
            targets: [autoScalingGroup],
            healthCheck: {
                path: "/actuator/health"
            }
        });

        listener.connections.addSecurityGroup(securityGroup);

    }
}
