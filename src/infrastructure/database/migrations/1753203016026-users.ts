import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1753203016026 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`
            CREATE TABLE users(
                iduser SERIAL PRIMARY KEY,
                usuario varchar(256) not null,
                senha varchar(256) not null,
                CONSTRAINT user_un_usuario UNIQUE (usuario)
            )    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE IF EXISTS users")
    }

}
