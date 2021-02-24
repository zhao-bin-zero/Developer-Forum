import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/typings';

/**
 * 认证服务,检索用户并验证密码
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 验证用户
   * @param username string 用户名
   * @param password string 密码
   * @returns Promise<any> CreateUserDto|null
   */
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
   * @returns token
   */
  async login(user: CreateUserDto) {
    const payload = { username: user.username, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
