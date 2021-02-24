import {
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

/**
 * 文章存储类
 */
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  article_id: number;

  @Column({ type: 'boolean', default: () => false })
  isPublished: boolean;

  @Column('int')
  authorId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }

  @OneToOne(() => User, (user) => user.articles)
  user: User;
}
