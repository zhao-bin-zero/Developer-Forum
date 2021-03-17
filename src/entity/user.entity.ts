import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Article } from './article.entity';

/**
 * 用户存储类
 */
@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  user_id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @ApiProperty()
  @Column('text')
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200, default: '' })
  avatar: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn()
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
