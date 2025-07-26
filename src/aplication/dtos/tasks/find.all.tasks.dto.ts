import { ApiProperty } from '@nestjs/swagger'
import { ResponseTaskDto } from './response.task.dto'
import { TasksEntities } from 'src/infrastructure/database/entities/tasks.entity'
import { ResumeTasksEntity } from 'src/infrastructure/database/entities/resume.task.entity'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested, IsObject } from 'class-validator'

export class ResponseFindAllTasksDto extends ResponseTaskDto {
  @ApiProperty({
    type: [TasksEntities],
    description: 'Lista de tarefas encontradas'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TasksEntities)
  tasks: TasksEntities[]

  @ApiProperty({
    type: ResumeTasksEntity,
    description: 'Resumo das tarefas (quantidades, totais, etc.)'
  })
  @IsObject()
  @ValidateNested()
  @Type(() => ResumeTasksEntity)
  resumeTasks: ResumeTasksEntity
}
