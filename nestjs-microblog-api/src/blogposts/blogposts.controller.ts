import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';
import { BlogPostsService } from './blogposts.service';
import { BlogPost } from './blogpost.entity';
import { GetFilteredBlogPostsDto } from './dto/get-filtered-blogposts.dto';

@Controller('blogposts')
export class BlogPostsController {
  constructor(private blogPostsService: BlogPostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    return this.blogPostsService.createPost(createBlogPostDto);
  }

  @Get()
  getPosts(
    @Query(ValidationPipe) filteredBlogPostsDto: GetFilteredBlogPostsDto,
  ): Promise<BlogPost[]> {
    return this.blogPostsService.getPosts(filteredBlogPostsDto);
  }

  // @Delete('/:id')
  // deletePost(
  //   @Param('id', ParseIntPipe) id: number,
  //   @GetUser() user: User,
  // ): Promise<void> {
  //   return this.blogPostsService.deletePost(id, user);
  // }
}
