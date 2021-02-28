import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from './article.entity';

@Entity()
/**
 *标签存储类
 */
export class Tag {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  tag_id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 30, unique: true })
  tagname: string;

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

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
