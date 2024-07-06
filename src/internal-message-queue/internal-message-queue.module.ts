import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { InternalMessageQueueService } from './internal-message-queue.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SQSClient } from '@aws-sdk/client-sqs';
import { MonitorDataConsumer } from './monitor-data-consumer';

@Module({
  imports: [
    SqsModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const queues: Record<string, any> =
          configService.get<any>('sqs.queues');

        const producers = [];

        for (const [key, value] of Object.entries(queues)) {
          const endpoint: string = new URL(value.url).origin;

          producers.push({
            name: value.name,
            queueUrl: value.url,
            region: value.region,
            endpoint,
          });
        }

        const consumers = [
          {
            attributeNames: ['All'],
            messageAttributeNames: ['All'],
            name: process.env.AWS_SQS_QUEUE_MONITOR,
            queueUrl: `${process.env.AWS_SQS_PREFIX}${process.env.AWS_SQS_QUEUE_MONITOR}`,
            sqs: new SQSClient({
              endpoint: new URL(process.env.AWS_SQS_PREFIX).origin,
              region: process.env.AWS_SQS_REGION,
            }),
          },
        ];

        return {
          producers: producers,
          consumers: consumers,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [InternalMessageQueueService, MonitorDataConsumer],
  exports: [InternalMessageQueueService],
})
export class InternalMessageQueueModule {}
