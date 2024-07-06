import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export default class CreateInvoiceResponseDto {
  @ApiProperty({
    example: '56412c4d-2c1b-4361-b0a7-2ee0a61c7fc3',
    description: 'The uuid of the invoice to authorize payment',
  })
  uuid: number;

  @ApiProperty({
    example: 500.0,
    description: 'Total amount before VAT and discount',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 50.0, description: 'Value Added Tax' })
  @IsNumber()
  vat: number;

  @ApiProperty({
    example: 550.0,
    description: 'Final amount after VAT and discount',
  })
  @IsNumber()
  finalAmount: number;

  @ApiProperty({
    example: 10.0,
    description: 'Discount percentage applied',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  discountPercentage?: number;
}
