import { DataSource } from "typeorm";
import { User } from "@modules/user/entities/User";
import { Product } from "@modules/product/entities/Product";
import { Category } from "@modules/product/entities/Category";
import { ProductAdditional } from "@modules/product/entities/ProductAdditional";
import { ProductAdditionalCategory } from "@modules/product/entities/ProductAdditionalCategory";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "success_commerce",
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: ["./src/shared/infra/migration/*.ts"],
  entities: [
    User,
    Product,
    Category,
    ProductAdditional,
    ProductAdditionalCategory,
  ],
});

export function createConnection(
  host = "database_ignite"
): Promise<DataSource> {
  return AppDataSource.initialize();
  // return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
