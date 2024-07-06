import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import CreatePaymentRequestDto from './dto/create-payment-request.dto';

@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBody({ type: CreatePaymentRequestDto, required: true })
  @Post()
  create(@Body() createPaymentRequestDto: CreatePaymentRequestDto) {
    return this.cartService.create(createPaymentRequestDto);
  }
}
