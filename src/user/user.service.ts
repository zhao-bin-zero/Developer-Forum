import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
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
    const user: User = await this.usersRepository.findOne({ user_id });
    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ username });
  }

  async update(user_id: number, user: User) {
    return await this.usersRepository.update(user_id, user);
  }

  async remove(user_id: number) {
    const user: User = await this.findOne(user_id);
    if (user == undefined) {
      return {
        code: 500,
        error: '没有找到要删除的用户',
      };
    }
    const r = await this.usersRepository.remove(user);
    if (r == undefined) {
      return {
        code: 500,
        error: '删除用户失败',
      };
    } else {
      return {
        code: 200,
      };
    }
  }
}
