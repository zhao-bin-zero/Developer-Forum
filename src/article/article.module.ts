import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { User } from 'src/entity/user.entity';
import { Tag } from 'src/entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, User, Tag])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
