import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') ?? ''
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('Token não fornecido.')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret
      })

      // ✅ Armazenar payload no request para uso posterior nos controllers
      request['usuario'] = payload
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.')
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
