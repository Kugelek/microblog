import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';

import { BlogPostRepository } from './blogpost.repository';
import { BlogPost } from './blogpost.entity';
import { GetFilteredBlogPostsDto } from './dto/get-filtered-blogposts.dto';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPostRepository)
    private blogPostRepository: BlogPostRepository,
  ) {}

  async createPost(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    return this.blogPostRepository.createPost(createBlogPostDto);
  }
  async getPosts(
    filterDto: GetFilteredBlogPostsDto,
    //user: User,
  ): Promise<BlogPost[]> {
    //return this.blogPostRepository.getPosts(filterDto, user);
    return this.blogPostRepository.getPosts(filterDto);
  }
}
