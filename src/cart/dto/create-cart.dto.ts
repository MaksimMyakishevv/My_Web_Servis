import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCartDto {
  @ApiProperty()
  @Type(() => Number)
  productId: number;
}
