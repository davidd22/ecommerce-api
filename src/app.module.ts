import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { HttpExceptionFilter } from './filter/http-exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { PaymentModule } from './payment/payment.module';
import { InternalMessageQueueModule } from './internal-message-queue/internal-message-queue.module';
import configuration from '../config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    CartModule,
    PaymentModule,
    InternalMessageQueueModule,
  ],
})
export class AppModule {}
