import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pin } from 'src/entity/pin.entity';
import { User } from 'src/entity/user.entity';
import { ResponseData } from 'src/typings';
import { Repository } from 'typeorm';

@Injectable()
export class PinService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Pin) private pinRepository: Repository<Pin>,
  ) {}
  async create(pin: Pin): Promise<any> {
    try {
      const { user_id, content } = pin;
      const r = await this.pinRepository.query(
        `INSERT INTO pin (user_id, content) VALUES (?,?)`,
        [user_id, content],
      );
      return r;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async findPaging(currentPage: number, onePageAmount: number): Promise<Pin[]> {
    let sql = ``;
    if (currentPage == -1 && onePageAmount == -1) {
      sql = `SELECT u.user_id, u.username,u.avatar,p.* FROM user u,pin p WHERE u.user_id=p.user_id`;
    } else {
      sql = `SELECT u.user_id, u.username,u.avatar,p.* FROM user u,pin p WHERE u.user_id=p.user_id LIMIT ?,?`;
    }
    const r = await this.pinRepository.query(sql, [
      (currentPage - 1) * onePageAmount,
      currentPage * onePageAmount,
    ]);
    return r;
  }

  async findOne(pin_id: number) {
    const r = await this.pinRepository.query(
      `SELECT u.user_id, u.username,u.avatar,p.* FROM user u,pin p WHERE u.user_id=p.user_id AND pin_id=?`,
      [pin_id],
    );
    return r[0];
  }

  async count() {
    return await this.pinRepository.count();
  }

  async update(pin_id: number, pin: Pin) {
    try {
      const { user_id, content, reply_user_id } = pin;
      const r = await this.pinRepository.query(
        `UPDATE pin SET user_id=?,content=?, reply_user_id=?,updated_at=Now() WHERE pin_id=?`,
        [user_id, content, reply_user_id, pin_id],
      );
      return r;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async remove(pin_id: number): Promise<ResponseData> {
    const pin = await this.findOne(pin_id);
    if (pin == undefined) {
      return {
        statusCode: 500,
        message: '没有找到要删除的沸点',
      };
    }
    const r = await this.pinRepository.remove(pin);
    if (r == undefined) {
      return {
        statusCode: 500,
        message: '删除沸点错误',
      };
    } else {
      return {
        statusCode: 200,
      };
    }
  }
}
