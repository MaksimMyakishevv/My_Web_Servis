import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  //   OneToMany,
  Column,
} from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
// import { BasketItemEntity } from 'src/busket/entities/busket-item.entity';

@Entity()
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderPrice: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems)
  @JoinColumn()
  product: ProductEntity;
}
