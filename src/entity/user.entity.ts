import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Article } from './article.entity';
import { Role } from './role.entity';

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
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];
}
