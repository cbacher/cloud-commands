const sdk = require("aws-sdk");

exports.handler = async function(event, context) {
    const eventText = JSON.stringify(event, undefined, 2);
    console.log("TOPIC_ARN:", process.env.TOPIC_ARN);
    console.log("request:", eventText);
    const sns = new sdk.SNS();
    const params = {
        Message: eventText,
        Subject: "Test SNS From Lambda",
        TopicArn: process.env.TOPIC_ARN
    };

    const snsResult = await sns.publish(params).promise();
    console.log("Publish Result:", snsResult.MessageId)

    return {
        statusCode: 200,
        headers: {"Content-Type": "text/plain"},
        body: `Hello, CDK! You've hit ${event.path}\n`
    };
};
