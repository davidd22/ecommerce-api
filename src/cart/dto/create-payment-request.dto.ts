import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PaymentItem {
  @ApiProperty({ example: 'PROD-235' })
  @IsString()
  sku: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(1)
  @Max(100)
  quantity: number;
}

export default class CreatePaymentRequestDto {
  @ApiProperty({ type: [PaymentItem] })
  @ArrayMinSize(1)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentItem)
  items: PaymentItem[];

  @ApiProperty({ example: 'give-me-discount' })
  couponCode?: string;
}
