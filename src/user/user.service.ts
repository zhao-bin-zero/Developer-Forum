import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { ResponseData } from 'src/typings';
import { Repository } from 'typeorm';

/**
 * @class UserService
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(user_id: number): Promise<User> {
    return await this.usersRepository.findOne({ user_id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async update(user_id: number, user: User) {
    return await this.usersRepository.update(user_id, user);
  }

  async remove(user_id: number): Promise<ResponseData> {
    const user: User = await this.findOne(user_id);
    if (user == undefined) {
      return {
        statusCode: 500,
        message: '没有找到要删除的用户',
      };
    }
    const r: User = await this.usersRepository.remove(user);
    if (r == undefined) {
      return {
        statusCode: 500,
        message: '删除用户失败',
      };
    } else {
      return {
        statusCode: 200,
      };
    }
  }
}
