import { DataSource } from "typeorm";
import { Agent } from "@modules/agent/entities/Agent";

const AppDataSource = new DataSource({
  type: "mongodb",
  host: "mongo-express",
  port: 27017,
  synchronize: true,
  // username: "postgres",
  // password: "postgres",
  database: "digitro",
  logging: true,
  subscribers: [],
  migrations: ["./src/database/migrations/*.ts"],
  entities: [Agent],
});

export function createConnection(host = "database_ignite") {
  return AppDataSource.initialize();
  // return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
