import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryColumn()
  event_id: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  eventname: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  start_time: Date;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  end_time: Date;

  user_id?: number;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @JoinTable({ name: 'events_users' })
  @ManyToMany(() => User, (user) => user.events)
  users: User[];
}
