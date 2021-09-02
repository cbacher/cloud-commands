#!/bin/bash

aws ec2 run-instances --image-id ami-048f6ed62451373d9 --count 1 --instance-type t2.micro --key-name CloudCmdKeyPair --security-group-ids sg-067a3e0ad40e039dc --subnet-id subnet-09b8c8b94b37b147a --associate-public-ip-address --user-data file://install-run-application.sh

