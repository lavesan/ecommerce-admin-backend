import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { User } from "@modules/user/entities/User";
import { Product } from "@modules/product/entities/Product";
import { Category } from "@modules/product/entities/Category";
import { ProductAdditional } from "@modules/product/entities/ProductAdditional";
import { ProductAdditionalCategory } from "@modules/product/entities/ProductAdditionalCategory";
import { Order } from "@modules/order/entities/Order";
import { OrderProduct } from "@modules/order/entities/OrderProduct";
import { OrderProductAdditional } from "@modules/order/entities/OrderProductAdditional";
import { Address } from "@modules/client/entities/Address";
import { Client } from "@modules/client/entities/Client";
import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import { Freight } from "@modules/freight/entities/Freight";
import { Promotion } from "@modules/promotion/entities/Promotion";
import { PromotionProduct } from "@modules/promotion/entities/PromotionProduct";
import { Schedule } from "@modules/enterprise/entities/Schedule";

dotenv.config();

let dbConnection =
  process.env.NODE_ENV === "dev"
    ? {
        host: process.env.POSTGRES_HOST || "localhost",
        port: 5432,
        username: process.env.POSTGRES_USER || "postgres",
        password: process.env.POSTGRES_PASSWORD || "postgres",
        database: process.env.POSTGRES_DATABASE || "success_commerce",
      }
    : {
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      };

const AppDataSource = new DataSource({
  ...dbConnection,
  type: "postgres",
  synchronize: true,
  logging: process.env.NODE_ENV !== "dev",
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
    Client,
    Address,
    Enterprise,
    Freight,
    Promotion,
    PromotionProduct,
    Schedule,
  ],
});

export function createConnection(
  host = "database_ignite"
): Promise<DataSource> {
  return AppDataSource.initialize();
  // return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;
