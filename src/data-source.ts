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
import { Address } from "@modules/client/entities/Address";
import { Client } from "@modules/client/entities/Client";
import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import { Freight } from "@modules/freight/entities/Freight";
import { Promotion } from "@modules/promotion/entities/Promotion";
import { PromotionProduct } from "@modules/promotion/entities/PromotionProduct";
import { Schedule } from "@modules/enterprise/entities/Schedule";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "success_commerce",
  synchronize: true,
  // logging: true,
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
