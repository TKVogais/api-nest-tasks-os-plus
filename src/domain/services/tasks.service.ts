import { ResponseTaskDto } from './../../aplication/dtos/tasks/response.task.dto';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager} from 'typeorm';
import { TasksEntities } from 'src/infrastructure/database/entities/tasks.entity';
import { ResumeTasksEntity } from 'src/infrastructure/database/entities/resume.task.entity';
import { ResumeService } from './resume.service';
import { ITasksRepository } from 'src/aplication/interfaces/repositorys/tasks.interface.repository';
import { ITasksService } from 'src/aplication/interfaces/services/tasks.interface.service';
import { CreateTaskDto, TaskStatusEnum } from 'src/aplication/dtos/tasks/create.task.dto';
import { ResponseFindAllTasksDto } from 'src/aplication/dtos/tasks/find.all.tasks.dto';
import { UpdateTaskDto } from 'src/aplication/dtos/tasks/update.task.dto';

@Injectable()
export class TasksService implements ITasksService {

  constructor(
   @Inject('ITasksRepository')
    private readonly tasksRepository: ITasksRepository,
    private readonly resumeService: ResumeService,
    private readonly dataSource: DataSource
  ) {}

  async create(task: CreateTaskDto): Promise<ResponseTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      try {
        const taskToSave: TasksEntities = {
          title: task.title,
          description: task.description,
          timeofcompletion: this.ajustTimeOfCompletion(task.timeofcompletion),
          createdat: new Date(),
          updatedat: new Date(),
          status: TaskStatusEnum.PENDENTE,
          priority: task.priority,
          completed: false,
          iduser: task.iduser
        }

        await this.tasksRepository.save(taskToSave)
        if (!task.iduser) {
          throw new Error("")
        }
        await this.updateUserResume(manager, task.iduser)

        return {
          message: "Tarefa cadastrada com sucesso!",
          status: 200
        }
      } catch (error) {
        console.error(error)
        return {
          message: "Falha ao cadastrar a tarefa!",
          status: 500
        }
      }
    })
  }

  async update(task: UpdateTaskDto): Promise<ResponseTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      try {
        if (!task.idtask || !task.iduser) throw new Error("ID inválido")

        const taskToUpdate: Partial<TasksEntities> = {
          title: task.title,
          description: task.description,
          timeofcompletion: task.timeofcompletion,
          updatedat: new Date(),
          status: task.status,
          priority: task.priority,
          completed: task.status === TaskStatusEnum.CONCLUÍDA
        }

        await this.tasksRepository.update(task.idtask, taskToUpdate)

        await this.updateUserResume(manager, task.iduser)

        return {
          message: "Tarefa atualizada com sucesso!",
          status: 200
        }
      } catch (error) {
        console.error(error)
        return {
          message: "Falha ao atualizar a tarefa!",
          status: 500
        }
      }
    })
  }

  async remove(idtask: number): Promise<ResponseTaskDto> {
    return this.dataSource.transaction(async (manager) => {
      try {
        const task = await manager.findOne(TasksEntities, { where: { idtask } })
        if (!task) throw new Error("Tarefa não encontrada")

        await manager.delete(TasksEntities, { idtask })
        if (!task.iduser) {
          throw new Error("")
        }
        await this.updateUserResume(manager, task.iduser)

        return {
          message: "Tarefa excluída com sucesso!",
          status: 200
        }
      } catch (error) {
        console.error(error)
        return {
          message: "Falha ao excluir a tarefa!",
          status: 500
        }
      }
    })
  }

  private async updateUserResume(manager: EntityManager, iduser: number): Promise<void> {
    const allTasks = await manager.find(TasksEntities, { where: { iduser } })

    const totalTasks = allTasks.length
    const completedTasks = allTasks.filter(t => t.completed).length
    const pendingTasks = totalTasks - completedTasks
    const lateTasks = allTasks.filter(t => t.status === "ATRASADA").length

    const percent = (value: number) => totalTasks === 0 ? 0 : Number(((value / totalTasks) * 100).toFixed(2))

    const resume = await manager.findOne(ResumeTasksEntity, { where: { iduser } })
    if (!resume) throw new Error("Resumo não encontrado")

    resume.totaltasks = totalTasks
    resume.completedtasks = completedTasks
    resume.pendingtasks = pendingTasks
    resume.latetasks = lateTasks
    resume.percentcompleted = percent(completedTasks)
    resume.percentpending = percent(pendingTasks)
    resume.percentlate = percent(lateTasks)
    resume.updatedat = new Date()

    await manager.save(ResumeTasksEntity, resume)
  }


  async findAll(iduser: number): Promise<ResponseFindAllTasksDto> {
    let tasks: TasksEntities[] = []
    let resume: ResumeTasksEntity | null = null

    try {
      // Busca todas as tarefas do usuário
      tasks = await this.tasksRepository.findByUserId(iduser)

      // Busca o resumo do usuário
      const resumeEntity = await this.resumeService.findResume(iduser)

      if (!resumeEntity) throw new Error("Resumo não encontrado")

      return {
        tasks,
        resumeTasks: resumeEntity,
        message: "Listagem completa com sucesso!",
        status: 200
      }
    } catch (error) {
      console.log(error)

      return {
        tasks,
        resumeTasks: resume as any, // ou {} as ResumeDto se você quiser evitar o null
        message: "Erro ao buscar tarefas e resumo",
        status: 500
      }
    }
  }

  

  private ajustTimeOfCompletion(original: string | Date): Date {
    const originalDate = new Date(original)
    const limiteDia = new Date(originalDate)
    limiteDia.setHours(23, 59, 59, 999) // Último milissegundo do dia

    const novaData = new Date(originalDate)
    novaData.setHours(novaData.getHours() + 10)

    // Retorna a menor entre novaData e limiteDia
    return novaData > limiteDia ? limiteDia : novaData
  }
}
