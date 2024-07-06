import * as process from 'process';

export default () => ({
  sqs: {
    queues: {
      shipping: {
        name: process.env.AWS_SQS_QUEUE_SHIPPING,
        url: `${process.env.AWS_SQS_PREFIX}${process.env.AWS_SQS_QUEUE_SHIPPING}`,
        region: process.env.AWS_SQS_REGION || 'us-east-1',
      },
    },
  },
});
