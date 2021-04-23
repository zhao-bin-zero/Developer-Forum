import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Article } from 'src/entity/article.entity';
import { ResponseData } from 'src/typings';
import { ArticleService } from './article.service';

@ApiTags('文章')
@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('')
  async create(@Body() article: Article): Promise<ResponseData> {
    const result = await this.articleService.create(article);
    if (result == undefined) {
      return {
        statusCode: 500,
        message: '创建文章失败',
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
    @Query('user_id') user_id = -1,
  ): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.articleService.findPaging(
        currentPage,
        onePageAmount,
        +user_id,
      ),
    };
  }

  @Get('count')
  async count(@Query('user_id') user_id = -1): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: {
        count: (await this.articleService.count(+user_id))[0].count,
      },
    };
  }

  @Get('tagcount')
  async tagCount(
    @Query('tagname') tagname: string,
    @Query('user_id') user_id = -1,
  ): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: {
        count: (await this.articleService.tagCount(tagname, +user_id))[0].count,
      },
    };
  }

  @Get('tag/:tagname')
  async listByTagname(
    @Param('tagname') tagname,
    @Query('currentPage') currentPage = 1,
    @Query('onePageAmount') onePageAmount = 8,
    @Query('user_id') user_id = -1,
  ): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.articleService.listByTagname(
        tagname,
        currentPage,
        onePageAmount,
        +user_id,
      ),
    };
  }

  @Get(':article_id')
  async findOne(
    @Param('article_id') article_id: string,
  ): Promise<ResponseData> {
    return {
      statusCode: 200,
      data: await this.articleService.findOne(+article_id),
    };
  }

  @Put(':article_id')
  async update(
    @Param('article_id') article_id: string,
    @Body() article: Article,
  ): Promise<ResponseData> {
    const result = await this.articleService.update(+article_id, article);
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

  @Delete(':article_id')
  async remove(@Param('article_id') article_id: string): Promise<ResponseData> {
    return await this.articleService.remove(+article_id);
  }
}
