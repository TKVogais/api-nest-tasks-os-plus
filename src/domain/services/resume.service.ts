import { Inject, Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { ResumeTasksEntity } from 'src/infrastructure/database/entities/resume.task.entity'
import { IResumeRepository } from 'src/aplication/interfaces/repositorys/resume.interface.repository'
import { IResumeService } from 'src/aplication/interfaces/services/resume.interface.service'

@Injectable()
export class ResumeService implements IResumeService {
  constructor(
    @Inject('IResumeRepository')
    private readonly resumeRepository: IResumeRepository,
  ) {}

  async createResume(iduser: number, manager?: EntityManager): Promise<boolean> {
    try {
      const resumeTask: ResumeTasksEntity = {
        iduser: iduser,
        totaltasks: 0,
        completedtasks: 0,
        pendingtasks: 0,
        latetasks: 0,
        percentcompleted: 0,
        percentpending: 0,
        percentlate: 0,
        createdat: new Date(),
        updatedat: new Date(),
      }

      await this.resumeRepository.save(resumeTask, manager)

      return false
    } catch (error) {
      return true
    }
  }

  async findResume(iduser: number): Promise<ResumeTasksEntity | null> {
    return this.resumeRepository.findOneByUserId(iduser)
  }

  async updateResume(resume: ResumeTasksEntity): Promise<boolean> {
    if (!resume.idtaskresume) {
      throw new Error("idtaskresume inválido")
    }

    const { idtaskresume, ...partialResume } = resume
    partialResume.updatedat = new Date()

    try {
      await this.resumeRepository.update(idtaskresume, partialResume)
      return false
    } catch {
      return true
    }
  }
}
