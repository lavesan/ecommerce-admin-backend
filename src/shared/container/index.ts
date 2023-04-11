import { container } from "tsyringe";

import { IProductRepository } from "@modules/product/repositories/IProductRepository";
import { ProductRepository } from "@modules/product/repositories/ProductRepository";

import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { UserRepository } from "@modules/user/repositories/UserRepository";

// import { IProductRepository } from "@modules/user/repositories/";
// import { ProductRepository } from "@modules/product/repositories/ProductRepository";

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
