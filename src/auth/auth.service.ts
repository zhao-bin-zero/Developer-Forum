import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

/**
 * 检索用户并验证密码
 * @class AuthService
 */
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password == password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
