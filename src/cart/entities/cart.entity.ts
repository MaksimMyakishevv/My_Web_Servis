import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @ApiHideProperty()
  @OneToMany(() => ProductEntity, (product) => product.cart)
  products: ProductEntity[];

  @JoinColumn()
  product: ProductEntity;
}
