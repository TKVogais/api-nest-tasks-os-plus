import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tasks" })

export class TasksEntities {
  @PrimaryGeneratedColumn()
  idtask?: number

  @Column({ type: "varchar" })
  title: string

  @Column({ type: "varchar" })
  description: string

  @Column({ type: "varchar" })
  status: string

  @Column({ type: "varchar" })
  priority: string

  @Column({ type: "timestamptz" })
  timeofcompletion: Date

  @Column({ type: "timestamptz" })
  createdat: Date

  @Column({ type: "timestamptz" })
  updatedat: Date

  @Column({ type: "boolean" })
  completed: boolean

  @Column({type: "integer"})
  iduser?: number

}