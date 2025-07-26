import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { ResumeTasksEntity } from "./entities/resume.task.entity"
import { TasksEntities } from "./entities/tasks.entity"
import { UsersEntities } from "./entities/users.entity"
import { DataSource, DataSourceOptions } from "typeorm";

config();

const configService = new ConfigService()

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USERNAME"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  entities: [TasksEntities, UsersEntities, ResumeTasksEntity],
  migrations: [__dirname + "/migrations/*.ts"],
  synchronize: false
}

export default new DataSource(dataSourceOptions)