# Static HTML Website (~~Using Console~~)

- Create a static HTML Website, store in s3 and access it using provided URL.

## What did you learn?

- Used the s3 and s3api cli commands to create the bucket and put the files. I was able to make the bucket public through the cli. I couldn't, in the short amount of time figure out how to use the cli to make the file public, so I ended up doing so through the Console.
- Used the url https://<bucket-name>.s3.amazonaws.com/<html-file> to access the bucket.

## Commands

### Create S3 Bucket
```
aws s3 mb s3://123-cfb-files 
```

### Copy file from local to the bucket
```
aws s3 cp hello.html s3://123-cfb-files 
```

### Access file as webpage
```
curl https://123-cfb-files.s3.amazonaws.com/hello.html
```