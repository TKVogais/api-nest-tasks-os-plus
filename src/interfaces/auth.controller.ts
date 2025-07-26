import { Controller, Get, Post, Body, Req, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AuthService } from '../domain/services/auth.service'
import { AuthUserDto } from 'src/aplication/dtos/auth/auth.user.dto'
import { ResponseAuthDto } from 'src/aplication/dtos/auth/response.auth.dto'

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login do usuário' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso', type: ResponseAuthDto })
  @ApiResponse({ status: 400, description: 'Os dados fornecidos estão incorretos' })
  @ApiResponse({ status: 500, description: 'Falha ao realizar o login' })
  @HttpCode(HttpStatus.OK)
  async create(@Body() createAuthDto: AuthUserDto): Promise<ResponseAuthDto> {
    return await this.authService.login(createAuthDto)
  }

  @Get()
  @ApiOperation({ summary: 'Validar token JWT' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Token válido' })
  @ApiResponse({ status: 401, description: 'Token inválido ou ausente' })
  async validatetoken(@Req() req: Request) {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        auth: false
      }
    }

    const token = authHeader.split(' ')[1]

    return this.authService.validateToken(token)
  }
}
