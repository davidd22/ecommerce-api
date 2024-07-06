import { Injectable } from '@nestjs/common';
import CreateInvoiceRequestDto from './dto/create-invoice-request.dto';
import CreateInvoiceResponseDto from './dto/create-invoice-response.dto';
import { PRODUCTS } from '../products.db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  private readonly vatPercentage = 17;
  private readonly couponSecret = 'give-me-discount';

  async create(
    createPaymentRequestDto: CreateInvoiceRequestDto,
  ): Promise<CreateInvoiceResponseDto> {
    const { items, couponCode } = createPaymentRequestDto;

    let total = 0;
    let discountPercentage = 0;

    for (const item of items) {
      const product = PRODUCTS[item.sku];
      if (product) {
        total += product.price * item.quantity;
      } else {
        console.warn(`Product with SKU ${item.sku} not found`);
      }
    }

    if (couponCode === this.couponSecret) {
      discountPercentage = 10;
      total *= 1 - discountPercentage / 100;
    }

    const vat = total * (this.vatPercentage / 100);
    const finalAmount = total + vat;

    return {
      uuid: uuidv4(),
      amount: total,
      vat,
      finalAmount,
      discountPercentage: discountPercentage ? discountPercentage : undefined,
    };
  }
}
