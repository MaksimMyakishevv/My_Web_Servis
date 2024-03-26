import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Basket } from './busket.entity';
// import { OrderItemEntity } from 'src/order/entities/order-item.entity';

@Entity()
export class BasketItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Count: number;

  @Column()
  basketPrice: number;

  @ManyToOne(() => ProductEntity, (product) => product.basket)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => Basket, (basket) => basket.BasketItems)
  basket: Basket;
}
