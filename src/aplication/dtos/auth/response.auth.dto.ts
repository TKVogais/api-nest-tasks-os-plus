import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class ResponseAuthDto {
  @ApiProperty({ example: 1, description: 'ID do usuário autenticado' })
  @IsOptional()
  @IsNumber({}, { message: 'O ID do usuário deve ser um número' })
  iduser?: number
  //=============================
  @ApiProperty({ example: 'vogais', description: 'Nome do usuário autenticado' })
  @IsOptional()
  @IsString({ message: 'O nome do usuário deve ser uma string' })
  usuario?: string
  //=============================
  @ApiProperty({ example: 'Login realizado com sucesso!', description: 'Mensagem de Feedback para o usuário' })
  @IsString({ message: 'A mensagem deve ser uma string' })
  message: string
  //=============================
  @ApiProperty({ example: 200, description: 'Status de resposta para o front-end' })
  @IsNumber({}, { message: 'O status deve ser um número' })
  status: number
  //=============================
  @ApiProperty({ example: 'mocked.token.29324SxyuwL', description: 'Token JWT para autenticação' })
  @IsOptional()
  @IsString({ message: 'O token deve ser uma string' })
  token?: string
}
