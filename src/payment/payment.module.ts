import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { InternalMessageQueueModule } from '../internal-message-queue/internal-message-queue.module';

@Module({
  imports: [InternalMessageQueueModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
