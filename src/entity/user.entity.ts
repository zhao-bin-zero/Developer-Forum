import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Article } from './article.entity';

/**
 * 用户存储类
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column('varchar', { length: 30 })
  nickname: string;

  @Column('text')
  password: string;

  @Column({ type: 'varchar', length: 200, default: '' })
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

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
