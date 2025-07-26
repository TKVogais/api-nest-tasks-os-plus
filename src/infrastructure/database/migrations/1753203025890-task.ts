import { MigrationInterface, QueryRunner } from "typeorm";

export class Tasks1753203025890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE tasks (
        idtask SERIAL PRIMARY KEY,
        title varchar(256) NOT NULL,
        description varchar(256) NOT NULL,
        completed boolean NOT NULL DEFAULT false,
        createdat timestamptz NOT NULL,
        updatedat timestamptz NOT NULL,
        timeofcompletion timestamptz NOT NULL,
        status varchar(50) NOT NULL DEFAULT 'PENDENTE',
        priority varchar(50) NOT NULL DEFAULT 'BAIXA',
        iduser integer NOT NULL,
        CONSTRAINT fk_user_task FOREIGN KEY (iduser) REFERENCES users(iduser) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE IF EXISTS tasks");
  }
}
