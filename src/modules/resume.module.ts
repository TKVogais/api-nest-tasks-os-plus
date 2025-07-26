import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResumeTasksEntity } from 'src/infrastructure/database/entities/resume.task.entity'
import { ResumeRepository } from 'src/domain/repositorys/resume.repository'
import { ResumeService } from 'src/domain/services/resume.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ResumeTasksEntity]) // importante registrar a entidade
  ],
  providers: [
    ResumeService,
    {
      provide: 'IResumeRepository',
      useClass: ResumeRepository,
    }
  ],
  exports: [ResumeService]
})
export class ResumeModule {}
