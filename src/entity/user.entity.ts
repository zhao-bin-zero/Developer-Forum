import { type } from 'os';
import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';
import { Role } from './role.entity';

/**
 * 用户存储类
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column('varchar', { length: 30 })
  username: string;

  @Column('text')
  password: string;

  @Column('varchar', { length: 200 })
  avatar: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @Column({ type: 'boolean', default: () => false })
  isAdmin: boolean;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }
}
