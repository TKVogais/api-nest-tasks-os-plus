import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class AuthUserDto {
  @ApiProperty({ example: 'vogais', description: 'Nome do usuário' })
  @IsString({ message: 'O nome de usuário deve ser uma string' })
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  @MinLength(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres' })
  @MaxLength(30, { message: 'O nome de usuário deve ter no máximo 30 caracteres' })
  usuario: string
  //=============================
  @ApiProperty({ example: 'Testando@1', description: 'Senha do Usuário' })
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres' })
  senha: string
}
