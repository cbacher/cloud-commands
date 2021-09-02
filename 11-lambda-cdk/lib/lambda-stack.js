const lambda = require('@aws-cdk/aws-lambda');
const cdk = require('@aws-cdk/core');
const apigw = require('@aws-cdk/aws-apigateway');
const sns = require('@aws-cdk/aws-sns');
const subscriptions = require('@aws-cdk/aws-sns-subscriptions');

class LambdaStack extends cdk.Stack {
    /**
     *
     * @param {cdk.Construct} scope
     * @param {string} id
     * @param {cdk.StackProps=} props
     */
    constructor(scope, id, props) {
        super(scope, id, props);

        const topic = new sns.Topic(this, 'Topic', {
            displayName: 'Send me email'
        });

        topic.addSubscription(new subscriptions.EmailSubscription('dave_maximillion@hotmail.com'));

        const func = new lambda.Function(this, 'Lambda', {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'index.handler',
            description: `Function generated on : ${new Date().toISOString()}`,
            environment: {
                TOPIC_ARN: topic.topicArn
            }
        });

        topic.grantPublish(func);

        // TODO: Limit access from only workspace?
        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: func
        });


    }
}

module.exports = {LambdaStack: LambdaStack}
