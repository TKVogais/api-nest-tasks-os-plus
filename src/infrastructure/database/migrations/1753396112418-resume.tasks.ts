import { MigrationInterface, QueryRunner } from "typeorm";

export class ResumeTask1753396112418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE resume_tasks (
        idtaskresume SERIAL PRIMARY KEY,
        iduser integer NOT NULL,
        totaltasks integer NOT NULL DEFAULT 0,
        completedtasks integer NOT NULL DEFAULT 0,
        pendingtasks integer NOT NULL DEFAULT 0,
        latetasks integer NOT NULL DEFAULT 0,
        percentcompleted numeric(5,2) NOT NULL DEFAULT 0, -- Ex: 75.50%
        percentpending numeric(5,2) NOT NULL DEFAULT 0,
        percentlate numeric(5,2) NOT NULL DEFAULT 0,
        createdat timestamptz NOT NULL DEFAULT now(),
        updatedat timestamptz NOT NULL DEFAULT now(),
        CONSTRAINT fk_user_resume_tasks FOREIGN KEY (iduser) REFERENCES users(iduser) ON DELETE CASCADE
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS resume_tasks")
  }
}

