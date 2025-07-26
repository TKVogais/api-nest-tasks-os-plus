// infrastructure/repositories/task.repository.impl.ts

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TasksEntities } from '../../infrastructure/database/entities/tasks.entity'
import { ITasksRepository } from 'src/aplication/interfaces/repositorys/tasks.interface.repository'

@Injectable()
export class TasksRepository implements ITasksRepository {
  constructor(
    @InjectRepository(TasksEntities)
    private readonly tasksRepository: Repository<TasksEntities>,
  ) { }
  async update(idtask: number, task: Partial<TasksEntities>): Promise<void> {
    await this.tasksRepository.update(idtask, task)
  }

  async findByUserId(iduser: number): Promise<TasksEntities[]> {
    return await this.tasksRepository.find({ where: { iduser } })
  }

  async save(task: TasksEntities): Promise<TasksEntities> {
    const saved = await this.tasksRepository.save(task)
    return saved
  }

  async findById(idtask: number): Promise<TasksEntities | null> {
    const found = await this.tasksRepository.findOne({ where: { idtask } })
    return found ?? null
  }

  async delete(idtask: number): Promise<void> {
    await this.tasksRepository.delete(idtask)
  }
}
