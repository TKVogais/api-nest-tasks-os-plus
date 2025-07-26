import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })

export class UsersEntities {
  @PrimaryGeneratedColumn()
  iduser: number

  @Column({ type: "varchar" })
  usuario: string

  @Column({ type: "varchar" })
  senha: string
}