import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "resume_tasks" })
export class ResumeTasksEntity {
  @PrimaryGeneratedColumn()
  idtaskresume?: number

  @Column({ type: "integer" })
  iduser!: number

  @Column({ type: "integer", default: 0 })
  totaltasks: number

  @Column({ type: "integer", default: 0 })
  completedtasks: number

  @Column({ type: "integer", default: 0 })
  pendingtasks: number

  @Column({ type: "integer", default: 0 })
  latetasks: number

  @Column({ type: "numeric", precision: 5, scale: 2, default: 0 })
  percentcompleted: number

  @Column({ type: "numeric", precision: 5, scale: 2, default: 0 })
  percentpending: number

  @Column({ type: "numeric", precision: 5, scale: 2, default: 0 })
  percentlate: number

  @Column({ type: "timestamptz", default: () => "now()" })
  createdat: Date

  @Column({ type: "timestamptz", default: () => "now()" })
  updatedat: Date
}
