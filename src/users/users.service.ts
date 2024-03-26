import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { BasketService } from 'src/busket/busket.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private readonly basketService: BasketService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUsername(dto.username);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    }

    const user = await this.repository.save(dto); // Сохраняем пользователя

    // Создаем корзину после регистрации
    const basket = await this.basketService.create(user);
    user.basket = basket;

    await this.repository.save(user); // Обновляем пользователя с корзиной

    return user;
  }

  async findByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }
}
