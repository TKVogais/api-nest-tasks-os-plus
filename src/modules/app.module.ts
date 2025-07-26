import { AuthController } from './../interfaces/auth.controller';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks.module';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db.module';
import { ResumeModule } from './resume.module';
import { TasksController } from 'src/interfaces/tasks.controller';
import { UsersController } from 'src/interfaces/users.controller';

@Module({
  imports: [TasksModule, UsersModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), DbModule, ResumeModule],
  controllers: [TasksController, UsersController, AuthController],
  providers: [],
})
export class AppModule { }
