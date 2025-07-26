// tasks/tasks.module.ts

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksEntities } from 'src/infrastructure/database/entities/tasks.entity'
import { ResumeTasksEntity } from 'src/infrastructure/database/entities/resume.task.entity'
import { TasksService } from 'src/domain/services/tasks.service'
import { ResumeService } from 'src/domain/services/resume.service'
import { TasksRepository } from 'src/domain/repositorys/tasks.repository'
import { ResumeModule } from './resume.module'

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntities, ResumeTasksEntity]), ResumeModule],
  providers: [
    TasksService,
    {
      provide: 'ITasksRepository',
      useClass: TasksRepository,
    },
    {
      provide: 'ITasksService',
      useClass: TasksService,
    }
  ],
  exports: [TasksService],
})
export class TasksModule { }
