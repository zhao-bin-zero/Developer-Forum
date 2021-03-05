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
import { ArticleService } from './article.service';

@ApiTags('文章')
@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('')
  async create(@Body() article: Article) {
    const result = await this.articleService.create(article);
    if (result == undefined) {
      return {
        code: 500,
        error: '创建文章失败',
      };
    } else {
      return {
        code: 200,
      };
    }
  }

  @Get('')
  async index(
    @Query('currentPage') currentPage: number,
    @Query('onePageAmount') onePageAmount: number,
  ) {
    return {
      code: 200,
      data: await this.articleService.findPaging(currentPage, onePageAmount),
    };
  }

  @Get(':article_id')
  async findOne(@Param('article_id') article_id: string) {
    return {
      code: 200,
      data: await this.articleService.findOne(+article_id),
    };
  }

  @Put(':article_id')
  async update(
    @Param('article_id') article_id: string,
    @Body() article: Article,
  ) {
    const result = await this.articleService.update(+article_id, article);
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

  @Delete(':article_id')
  async remove(@Param('id') article_id: string) {
    return await this.articleService.remove(+article_id);
  }
}
