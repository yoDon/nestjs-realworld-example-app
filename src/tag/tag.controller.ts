import {Get, Controller } from '@nestjs/common';

import { TagsRO } from './tag.interface';
import { TagService } from './tag.service';

import {
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('tags')
@Controller('tags')
export class TagController {

  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<TagsRO> {
    return await this.tagService.findAll();
  }

}