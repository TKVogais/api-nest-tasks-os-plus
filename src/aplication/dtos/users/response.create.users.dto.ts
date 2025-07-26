import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class ResponseCreateUserDto {
  @ApiPropertyOptional({ example: 1, description: 'ID do usuário criado' })
  @IsOptional()
  @IsNumber({}, { message: 'O ID do usuário deve ser um número' })
  iduser?: number

  @ApiPropertyOptional({ example: 'vogais', description: 'Nome do usuário criado' })
  @IsOptional()
  @IsString({ message: 'O nome do usuário deve ser uma string' })
  usuario?: string

  @ApiProperty({ example: 'Usuário criado com sucesso!', description: 'Mensagem de feedback' })
  @IsString({ message: 'A mensagem deve ser uma string' })
  message: string

  @ApiProperty({ example: 201, description: 'Código de status da resposta' })
  @IsNumber({}, { message: 'O status deve ser um número' })
  status: number
}
