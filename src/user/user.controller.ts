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
import { ResponseData } from 'src/typings';
import { UserService } from './user.service';

@ApiTags('用户')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':user_id')
  async show(@Param('user_id') user_id: number): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.userService.findOne(+user_id),
    };
  }

  @Get('')
  async index(): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.userService.findAll(),
    };
  }

  @Get('/username/:username')
  async findByUsername(@Param('username') username): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.userService.findOneByUsername(username),
    };
  }

  @Post('')
  async create(@Body() user: User): Promise<ResponseData> {
    const result = await this.userService.create(user);
    if (result == undefined) {
      return {
        statusCode: 500,
        message: '创建用户失败',
      };
    } else {
      return {
        statusCode: 200,
      };
    }
  }

  @Put(':user_id')
  async update(
    @Param('user_id') user_id: string,
    @Body() user: User,
  ): Promise<ResponseData> {
    const result = await this.userService.update(+user_id, user);
    if (result.affected >= 1) {
      return {
        statusCode: 200,
      };
    } else {
      return {
        statusCode: 500,
        message: '更新失败',
      };
    }
  }

  @Delete(':user_id')
  async remove(@Param('user_id') user_id: string): Promise<ResponseData> {
    return await this.userService.remove(+user_id);
  }
}
