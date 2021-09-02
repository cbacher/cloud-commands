# ALB and AutoScaling (~~Using Console~~)

- Review the Load Balancer Services.
- Understand how they work.
- Create an ALB that will route traffic to your application in POC #4
- Setup EC2 Auto Scaling Group and Health Checks for your Load Balancer.
- Verify that you can spin up Three EC2 servers adn they are routable.
- Kill a Server and confirm that a new server is provisioned.

## What did you learn?
- Added Spring Boot actuator starter to expose the health endpoint for the alb (e.g. actuator/health)
- https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html
- Took several minutes for the Target group to accept that the instance was healthy.
- AutoScaling is not instantaneous it can take several minutes for it to recognize unhealthy instances.
- Creating an AutoScaling group from the Launch Configurations automatically creates a launch template for the AutoScaling group to use.
- If you need to change the User Data of the Launch Configurations, you need to create a new Launch Configuration and Auto Scaling group, then delete the others.
- Make sure that the User Data, if using bash has the #!/bin/bash at the beginning.

## Commands

### User data for the Launch Configuration
```
#!/bin/bash

# update yum
sudo yum update -y
# install java
sudo amazon-linux-extras install java-openjdk11

# get teh spring boot app from s3
aws s3 cp s3://123-cfb-files/db-demo.jar db-demo.jar

#start the app
java -jar db-demo.jar &
```
