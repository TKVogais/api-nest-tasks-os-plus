import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator'

export class CreateUserDto {
  @ApiPropertyOptional({ example: 1, description: 'ID do usuário (geralmente gerado pelo sistema)' })
  @IsOptional()
  iduser?: number

  @ApiProperty({ example: 'vogais', description: 'Nome do usuário' })
  @IsString()
  @IsNotEmpty({ message: 'O nome do usuário é obrigatório' })
  @MinLength(3, { message: 'O nome do usuário deve ter no mínimo 3 caracteres' })
  @MaxLength(30, { message: 'O nome do usuário deve ter no máximo 30 caracteres' })
  usuario: string

  @ApiProperty({ example: 'Testando@1', description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres' })
  senha: string
}
