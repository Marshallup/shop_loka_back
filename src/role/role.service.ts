import { Role } from '@/database/entities/Role.entity';
import { USER_ROLES } from '@/enums/roles.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(name: Role['name']): Promise<Role['id']> {
    const role = this.roleRepository.create({ name });

    await this.roleRepository.save(role);

    return role.id;
  }

  async getRoleByNameOrCreate(
    roleName: USER_ROLES = USER_ROLES.USER,
  ): Promise<Role['id']> {
    const role = await this.roleRepository.findOneBy({ name: roleName });

    if (!role) {
      return this.createRole(roleName);
    }

    return role.id;
  }
}
