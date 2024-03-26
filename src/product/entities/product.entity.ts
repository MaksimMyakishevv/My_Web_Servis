import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { BasketItemEntity } from 'src/busket/entities/busket-item.entity';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  sizes: string;

  @Column()
  prices: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @ManyToOne(() => Cart, (cart) => cart.products, {
    eager: true,
  })
  @JoinColumn()
  cart: Cart;

  @ApiHideProperty()
  @OneToMany(() => BasketItemEntity, (basket) => basket.product)
  basket: BasketItemEntity[];
  @ApiHideProperty()
  @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.product)
  orderItems: BasketItemEntity[];
}
