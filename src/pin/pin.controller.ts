import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pin } from 'src/entity/pin.entity';
import { ResponseData } from 'src/typings';
import { PinService } from './pin.service';

@ApiTags('沸点')
@Controller('api/pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @Post('')
  async create(@Body() pin: Pin): Promise<ResponseData> {
    const result = await this.pinService.create(pin);
    if (result == undefined) {
      return {
        statusCode: 500,
        message: '创建沸点失败',
      };
    } else {
      return {
        statusCode: 200,
      };
    }
  }

  @Get('')
  async index(
    @Query('currentPage') currentPage = 1,
    @Query('onePageAmount') onePageAmount = 8,
  ): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.pinService.findPaging(currentPage, onePageAmount),
    };
  }

  @Get('count')
  async count(): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: {
        count: await this.pinService.count(),
      },
    };
  }

  @Get(':pin_id')
  async findOne(@Param('pin_id') pin_id: string): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.pinService.findOne(+pin_id),
    };
  }

  @Put(':pin_id')
  async update(
    @Param('pin_id') pin_id: string,
    @Body() pin: Pin,
  ): Promise<ResponseData> {
    const result = await this.pinService.update(+pin_id, pin);
    if (result.affectedRows >= 1) {
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

  @Delete(':pin_id')
  async remove(@Param('pin_id') pin_id: string): Promise<ResponseData> {
    return await this.pinService.remove(+pin_id);
  }
}
