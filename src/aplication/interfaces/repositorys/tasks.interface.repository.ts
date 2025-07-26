import { TasksEntities } from 'src/infrastructure/database/entities/tasks.entity'

export interface ITasksRepository {
  save(task: TasksEntities): Promise<TasksEntities>
  update(idtask: number, task: Partial<TasksEntities>): Promise<void>
  findByUserId(iduser: number): Promise<TasksEntities[]>
  findById(idtask: number): Promise<TasksEntities | null>
  delete(idtask: number): Promise<void>
}
