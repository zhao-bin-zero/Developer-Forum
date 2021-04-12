import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/typings';
import { AuthService } from './auth.service';

/**
 * 认证控制器
 */
@ApiBearerAuth()
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
  async login(@Request() req): Promise<ResponseData> {
    try {
      const data = await this.authService.login(req.user);
      return {
        statusCode: 200,
        data,
      };
    } catch (error) {
      Logger.error(error);
      return {
        statusCode: 401,
        message: '没有登录权限',
      };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async getProfile(@Request() req): Promise<ResponseData> {
    if (!req.user) {
      return {
        statusCode: 401,
        message: '登录过期',
      };
    }
    return {
      statusCode: 200,
      data: req.user,
    };
  }
}
