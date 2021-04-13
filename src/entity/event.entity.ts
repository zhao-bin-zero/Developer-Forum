import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  event_id?: number;

  @ApiProperty()
  @Column({ type: 'varchar' })
  eventname: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  start_time: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => null, nullable: true })
  end_time: Date;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  event_url: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 200 })
  img_url: string;

  @ApiProperty()
  user_id?: number;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @JoinTable({
    name: 'events_users',
    joinColumn: {
      name: 'event_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
    },
  })
  @ManyToMany(() => User, (user) => user.events)
  users: User[];
}
