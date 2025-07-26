import { ResumeTasksEntity } from 'src/infrastructure/database/entities/resume.task.entity'
import { EntityManager } from 'typeorm'

export interface IResumeRepository {
  save(resume: ResumeTasksEntity, manager?: EntityManager): Promise<ResumeTasksEntity>
  findOneByUserId(iduser: number, manager?: EntityManager): Promise<ResumeTasksEntity | null>
  update(idtaskresume: number, resume: Partial<ResumeTasksEntity>, manager?: EntityManager): Promise<void>
}
