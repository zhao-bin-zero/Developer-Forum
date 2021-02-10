import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

/**
 * 认证控制器
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * 登录
   * @param req 请求参数
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
