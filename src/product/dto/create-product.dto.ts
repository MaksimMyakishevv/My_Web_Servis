import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;
  @ApiProperty()
  @Type(() => String)
  @IsString()
  name: string = 'Название часов';
  @ApiProperty()
  @Type(() => String)
  @IsString()
  description: string = 'Цвет корпуса';
  @ApiProperty()
  @Type(() => String)
  @IsString()
  sizes: string = 'Цвет ремешка';
  @ApiProperty()
  @Type(() => String)
  prices: number;
  @ApiProperty()
  @Type(() => Number)
  categoryId: number;
}
