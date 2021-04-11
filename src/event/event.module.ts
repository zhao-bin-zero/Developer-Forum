import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entity/event.entity';
import { User } from 'src/entity/user.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
