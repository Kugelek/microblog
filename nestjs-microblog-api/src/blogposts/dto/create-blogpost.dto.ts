import { IsNotEmpty } from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  richContent: string;
}
