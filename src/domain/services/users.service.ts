import { Inject, Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { hashSync as bcryptHashSync } from 'bcrypt'
import { ResumeService } from './resume.service'
import { IUsersService } from 'src/aplication/interfaces/services/users.interface.service'
import { CreateUserDto } from 'src/aplication/dtos/users/create.users.dto'
import { ResponseCreateUserDto } from 'src/aplication/dtos/users/response.create.users.dto'
import { IUsersRepository } from 'src/aplication/interfaces/repositorys/users.interface.repository'
import { ResponseUserDto } from 'src/aplication/dtos/users/response.user.dto'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
    private readonly resumeService: ResumeService,
    private readonly dataSource: DataSource
  ) {}

  async create(userDto: CreateUserDto): Promise<ResponseCreateUserDto> {
    try {
      const usuarioExistente = await this.userRepository.findOneByUsuario(userDto.usuario)
      if (usuarioExistente) {
        return {
          message: 'Usuário já está cadastrado!',
          status: 400
        }
      }

      const savedUser = await this.dataSource.transaction(async (manager) => {
        const hashedPassword = bcryptHashSync(userDto.senha, 10)

        const newUser = await this.userRepository.create(
          {
            usuario: userDto.usuario,
            senha: hashedPassword
          },
          manager
        )

        const resumeResult = await this.resumeService.createResume(newUser.iduser,
          manager
        )

        if (resumeResult) throw new Error('Erro ao criar resumo')

        return newUser
      })

      return {
        iduser: savedUser.iduser,
        usuario: savedUser.usuario,
        message: 'Usuário cadastrado com sucesso!',
        status: 200
      }
    } catch (error) {
      console.error(error)
      return {
        message: 'Falha ao cadastrar o usuário!',
        status: 500
      }
    }
  }

  async findOne(usuario: string): Promise<ResponseUserDto | undefined> {
    const user = await this.userRepository.findOneByUsuario(usuario)
    if (!user) return undefined

    return {
      iduser: user.iduser,
      usuario: user.usuario,
      senha: user.senha
    }
  }
}
