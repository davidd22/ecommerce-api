import { Injectable } from '@nestjs/common';
import { ChargeInvoiceResponseDto } from './dto/charge-invoice-response.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  create(invoiceUuid: string): ChargeInvoiceResponseDto {
    return { transactionId: uuidv4(), trackingId: uuidv4() };
  }
}
