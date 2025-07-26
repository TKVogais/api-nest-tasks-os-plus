import { AuthUserDto } from "src/aplication/dtos/auth/auth.user.dto"
import { ResponseAuthDto } from "src/aplication/dtos/auth/response.auth.dto"

export interface IAuthService {
  login(authData: AuthUserDto): Promise<ResponseAuthDto>
  validateToken(token: string): Promise<{ auth: boolean }>
}