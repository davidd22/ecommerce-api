import { Injectable } from '@nestjs/common';
import CreatePaymentRequestDto from './dto/create-payment-request.dto';

@Injectable()
export class CartService {
  create(createPaymentRequestDto: CreatePaymentRequestDto) {
    return 345;
  }
}
