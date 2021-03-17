import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

/**
 * 权限存储类
 */
@Entity()
export class Permission {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  permission_id: number;

  @ApiProperty()
  @Column('varchar', { length: 200, comment: '权限表达式' })
  permission_experssion: string;

  @ApiProperty()
  @Column({ type: 'text', comment: '权限描述' })
  permission_description: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
