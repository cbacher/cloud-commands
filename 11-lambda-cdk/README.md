# Lambda (using CDK/CLI/Console)
* Preferred Languages: Python or Node
* Create an SNS Topic
* Assign a user email
* Send and Email when the lambda is invoked

## What did you learn?
* Email endpoints (i.e. email addresses) must be confirmed before emails can be received.
* Sometimes the emails do not send. It took several minutes of testing and then the emails came. But not in a flood of emails. Instead the first several just were not recieved.
* We can pass parameters to a Lambda function through environment variables at the time the Stack is built. For instance, in order to send a message to a topic an ARN is required, however, the ARN is not available until after the stack is built. Using the "environment" property, the stack can pass the variable value for late bound values.
* Like other CDK exercises, it still surprises me how little code is needed to deploy an application.
* The message wouldn't publish to the topic, or so it seemed. The call to published needed an await on a promise in order for the message to commit. I had originally had both a callback and the await which resulted in 2 messages.
* Troubleshooting allowed me to publish a message through the console on the topic to ensure that the email was being sent.
* Cloudwatch logs were on by default for any console.log which also aided in troubleshooting.
