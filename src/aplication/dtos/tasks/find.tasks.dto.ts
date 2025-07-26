import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class FindTasksDto {
  @ApiProperty({
    example: 5,
    description: 'ID do usuário para buscar suas tarefas'
  })
  @IsNumber({}, { message: 'O ID do usuário deve ser um número' })
  iduser: number
}
