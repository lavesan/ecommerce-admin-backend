import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "@modules/user/entities/User";
import { Product } from "@modules/product/entities/Product";
import { Category } from "@modules/product/entities/Category";
import { ProductAdditional } from "@modules/product/entities/ProductAdditional";
import { ProductAdditionalCategory } from "@modules/product/entities/ProductAdditionalCategory";
import { Order } from "@modules/order/entities/Order";
import { OrderProduct } from "@modules/order/entities/OrderProduct";
import { OrderProductAdditional } from "@modules/order/entities/OrderProductAdditional";

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
  migrations: [__dirname + "/shared/migration/*.ts"],
  entities: [
    User,
    Category,
    Product,
    ProductAdditional,
    ProductAdditionalCategory,
    Order,
    OrderProduct,
    OrderProductAdditional,
  ],
});

export function createConnection(
  host = "database_ignite"
): Promise<DataSource> {
  return AppDataSource.initialize();
  // return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
