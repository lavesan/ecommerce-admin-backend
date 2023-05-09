import { container } from "tsyringe";

import { IProductRepository } from "@modules/product/repositories/IProductRepository";
import { ProductRepository } from "@modules/product/repositories/ProductRepository";

import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { UserRepository } from "@modules/user/repositories/UserRepository";

import { CategoryRepository } from "@modules/product/repositories/CategoryRepository";
import { ICategoryRepository } from "@modules/product/repositories/ICategoryRespository";

import { OrderRepository } from "@modules/order/repositories/OrderRepository";
import { IOrderRepository } from "@modules/order/repositories/IOrderRepository";

import { ClientRepository } from "@modules/client/repositories/ClientRepository";
import { IClientRepository } from "@modules/client/repositories/IClientRepository";

import { EnterpriseRepository } from "@modules/enterprise/repositories/EnterpriseRepository";
import { IEnterpriseRepository } from "@modules/enterprise/repositories/IEnterpriseRepository";

import { PromotionRepository } from "@modules/promotion/repositories/PromotionRepository";
import { IPromotionRepository } from "@modules/promotion/repositories/IPromotionRepository";

import { FreightRepository } from "@modules/freight/repositories/FreightRepository";
import { IFreightRepository } from "@modules/freight/repositories/IFreightRepositorty";

import { AWSS3Repository } from "@modules/fileStorage/repositories/AWSS3Repository";
import { IFileStorageRepository } from "@modules/fileStorage/repositories/IFileStorageRepository";

import { AddressRepository } from "@modules/client/repositories/AddressRepository";
import { IAddressRepository } from "@modules/client/repositories/IAddressRepository";

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository
);

container.registerSingleton<IClientRepository>(
  "ClientRepository",
  ClientRepository
);

container.registerSingleton<IEnterpriseRepository>(
  "EnterpriseRepository",
  EnterpriseRepository
);

container.registerSingleton<IPromotionRepository>(
  "PromotionRepository",
  PromotionRepository
);

container.registerSingleton<IFreightRepository>(
  "FreightRepository",
  FreightRepository
);

container.registerSingleton<IFileStorageRepository>(
  "FileStorageRepository",
  AWSS3Repository
);

container.registerSingleton<IAddressRepository>(
  "AddressRepository",
  AddressRepository
);
