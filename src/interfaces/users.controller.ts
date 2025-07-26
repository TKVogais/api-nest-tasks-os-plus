import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UsersService } from '../domain/services/users.service'
import { CreateUserDto } from 'src/aplication/dtos/users/create.users.dto'
import { ResponseCreateUserDto } from 'src/aplication/dtos/users/response.create.users.dto'

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: ResponseCreateUserDto })
  @ApiResponse({ status: 400, description: 'Usuário já cadastrado' })
  @ApiResponse({ status: 500, description: 'Falha ao cadastrar o usuário' })
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseCreateUserDto> {
    return this.usersService.create(createUserDto)
  }
}
