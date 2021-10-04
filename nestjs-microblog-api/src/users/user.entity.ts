import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BlogPost } from 'src/blogposts/blogpost.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column()
  role: string;

  @OneToMany((type) => BlogPost, (blogpost) => blogpost.user, { eager: true })
  blogposts: BlogPost[];

  async isPasswordCorrect(password: string): Promise<boolean> {
    const generatedHash = await bcrypt.hash(password, this.salt);
    return generatedHash === this.password;
  }
}
