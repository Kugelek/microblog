import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { BlogPostRepository } from './blogpost.repository';
import { BlogPostsController } from './blogposts.controller';
import { BlogPostsService } from './blogposts.service';

@Module({
  //imports: [TypeOrmModule.forFeature([BlogPostRepository]), AuthModule],
  imports: [TypeOrmModule.forFeature([BlogPostRepository])],
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
})
export class BlogPostsModule {}
