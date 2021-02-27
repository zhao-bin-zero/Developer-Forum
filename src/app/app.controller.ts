import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiTags('视图')
  @Get('/')
  @Render('index')
  async home() {
    return {};
  }
}
