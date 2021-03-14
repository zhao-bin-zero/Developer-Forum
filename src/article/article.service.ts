import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { User } from 'src/entity/user.entity';
import { ResponseData } from 'src/typings';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(article: Article): Promise<Article> {
    const user = new User();
    user.user_id = article.user_id;
    article.user = user;
    try {
      await this.userRepository.save(user);
      return await this.articleRepository.save(article);
    } catch (e) {
      throw e;
    }
  }

  async findPaging(
    currentPage: number,
    onePageAmount: number,
  ): Promise<Article[]> {
    const a = await this.articleRepository.query(
      `
      SELECT u.user_id, u.username,a.* FROM user u,article a WHERE u.user_id=a.user_id LIMIT ?,?
    `,
      [(currentPage - 1) * onePageAmount, currentPage * onePageAmount],
    );
    return a;
  }

  async findOne(article_id: number) {
    const r = await this.articleRepository.query(
      `
      SELECT u.user_id, u.username,a.* FROM user u,article a WHERE u.user_id=a.user_id AND article_id=?
    `,
      [article_id],
    );
    return r[0];
  }

  async count() {
    return await this.articleRepository.count();
  }

  async update(article_id: number, article: Article) {
    return await this.articleRepository.update(article_id, article);
  }

  async remove(article_id: number): Promise<ResponseData> {
    const article = await this.findOne(article_id);
    if (article == undefined) {
      return {
        statusCode: 500,
        message: '没有找到要删除的文章',
      };
    }
    const r = await this.articleRepository.remove(article);
    if (r == undefined) {
      return {
        statusCode: 500,
        message: '删除文章错误',
      };
    } else {
      return {
        statusCode: 200,
      };
    }
  }
}
