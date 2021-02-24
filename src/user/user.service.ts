import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from 'src/typings';
import { Repository } from 'typeorm';

/**
 * @class UserService
 */
@Injectable()
export class UserService {
  private readonly users: CreateUserDto[];

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    // this.users = [
    //   {
    //     user_id: 1,
    //     username: 'john',
    //     password: 'changeme',
    //   },
    //   {
    //     user_id: 2,
    //     username: 'chris',
    //     password: 'secret',
    //   },
    //   {
    //     user_id: 3,
    //     username: 'maria',
    //     password: 'guess',
    //   },
    // ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne(username);
  }
}
