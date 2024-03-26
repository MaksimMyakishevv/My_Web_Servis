import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { BasketService } from 'src/busket/busket.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItemEntity)
    private orderitemRepository: Repository<OrderItemEntity>,
    private readonly basketService: BasketService,
    private readonly userService: UsersService,
  ) {}
  async order(req: any, dto: CreateOrderDto) {
    const userBasket = await this.basketService.getUserBasket(req.user);
    if (userBasket.BasketItems.length == 0) {
      throw new BadRequestException(
        'Вы не можете оформить заказ с пустой корзиной',
      );
    }
    const order = await this.orderRepository.create({
      phone: dto.phone,
      Address: dto.Address,
      totalPrice: 0,
      user: req.user,
      orderItems: [],
    });

    for (let i = 0; i <= userBasket.BasketItems.length; i++) {
      if (userBasket.BasketItems[i] && userBasket.BasketItems[i].product) {
        const orderItem = this.orderitemRepository.create({
          product: userBasket.BasketItems[i].product,
        });
        orderItem.orderPrice = userBasket.BasketItems[i].basketPrice;
        await this.orderitemRepository.save(orderItem);
        order.orderItems.push(orderItem);
      }
    }
    if (order.orderItems == null) {
      return 0;
    }
    let sum = 0;
    order.orderItems.forEach((a) => (sum += a.orderPrice));
    order.totalPrice = sum;

    order.user = req.user;
    const orderNew = await this.orderRepository.save(order);
    await this.basketService.removeBasket(req.user.id);
    return orderNew;
  }

  async getItemsFromBasket(user: any) {
    const items = await this.basketService.findAll(user);
    return items;
  }
  async create(user: UserEntity, dto: CreateOrderDto) {
    const order = new Order();
    order.phone = dto.phone;
    order.Address = dto.Address;
    order.totalPrice = 0;
    order.user = user;
    await this.orderRepository.save(order);
    return order;
  }
  async getOrdersUser(req: any) {
    const userOrder = await this.orderRepository.find({
      relations: {
        orderItems: {
          product: true,
        },
      },
      where: {
        user: req.user,
      },
    });
    return userOrder;
  }
}
