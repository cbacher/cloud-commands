# IAM Role - User vs Service (Using Console)

- Continue from #5
- Create a new S3 bucket
- Add IAM policy so that no User can access it
- Assign an IAM role to your EC2 to just read from S3
- Verify that your EC2 can access S3

## What did you learn?

- I removed the public access through the console. 
- I added a policy for a new role and applied that policy to the EC2 instance.

### Policy
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
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::123-cfb-files/*"
            ]
        }
    ]
}
```