import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  title: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty({ default: 0 })
  @Column('int')
  enjoy: number;

  @ApiProperty({ default: 0 })
  @Column('int')
  view: number;

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
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  update_at: Date;

  user_id?: number;

  tag_id?: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.articles)
  user: User;

  @JoinColumn({ name: 'tag_id' })
  @ManyToOne(() => Tag, (tag) => tag.articles)
  tag: Tag;
}
