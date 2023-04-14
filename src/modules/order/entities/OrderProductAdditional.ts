import { ProductAdditional } from "@modules/product/entities/ProductAdditional";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { OrderProduct } from "./OrderProduct";

@Entity("product_order_additional")
class OrderProductAdditional {
  @PrimaryColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(
    () => ProductAdditional,
    (productAdditional) => productAdditional.orderProductAdditional
  )
  productAdditional: ProductAdditional;

  @ManyToOne(
    () => OrderProduct,
    (productOrder) => productOrder.OrderProductAdditionals
  )
  productOrder: OrderProduct;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { OrderProductAdditional };
