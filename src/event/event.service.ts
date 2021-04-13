import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entity/event.entity';
import { User } from 'src/entity/user.entity';
import { ResponseData } from 'src/typings';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(event: Event) {
    try {
      const user = new User();
      user.user_id = event.user_id;
      await this.connection.manager.save(User, user);
      event.users = [user];
      return await this.connection.manager.save(Event, event);
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
      `SELECT u.user_id, u.username,e.* FROM user u,event e,events_users eu WHERE eu.event_id=e.event_id AND eu.user_id=u.user_id LIMIT ?,?`,
      [(currentPage - 1) * onePageAmount, currentPage * onePageAmount],
    );
    return r;
  }

  async findOne(event_id: number) {
    const r = await this.eventRepository.query(
      `SELECT u.user_id, u.username,e.* FROM user u,event e,events_users eu WHERE eu.event_id=e.event_id AND eu.user_id=u.user_id AND e.event_id=?`,
      [event_id],
    );
    return r[0];
  }

  async count() {
    return await this.eventRepository.count();
  }

  async update(event_id: number, event: Event) {
    try {
      const r = await this.findOne(event_id);
      if (r !== undefined) {
        const queryRunner = this.connection.createQueryRunner();
        queryRunner.connect();
        // 开始事务：
        await queryRunner.startTransaction();
        try {
          // 对此事务执行一些操作：
          await queryRunner.manager.save(Event, event);
          await queryRunner.manager.query(
            `DELETE FROM events_users where event_id=${event_id}`,
          );
          await queryRunner.manager.query(
            `INSERT INTO events_users VALUES (${event.user_id},${event_id})`,
          );
          // 提交事务：
          await queryRunner.commitTransaction();
          return 1;
        } catch (err) {
          // 有错误做出回滚更改
          await queryRunner.rollbackTransaction();
          return 0;
        }
      } else {
        return 0;
      }
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async remove(event_id: number): Promise<ResponseData> {
    const event = await this.findOne(event_id);
    if (event == undefined) {
      return {
        statusCode: 500,
        message: '没有找到要删除的活动',
      };
    }
    const queryRunner = this.connection.createQueryRunner();
    queryRunner.connect();
    // 开始事务：
    await queryRunner.startTransaction();
    try {
      // 对此事务执行一些操作：
      await queryRunner.manager.remove(Event, event);
      await queryRunner.manager.query(
        `DELETE FROM events_users where event_id=${event_id}`,
      );
      // 提交事务：
      await queryRunner.commitTransaction();
      return {
        statusCode: 200,
      };
    } catch (err) {
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }
}
