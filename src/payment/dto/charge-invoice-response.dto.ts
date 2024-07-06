import { ApiProperty } from '@nestjs/swagger';

export class ChargeInvoiceResponseDto {
  @ApiProperty({
    example: '56412c4d-2c1b-4361-b0a7-2ee0a61c7fc3',
    description: 'The transaction id from stripe',
  })
  transactionId: string;

  @ApiProperty({
    example: '34412cxcv-2c1b-4361-b0a7-2ee0a61c7fc3',
    description: 'The tracking id for customer to track order',
  })
  trackingId: string;
}
