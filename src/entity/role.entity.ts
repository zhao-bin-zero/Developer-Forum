import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

/**
 * 角色存储类
 */
@Entity()
export class Role {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  role_id: number;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  role_name: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
