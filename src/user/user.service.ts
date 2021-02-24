import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/typings';

/**
 * @class UserService
 */
@Injectable()
export class UserService {
  private readonly users: CreateUserDto[];

  constructor() {
    this.users = [
      {
        user_id: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        user_id: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        user_id: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<CreateUserDto | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
