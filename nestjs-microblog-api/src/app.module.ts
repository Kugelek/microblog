import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), PostsModule, UsersModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
