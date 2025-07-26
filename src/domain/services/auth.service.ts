// src/domain/services/auth.service.ts

import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { compareSync as bcryptCompareSync } from 'bcrypt'
import { IAuthService } from 'src/aplication/interfaces/services/auth.interface.service'
import { IUsersService } from 'src/aplication/interfaces/services/users.interface.service'
import { AuthUserDto } from 'src/aplication/dtos/auth/auth.user.dto'
import { ResponseAuthDto } from 'src/aplication/dtos/auth/response.auth.dto'

@Injectable()
export class AuthService implements IAuthService {
  private jwtSecret: string

  constructor(
    @Inject('IUsersService')
    private readonly usersService: IUsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') ?? ''
  }

  async login(authUser: AuthUserDto): Promise<ResponseAuthDto> {
    try {
      const foundUser = await this.usersService.findOne(authUser.usuario)

      if (!foundUser || !bcryptCompareSync(authUser.senha, foundUser.senha)) {
        return {
          message: 'Os dados fornecidos estão incorretos!',
          status: 400
        }
      }

      const payload = { sub: foundUser.iduser, usuario: foundUser.usuario }
      const token = this.jwtService.sign(payload)

      return {
        iduser: foundUser.iduser,
        usuario: foundUser.usuario,
        token,
        status: 200,
        message: 'Login realizado com sucesso!'
      }
    } catch (error) {
      console.error(error)
      return {
        message: 'Falha ao realizar o login!',
        status: 500
      }
    }
  }

  async validateToken(token: string): Promise<{ auth: boolean }> {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret
      })

      return { auth: true }
    } catch {
      return { auth: false }
    }
  }
}
