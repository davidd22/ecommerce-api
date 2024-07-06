import { Injectable } from '@nestjs/common';
import { ChargeInvoiceResponseDto } from './dto/charge-invoice-response.dto';
import { v4 as uuidv4 } from 'uuid';
import { InternalMessageQueueService } from '../internal-message-queue/internal-message-queue.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private readonly SQS_QUEUES: Record<string, any>;

  constructor(
    private readonly configService: ConfigService,
    private readonly internalMessageQueueService: InternalMessageQueueService,
  ) {
    this.SQS_QUEUES = this.configService.get<Record<string, any>>('sqs.queues');
  }

  async create(invoiceUuid: string): Promise<ChargeInvoiceResponseDto> {
    const response = { transactionId: uuidv4() };
    await this.internalMessageQueueService.publish(
      response,
      this.SQS_QUEUES.shipping.name,
    );

    return response;
  }
}
