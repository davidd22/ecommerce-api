import { Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChargeInvoiceResponseDto } from './dto/charge-invoice-response.dto';

@ApiBearerAuth()
@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ChargeInvoiceResponseDto,
  })
  @ApiOperation({
    summary: 'Authorize payment based in previews created invoice',
    description: 'Assume invoice is pulled from db to get final amount',
  })
  @ApiParam({
    name: 'invoice-uuid',
    type: 'string',
  })
  @Post()
  create(@Param('invoice-uuid') invoiceUuid) {
    return this.paymentService.create(invoiceUuid);
  }
}
