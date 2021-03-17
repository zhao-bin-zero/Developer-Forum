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
import { Tag } from 'src/entity/tag.entity';
import { ResponseData } from 'src/typings';
import { TagService } from './tag.service';

@ApiTags('标签')
@Controller('api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get(':tag_id')
  async show(@Param('tag_id') tag_id: number): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.tagService.findOne(+tag_id),
    };
  }

  @Get('')
  async index(): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.tagService.findAll(),
    };
  }

  @Get('/tagname/:tagname')
  async findByUsername(@Param('tagname') tagname): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.tagService.findOneByTagname(tagname),
    };
  }

  @Post('')
  async create(@Body() tag: Tag): Promise<ResponseData> {
    const result = await this.tagService.create(tag);
    if (result == undefined) {
      return {
        statusCode: 500,
        message: '创建标签失败',
      };
    } else {
      return {
        statusCode: 200,
      };
    }
  }

  @Put(':tag_id')
  async update(
    @Param('tag_id') tag_id: number,
    @Body() tag: Tag,
  ): Promise<ResponseData> {
    const result = await this.tagService.update(+tag_id, tag);
    if (result.affected >= 1) {
      return {
        statusCode: 200,
      };
    } else {
      return {
        statusCode: 500,
        message: '更新标签失败',
      };
    }
  }

  @Delete(':tag_id')
  async remove(@Param('tag_id') tag_id: number): Promise<ResponseData> {
    return await this.tagService.remove(+tag_id);
  }
}
