import { Controller, Get, Header, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('用户，安全')
  @Get('get/:id')
  @Header('Context-Type', 'application/json')
  async show(@Param('id') id: number) {
    const user: CreateUserDto[] = [
      {
        user_id: 0,
        username: '小明',
        password: '123',
        roles: '1,2,3',
        avatar: 'https://localhost/x.png',
      },
    ];
    return user[id];
  }
}
