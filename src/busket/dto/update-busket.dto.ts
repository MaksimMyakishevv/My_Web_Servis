import { PartialType } from '@nestjs/swagger';
import { CreateBasketItemDto } from './create-busket.dto';

export class UpdateBasketItemDto extends PartialType(CreateBasketItemDto) {}
