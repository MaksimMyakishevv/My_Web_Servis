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
      relations: ['users'],
    });

    const user = await this.repository.save(admin); // Сохраняем пользователя

    role.users.push(user);

    await this.roleRepository.save(role);
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUsername(dto.username);

    if (existingUser) {
      throw new BadRequestException(`User ${dto.username} already exists`);
    }
    // Находим роль пользователя
    const role = await this.roleRepository.findOne({ where: { id: 2 } });
    // Создаем пользователя
    const user = await this.repository.create(dto);
    // Устанавливаем связь с ролью
    user.role = role;
    // Сохраняем пользователя
    const savedUser = await this.repository.save(user);
    // Создаем корзину после регистрации
    const basket = await this.basketService.create(savedUser);
    savedUser.basket = basket;
    // Обновляем пользователя с корзиной
    await this.repository.save(savedUser);

    return savedUser;
  }

  async findByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }
}
