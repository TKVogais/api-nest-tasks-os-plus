import { UsersEntities } from 'src/infrastructure/database/entities/users.entity'
import { EntityManager } from 'typeorm'

export interface IUsersRepository {
  create(user: Partial<UsersEntities>, manager?: EntityManager): Promise<UsersEntities>
  findOneByUsuario(usuario: string): Promise<UsersEntities | null>
}
