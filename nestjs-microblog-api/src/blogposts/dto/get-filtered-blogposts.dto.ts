import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetFilteredBlogPostsDto {
  @IsOptional()
  @IsNotEmpty()
  searchPhrase: string;
}
