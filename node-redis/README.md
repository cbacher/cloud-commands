# Deploy Scrumblr

## Manual Deployment
1. Launch EC2 instance in public subnet using wizard
   * "Subnet" - subnet public
   * "Auto-assign Public Ip" - enable
   * "Create security group"
     * SSH / My Ip
     * HTTP 80 / My Ip
     * Custom 8080 / My Ip
   * Create Key Pair - **download and don't lose and don't put in github**
1. SSH to EC2 instance and Install scrumblr pre-requisites
   * Install git: ``sudo yum install git``
   * Install redis: ``sudo amazon-linux-extras install redis6``
   * Install Node.js: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
   * ~~Install NPM: (installed with node.js not sure why separate).~~
1. Install scrumblr
   * Clone Scrumblr: ``git clone https://github.com/aliasaria/scrumblr.git``
   * ``cd scrumblr``
   * ``npm install``
   * Start Redis in the background: ``redis-server --daemonize yes``
   * Start Node to test everything comes up: ``node server.js``
1. Test out public dns:
   * Using the public DNS for the EC2 instance (from the console) (e.g. http://ec2-54-227-109-74.compute-1.amazonaws.com:8080)
1. Allow node to run on 80
   * Find new installation: ``whereis node``
   * Create a symbolic link as root: ``sudo ln -s /home/ec2-user/.nvm/versions/node/v16.5.0/bin/node /usr/bin/node``
   * Start node on 80 (have to sudo to use port 80) ``sudo node server.js --server:port=80 &``
1. Test out public DNS on 80
   * Using the public DNS for the EC2 instance (from the console) (e.g. http://ec2-54-227-109-74.compute-1.amazonaws.com/)

## CloudFormation
The CloudFormation template "scrumblr.yaml" automates the items above.

