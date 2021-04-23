import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Tag } from 'src/entity/tag.entity';
import { User } from 'src/entity/user.entity';
import { ResponseData } from 'src/typings';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) {}
  async create(article: Article): Promise<Article> {
    try {
      const user = new User();
      user.user_id = article.user_id;
      const tag = new Tag();
      tag.tag_id = article.tag_id;
      article.user = user;
      article.tag = tag;
      await this.userRepository.save(user);
      await this.tagRepository.save(tag);
      return await this.articleRepository.save(article);
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async findPaging(
    currentPage: number,
    onePageAmount: number,
    user_id: number,
  ): Promise<Article[]> {
    let sql = `SELECT u.user_id, u.username,t.nickname,t.tagname,t.tag_id,a.* FROM user u,article a,tag t WHERE u.user_id=a.user_id AND t.tag_id=a.tag_id`;
    if (user_id != -1) {
      sql += ` AND u.user_id=?`;
    }
    if (currentPage != -1 && onePageAmount != -1) {
      sql += ` LIMIT ?,?`;
    }
    if (user_id != -1) {
      const a = await this.articleRepository.query(sql, [
        user_id,
        (currentPage - 1) * onePageAmount,
        currentPage * onePageAmount,
      ]);
      return a;
    }
    const a = await this.articleRepository.query(sql, [
      (currentPage - 1) * onePageAmount,
      currentPage * onePageAmount,
    ]);
    return a;
  }

  async findOne(article_id: number) {
    const r = await this.articleRepository.query(
      `SELECT u.user_id, u.username,t.nickname,t.tagname,t.tag_id,a.* FROM user u,article a,tag t WHERE u.user_id=a.user_id AND t.tag_id=a.tag_id AND article_id=?`,
      [article_id],
    );
    return r[0];
  }

  async count(user_id: number) {
    let sql = `SELECT COUNT(*) count FROM article`;
    if (user_id != -1) {
      sql += ` WHERE user_id=${user_id}`;
      return await this.articleRepository.query(sql);
    }
    return await this.articleRepository.query(sql);
  }

  async tagCount(tagname: string, user_id: number) {
    let sql = `SELECT count(*) count FROM user u,article a,tag t WHERE u.user_id=a.user_id AND t.tag_id=a.tag_id AND t.tagname=?`;
    if (user_id != -1) {
      sql += ` AND u.user_id=${user_id}`;
    }
    return await this.articleRepository.query(sql, [tagname]);
  }

  async listByTagname(
    tagname: string,
    currentPage: number,
    onePageAmount: number,
    user_id: number,
  ) {
    let sql = `SELECT u.user_id, u.username,t.nickname,t.tagname,t.tag_id,a.* FROM user u,article a,tag t WHERE u.user_id=a.user_id AND t.tag_id=a.tag_id AND t.tagname=?`;
    if (user_id != -1) {
      sql += `AND u.user_id=? LIMIT ?,?`;
      return await this.articleRepository.query(sql, [
        tagname,
        user_id,
        (currentPage - 1) * onePageAmount,
        currentPage * onePageAmount,
      ]);
    }
    sql += ` LIMIT ?,?`;
    return await this.articleRepository.query(sql, [
      tagname,
      (currentPage - 1) * onePageAmount,
      currentPage * onePageAmount,
    ]);
  }

  async update(article_id: number, article: Article) {
    const {
      title,
      description,
      enjoy,
      view,
      content,
      content_html,
      isPublished,
      user_id,
      tag_id,
    } = article;
    try {
      const r = await this.articleRepository.query(
        `UPDATE article SET title = ?,description=?,enjoy=?,view=?,content=?,content_html=?,isPublished=?,user_id=?,tag_id=?,created_at=Now() WHERE article_id=?`,
        [
          title,
          description,
          enjoy,
          view,
          content,
          content_html,
          isPublished,
          user_id,
          tag_id,
          article_id,
        ],
      );
      return r;
    } catch (error) {
      Logger.error(error);
      return error;
    }
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
