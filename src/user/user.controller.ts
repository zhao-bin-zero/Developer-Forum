import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':user_id')
  async show(@Param('user_id') user_id: number) {
    return {
      code: 200,
      data: await this.userService.findOne(+user_id),
    };
  }

  @Get('')
  async index() {
    return {
      code: 200,
      data: await this.userService.findAll(),
    };
  }

  @Get('/username/:username')
  async findByUsername(@Param('username') username) {
    return {
      code: 200,
      data: await this.userService.findOneByUsername(username),
    };
  }

  @Post('')
  async create(@Body() user: User) {
    const result = await this.userService.create(user);
    if (result == undefined) {
      return {
        code: 500,
        error: '创建用户失败',
      };
    } else {
      return {
        code: 200,
      };
    }
  }

  @Put(':user_id')
  async update(@Param('user_id') user_id: string, @Body() user: User) {
    const result = await this.userService.update(+user_id, user);
    if (result.affected >= 1) {
      return {
        code: 200,
      };
    } else {
      return {
        code: 500,
        error: '更新失败',
      };
    }
  }

  @Delete(':user_id')
  async remove(@Param('user_id') user_id: string) {
    return await this.userService.remove(+user_id);
  }
}
