import { Controller, Get, Header, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('用户，安全')
  @Get('get/:id')
  @Header('Context-Type', 'application/json')
  async show(@Param('username') username: string) {
    return this.userService.findOne(username);
  }
}
