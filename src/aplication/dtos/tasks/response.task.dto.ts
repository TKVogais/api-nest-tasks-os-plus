import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class ResponseTaskDto {
  @ApiProperty({
    example: 'Operação realizada com sucesso!',
    description: 'Mensagem de feedback para o usuário'
  })
  @IsString({ message: 'A mensagem deve ser uma string' })
  message: string

  @ApiProperty({
    example: 200,
    description: 'Código de status da operação'
  })
  @IsNumber({}, { message: 'O status deve ser um número' })
  status: number
}
