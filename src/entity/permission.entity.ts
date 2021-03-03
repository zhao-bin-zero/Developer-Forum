import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

/**
 * 权限存储类
 */
@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column('varchar', { length: 200, comment: '权限表达式' })
  permission_experssion: string;

  @Column({ type: 'text', comment: '权限描述' })
  permission_description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
