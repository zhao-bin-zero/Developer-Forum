import {
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 文章存储类
 */
@Entity()
export class Article {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  article_id: number;

  @ApiProperty()
  @Column('text')
  content: string;

  @ApiProperty()
  @Column('text')
  content_html: string;

  @ApiProperty()
  @Column({ type: 'boolean', default: () => true })
  isPublished: boolean;

  @ApiProperty()
  @Column('int')
  authorId: number;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }

  @OneToOne(() => User, (user) => user.articles)
  user: User;

  @OneToOne(() => Tag, (tag) => tag.articles)
  tags: Tag[];
}
