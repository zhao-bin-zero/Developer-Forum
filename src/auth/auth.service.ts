import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto';

/**
 * 检索用户并验证密码
 * @class AuthService
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user: CreateUserDto = await this.userService.findOne(username);
    if (user && user.password == password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * JWT登录
   * @param user 用户信息
   */
  async login(user: CreateUserDto) {
    const payload = { username: user, sub: user.user_id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
