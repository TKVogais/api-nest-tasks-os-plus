import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export enum TaskStatusEnum {
  PENDENTE = "PENDENTE",
  CONCLUÍDA = "CONCLUÍDA",
  ATRASADA = "ATRASADA"
}

export enum TasksPrioritysEnum {
  ALTA = "ALTA",
  MÉDIA = "MÉDIA",
  BAIXA = "BAIXA"
}

export class CreateTaskDto {
  @ApiPropertyOptional({ example: 1, description: 'ID da tarefa (geralmente omitido na criação)' })
  @IsNumber()
  @IsOptional()
  idtask?: number

  @ApiProperty({ example: 'Concluir integração', description: 'Título da tarefa' })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string

  @ApiProperty({ example: 'Finalizar integração da API com o front-end', description: 'Descrição detalhada da tarefa' })
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  description: string

  @ApiPropertyOptional({
    enum: TaskStatusEnum,
    description: 'Status atual da tarefa'
  })
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: string

  @ApiPropertyOptional({
    enum: TasksPrioritysEnum,
    description: 'Prioridade da tarefa'
  })
  @IsEnum(TasksPrioritysEnum)
  @IsOptional()
  priority: string

  @ApiProperty({ example: '2025-07-27T18:00:00.000Z', description: 'Data prevista para conclusão da tarefa' })
  @IsDateString()
  timeofcompletion: Date

  @ApiProperty({ example: '2025-07-26T13:45:00.000Z', description: 'Data de criação da tarefa' })
  @IsDateString()
  createdat: Date

  @ApiProperty({ example: '2025-07-26T14:00:00.000Z', description: 'Data da última atualização da tarefa' })
  @IsDateString()
  updatedat: Date

  @ApiProperty({ example: false, description: 'Indica se a tarefa foi concluída' })
  @IsBoolean()
  completed: boolean

  @ApiPropertyOptional({ example: 5, description: 'ID do usuário responsável pela tarefa' })
  @IsNumber()
  @IsOptional()
  iduser?: number
}