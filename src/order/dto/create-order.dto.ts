import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  Address: string;
}
