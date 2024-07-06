import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CartService } from './cart.service';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import CreateInvoiceRequestDto from './dto/create-invoice-request.dto';
import CreateInvoiceResponseDto from './dto/create-invoice-response.dto';

@ApiBearerAuth()
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({
    summary: 'Create an customer invoice based on shopping cart items',
    description: 'Will return an unpaid invoice',
  })
  @ApiBody({ type: CreateInvoiceRequestDto, required: true })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateInvoiceResponseDto,
  })
  @Post()
  async create(@Body() createPaymentRequestDto: CreateInvoiceRequestDto) {
    return await this.cartService.create(createPaymentRequestDto);
  }
}
