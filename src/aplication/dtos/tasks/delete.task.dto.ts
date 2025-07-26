import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class DeleteTaskDto {
  @ApiProperty({
    example: 1,
    description: 'ID da tarefa que será removida'
  })
  @IsNumber({}, { message: 'O ID da tarefa deve ser um número' })
  idtask: number
}
