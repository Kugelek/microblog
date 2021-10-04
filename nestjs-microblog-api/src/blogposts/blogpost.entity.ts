//import { User } from 'src/users/user.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BlogPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  richContent: string;
  @ManyToOne((type) => User, (user) => user.blogposts, { eager: false })
  user: User;

  @Column()
  userId: number;

  //tags
  //comments
}
