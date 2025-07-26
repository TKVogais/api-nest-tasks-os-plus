import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { TasksService } from '../domain/services/tasks.service'
import { AuthGuard } from 'src/shared/guards/auth.guard'

import { CreateTaskDto } from 'src/aplication/dtos/tasks/create.task.dto'
import { ResponseFindAllTasksDto } from 'src/aplication/dtos/tasks/find.all.tasks.dto'
import { UpdateTaskDto } from 'src/aplication/dtos/tasks/update.task.dto'
import { ResponseTaskDto } from 'src/aplication/dtos/tasks/response.task.dto'
import { FindTasksDto } from 'src/aplication/dtos/tasks/find.tasks.dto'
import { DeleteTaskDto } from 'src/aplication/dtos/tasks/delete.task.dto'

@ApiTags('Tarefas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso', type: ResponseTaskDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos para criação da tarefa' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 500, description: 'Falha ao realizar cadastrar a tarefa' })
  create(@Body() createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
    return this.tasksService.create(createTaskDto)
  }

  @Post('list')
  @ApiOperation({ summary: 'Listar tarefas do usuário' })
  @ApiResponse({ status: 200, description: 'Listagem concluída com sucesso', type: ResponseFindAllTasksDto })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 400, description: 'Não foi encontrada nenhuma correspondência' })
  @ApiResponse({ status: 500, description: 'Falha ao listar as tarefas' })
  findAll(@Body() findTasks: FindTasksDto): Promise<ResponseFindAllTasksDto> {
    return this.tasksService.findAll(findTasks.iduser)
  }

  @Post('update')
  @ApiOperation({ summary: 'Atualizar tarefa existente' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso', type: ResponseTaskDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos para atualização' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 500, description: 'Falha ao atualizar a tarefa' })
  update(@Body() updateTaskDto: UpdateTaskDto): Promise<ResponseTaskDto> {
    return this.tasksService.update(updateTaskDto)
  }

  @Post('delete')
  @ApiOperation({ summary: 'Deletar tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa removida com sucesso', type: ResponseTaskDto })
  @ApiResponse({ status: 400, description: 'ID da tarefa inválido' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 500, description: 'Falha ao deletar a tarefa' })
  remove(@Body() deleteTaskDto: DeleteTaskDto): Promise<ResponseTaskDto> {
    return this.tasksService.remove(deleteTaskDto.idtask)
  }
}
