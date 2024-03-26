import { Module } from '@nestjs/common';
import { BasketService } from './busket.service';
import { BasketController } from './busket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/busket.entity';
import { BasketItemEntity } from './entities/busket-item.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket, BasketItemEntity]),
    ProductModule,
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
