import { CreateTaskDto } from 'src/aplication/dtos/tasks/create.task.dto'
import { ResponseTaskDto } from 'src/aplication/dtos/tasks/response.task.dto'
import { UpdateTaskDto } from 'src/aplication/dtos/tasks/update.task.dto'

export interface ITasksService {
  create(task: CreateTaskDto): Promise<ResponseTaskDto>
  update(task: UpdateTaskDto): Promise<ResponseTaskDto>
  remove(idtask: number): Promise<ResponseTaskDto>
  findAll(iduser: number): Promise<ResponseTaskDto>
}
