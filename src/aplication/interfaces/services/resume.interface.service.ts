import { ResumeTasksEntity } from 'src/infrastructure/database/entities/resume.task.entity'
import { EntityManager } from 'typeorm'

export interface IResumeService {
  createResume(iduser: number, manager?: EntityManager): Promise<boolean>
  findResume(iduser: number): Promise<ResumeTasksEntity | null>
  updateResume(resume: ResumeTasksEntity): Promise<boolean>
}
