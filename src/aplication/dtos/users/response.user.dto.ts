import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class ResponseUserDto {
  @ApiPropertyOptional({ example: 1, description: 'ID do usuário' })
  @IsOptional()
  iduser?: number

  @ApiProperty({ example: 'vogais', description: 'Nome do usuário' })
  @IsString()
  usuario: string

  @ApiProperty({ example: 'Testando@1', description: 'Senha do usuário' })
  @IsString()
  senha: string
}
