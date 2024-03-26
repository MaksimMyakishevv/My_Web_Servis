import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  name: string;
}
