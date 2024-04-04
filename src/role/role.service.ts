import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async checkTableExists(): Promise<boolean> {
    const count = await this.roleRepository.count();
    return count > 0;
  }

  async createRoles(): Promise<void> {
    const adminRole = new Role();
    adminRole.name = 'admin';

    const userRole = new Role();
    userRole.name = 'user';

    await this.roleRepository.save([adminRole, userRole]);
  }

  async findAdminRole(): Promise<Role> {
    return await this.roleRepository.findOne({ where: { name: 'admin' } });
  }
  async create(dto: CreateRoleDto) {
    const role = new Role();
    role.name = dto.name;
    const Newrole = await this.roleRepository.save(role);
    return Newrole;
  }
  async findRoleById(id: number): Promise<Role | null> {
    return await this.roleRepository.findOneBy({ id });
  }

  findAll() {
    return this.roleRepository.find();
  }
}
