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
import { Event } from 'src/entity/event.entity';
import { ResponseData } from 'src/typings';
import { EventService } from './event.service';

@ApiTags('活动')
@Controller('api/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('')
  async create(@Body() event: Event): Promise<ResponseData> {
    const result = await this.eventService.create(event);
    console.log(result);
    if (result == undefined) {
      return {
        statusCode: 500,
        message: '创建活动失败',
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
      data: await this.eventService.findPaging(currentPage, onePageAmount),
    };
  }

  @Get('count')
  async count(): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: {
        count: await this.eventService.count(),
      },
    };
  }

  @Get(':event_id')
  async findOne(@Param('event_id') event_id: string): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.eventService.findOne(+event_id),
    };
  }

  @Put(':event_id')
  async update(
    @Param('event_id') event_id: string,
    @Body() event: Event,
  ): Promise<ResponseData> {
    const result = await this.eventService.update(+event_id, event);
    if (result == 1) {
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

  @Delete(':event_id')
  async remove(@Param('event_id') event_id: string): Promise<ResponseData> {
    return await this.eventService.remove(+event_id);
  }
}
