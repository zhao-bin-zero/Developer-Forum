import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entity/event.entity';
import { User } from 'src/entity/user.entity';
import { ResponseData } from 'src/typings';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async create(event: Event): Promise<Event> {
    const user = new User();
    user.user_id = event.user_id;
    event.users.push(user);
    try {
      await this.userRepository.save(user);
      return await this.eventRepository.save(event);
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async findPaging(
    currentPage: number,
    onePageAmount: number,
  ): Promise<Event[]> {
    const r = await this.eventRepository.query(
      `
      SELECT u.user_id, u.username,e.* FROM user u,event e WHERE u.user_id=e.user_id LIMIT ?,?
    `,
      [(currentPage - 1) * onePageAmount, currentPage * onePageAmount],
    );
    return r;
  }

  async findOne(pin_id: number) {
    const r = await this.eventRepository.query(
      `
      SELECT u.user_id, u.username,e.* FROM user u,event e WHERE u.user_id=e.user_id AND pin_id=?
    `,
      [pin_id],
    );
    return r[0];
  }

  async count() {
    return await this.eventRepository.count();
  }

  async update(pin_id: number, event: Event) {
    try {
      const r = await this.eventRepository.update(pin_id, event);
      return r;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async remove(pin_id: number): Promise<ResponseData> {
    const event = await this.findOne(pin_id);
    if (event == undefined) {
      return {
        statusCode: 500,
        message: '没有找到要删除的活动',
      };
    }
    const r = await this.eventRepository.remove(event);
    if (r == undefined) {
      return {
        statusCode: 500,
        message: '删除活动错误',
      };
    } else {
      return {
        statusCode: 200,
      };
    }
  }
}
