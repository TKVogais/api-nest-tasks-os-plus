import { Injectable } from "@nestjs/common";
import { IUsersRepository } from "src/aplication/interfaces/repositorys/users.interface.repository";
import { UsersEntities } from "../../infrastructure/database/entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class UsersRepository implements IUsersRepository {

  constructor(
    @InjectRepository(UsersEntities)
    private readonly usersRepository: Repository<UsersEntities>,
  ) { }

  async create(user: Partial<UsersEntities>, manager?: EntityManager): Promise<UsersEntities> {
    const repository = manager? manager.getRepository(UsersEntities): this.usersRepository
    return await repository.save(user)
  }
  async findOneByUsuario(usuario: string): Promise<UsersEntities | null> {
    return await this.usersRepository.findOne({
      where: { usuario }
    })
  }

}