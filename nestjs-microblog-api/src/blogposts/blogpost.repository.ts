import { EntityRepository, Repository } from 'typeorm';
import { CreateBlogPostDto } from './dto/create-blogpost.dto';
import { BlogPost } from './blogpost.entity';
import { GetFilteredBlogPostsDto } from './dto/get-filtered-blogposts.dto';

@EntityRepository(BlogPost)
export class BlogPostRepository extends Repository<BlogPost> {
  async createPost(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const post = new BlogPost();
    const { title, content, richContent } = createBlogPostDto;
    post.title = title;
    post.content = content;
    post.richContent = richContent;

    //todo: map to users, but ill comment till i make auth
    // post.user = user;
    // await post.save();
    // delete post.user;
    await post.save();
    return post;
  }

  async getPosts(
    filterDto: GetFilteredBlogPostsDto,
    //, user: User
  ): Promise<BlogPost[]> {
    const searchPhrase = filterDto.searchPhrase;
    const query = this.createQueryBuilder('blog_post');
    if (searchPhrase) {
      query.andWhere(
        'blogpost.content LIKE :searchPhrase OR blogpost.title LIKE :searchPhrase',
        {
          searchPhrase: `%${searchPhrase}%`,
        },
      );
    }
    const posts = await query.getMany();
    return posts;
  }
}
