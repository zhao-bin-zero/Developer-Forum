import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}
  async create(article: Article): Promise<Article> {
    return await this.articleRepository.save(article);
  }

  async findPaging(
    currentPage: number,
    onePageAmount: number,
  ): Promise<Article[]> {
    return await this.articleRepository.find({
      skip: (currentPage - 1) * onePageAmount,
      take: onePageAmount,
    });
  }

  async findOne(article_id: number): Promise<Article> {
    return await this.articleRepository.findOne({ article_id });
  }

  async update(article_id: number, article: Article) {
    return await this.articleRepository.update(article_id, article);
  }

  async remove(article_id: number) {
    const article: Article = await this.findOne(article_id);
    if (article == undefined) {
      return {
        code: 500,
        error: '没有找到要删除的文章',
      };
    }
    const r: Article = await this.articleRepository.remove(article);
    if (r == undefined) {
      return {
        code: 500,
        error: '删除文章错误',
      };
    } else {
      return {
        code: 200,
      };
    }
  }
}
