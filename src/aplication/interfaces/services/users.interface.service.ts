import { CreateUserDto } from 'src/aplication/dtos/users/create.users.dto'
import { ResponseCreateUserDto } from 'src/aplication/dtos/users/response.create.users.dto'
import { ResponseUserDto } from 'src/aplication/dtos/users/response.user.dto'

export interface IUsersService {
  create(user: CreateUserDto): Promise<ResponseCreateUserDto>
  findOne(usuario: string): Promise<ResponseUserDto | undefined>
}
