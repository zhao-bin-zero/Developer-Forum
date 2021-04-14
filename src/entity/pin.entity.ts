import { ApiProperty } from '@nestjs/swagger';
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

@Entity()
export class Pin {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  pin_id: number;

  @ApiProperty()
  @Column({ type: 'text' })
  content: string;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  reply_user_id: number;

  @ApiProperty()
  user_id?: number;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.pins)
  user: User;
}
