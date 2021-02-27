import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

/**
 * 认证控制器
 */
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * 登录
   * @param req 请求参数
   */
  @ApiTags('授权，认证')
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiTags('授权，认证')
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
