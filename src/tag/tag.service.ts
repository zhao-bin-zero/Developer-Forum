import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entity/tag.entity';
import { ResponseData } from 'src/typings';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagsRepository: Repository<Tag>) {}

  async create(tag: Tag): Promise<Tag> {
    return await this.tagsRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagsRepository.find();
  }

  async findOne(tag_id: number): Promise<Tag> {
    return await this.tagsRepository.findOne({ tag_id });
  }

  async findOneByTagname(tagname: string): Promise<Tag> {
    return await this.tagsRepository.findOne({ tagname });
  }

  async update(tag_id: number, tag: Tag) {
    return await this.tagsRepository.update(tag_id, tag);
  }

  async remove(tag_id: number): Promise<ResponseData> {
    const tag: Tag = await this.findOne(tag_id);
    if (tag == undefined) {
      return {
        statusCode: 500,
        message: '没有找到要删除的标签',
      };
    }
    const r: Tag = await this.tagsRepository.remove(tag);
    if (r == undefined) {
      return {
        statusCode: 500,
        message: '删除标签失败',
      };
    } else {
      return {
        statusCode: 200,
      };
    }
  }
}
