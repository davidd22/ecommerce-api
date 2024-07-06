import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { HttpExceptionFilter } from './filter/http-exception-filter';
import { APP_FILTER } from '@nestjs/core';
import { PaymentModule } from './payment/payment.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  imports: [CartModule, PaymentModule],
})
export class AppModule {}
