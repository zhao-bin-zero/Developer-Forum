import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

/**
 * 认证控制器
 */
@ApiTags('授权，认证')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * 登录
   * @param req 请求参数
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return {
      code: 200,
      data: await this.authService.login(req.user),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return {
      code: 200,
      data: req.user,
    };
  }
}
