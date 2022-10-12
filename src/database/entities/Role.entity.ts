import { USER_ROLES } from '@/enums/roles.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, default: USER_ROLES.USER })
  name: USER_ROLES;

  @OneToMany(() => User, (user) => user.role)
  user: User[];
}
