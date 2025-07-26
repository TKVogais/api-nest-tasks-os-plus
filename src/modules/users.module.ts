import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from '../domain/services/users.service'
import { UsersController } from '../interfaces/users.controller'
import { UsersEntities } from 'src/infrastructure/database/entities/users.entity'
import { ResumeModule } from './resume.module'
import { UsersRepository } from 'src/domain/repositorys/users.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntities]),
    ResumeModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'IUsersRepository',
      useClass: UsersRepository,
    },
    {
      provide: 'IUsersService',
      useClass: UsersService,
    },
  ],
  exports: ['IUsersService', UsersService, TypeOrmModule],
})
export class UsersModule {}


