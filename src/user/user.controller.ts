import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('用户，安全')
  @Get('/')
  @Header('Context-Type', 'application/json')
  async show(@Query('user_id') user_id: number) {
    return await this.userService.findOne(+user_id);
  }

  @Post()
  async create(@Body() user: User) {
    return await this.userService.create(user);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':user_id')
  async findOne(@Param('user_id') user_id: string) {
    return await this.userService.findOne(+user_id);
  }

  @Put(':user_id')
  async update(@Param('id') user_id: string, @Body() user: User) {
    return await this.userService.update(+user_id, user);
  }

  @Delete(':user_id')
  async remove(@Param('user_id') user_id: string) {
    return await this.userService.remove(+user_id);
  }
}
