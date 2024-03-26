import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BasketItemEntity } from './busket-item.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.basket)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => BasketItemEntity, (basketItem) => basketItem.basket)
  BasketItems: BasketItemEntity[];

  getTotalPrice() {
    if (this.BasketItems == null) {
      return 0;
    }
    let sum = 0;
    this.BasketItems.forEach((a) => (sum += a.product.prices * a.Count));
    return sum;
  }
}
