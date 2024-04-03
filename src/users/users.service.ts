import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { BasketService } from 'src/busket/busket.service';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly basketService: BasketService,
  ) {}
  async createadmin(): Promise<void> {
    const admin = new UserEntity();
    admin.username = 'admin';
    admin.password = '135798642';
    const role = await this.roleRepository.findOne({
      where: { id: 1 },
      relations: ['user'],
    });

    const user = await this.repository.save(admin); // Сохраняем пользователя

    role.user.push(user);

    await this.roleRepository.save(role);
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUsername(dto.username);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    }
    const role = await this.roleRepository.findOne({
      where: { id: 2 },
      relations: ['user'],
    });

    const user = await this.repository.save(dto); // Сохраняем пользователя

    role.user.push(user);

    await this.roleRepository.save(role);

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
