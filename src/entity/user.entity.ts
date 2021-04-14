import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Article } from './article.entity';
import { Event } from './event.entity';
import { Pin } from './pin.entity';

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
  @Column({
    type: 'varchar',
    length: 200,
    default: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  })
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

  @JoinColumn()
  @OneToMany(() => Pin, (pin) => pin.user)
  pins: Pin[];

  @JoinColumn()
  @ManyToMany(() => Event, (event) => event.users)
  events: Event[];
}
