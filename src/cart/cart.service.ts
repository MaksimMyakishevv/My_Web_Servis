import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  async getCart(id: number): Promise<Cart> {
    const useridcart = await this.UserRepository.findOneBy({ id });
    return await this.cartRepository.findOne({
      where: { userId: useridcart.id },
      relations: ['products'],
    });
  }

  async addToCart(dto: CreateCartDto, id: number): Promise<Cart> {
    const useridcart = await this.UserRepository.findOneBy({ id });
    let cart = await this.cartRepository.findOne({
      where: { userId: useridcart.id },
      relations: ['products'],
    });
    if (!cart) {
      cart = new Cart();
      cart.userId = useridcart.id;
    }
    const idu = dto.productId;
    const product = await this.productRepository.findOneBy({ id: idu });
    if (!product) {
      throw new Error('Продукт не найден');
    }
    cart.products.push(product);
    await this.cartRepository.save(cart);
    return cart;
  }

  async removeFromCart(dto: CreateCartDto, id: number): Promise<Cart> {
    const useridcart = await this.UserRepository.findOneBy({ id });
    const cart = await this.cartRepository.findOne({
      where: { userId: useridcart.id },
      relations: ['products'],
    });
    if (!cart) {
      return null;
    }
    console.log(cart.products);
    cart.products = cart.products.filter((p) => p.id !== dto.productId);
    return await this.cartRepository.save(cart);
  }

  async clearCart(id: number): Promise<void> {
    const useridcart = await this.UserRepository.findOneBy({ id });
    const cart = await this.cartRepository.findOne({
      where: { userId: useridcart.id },
      relations: ['products'],
    });
    if (cart) {
      cart.products = [];
      await this.cartRepository.save(cart);
    }
  }
}
