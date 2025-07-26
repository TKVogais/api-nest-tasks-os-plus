import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, EntityManager } from 'typeorm'
import { ResumeTasksEntity } from 'src/infrastructure/database/entities/resume.task.entity'
import { IResumeRepository } from 'src/aplication/interfaces/repositorys/resume.interface.repository'

@Injectable()
export class ResumeRepository implements IResumeRepository {
  constructor(
    @InjectRepository(ResumeTasksEntity)
    private readonly resumeRepository: Repository<ResumeTasksEntity>
  ) { }

  async save(resume: ResumeTasksEntity, manager?: EntityManager): Promise<ResumeTasksEntity> {
    const repository = manager ? manager.getRepository(ResumeTasksEntity) : this.resumeRepository
    return await repository.save(resume)
  }

  async findOneByUserId(iduser: number, manager?: EntityManager): Promise<ResumeTasksEntity | null> {
    const repository = manager ? manager.getRepository(ResumeTasksEntity) : this.resumeRepository
    return await repository.findOne({ where: { iduser } })
  }

  async update(idtaskresume: number, partialResume: Partial<ResumeTasksEntity>, manager?: EntityManager): Promise<void> {
    const repository = manager ? manager.getRepository(ResumeTasksEntity) : this.resumeRepository
    await repository.update(idtaskresume, partialResume)
  }
}
