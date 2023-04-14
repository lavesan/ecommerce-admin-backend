import { OrderProductAdditional } from "@modules/order/entities/OrderProductAdditional";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { ProductAdditionalCategory } from "./ProductAdditionalCategory";

@Entity("product_additionals")
class ProductAdditional {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  value: number;

  @Column({ default: false })
  isDisabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(
    () => ProductAdditionalCategory,
    (category) => category.productAdditionals
  )
  productAdditionalCategory: ProductAdditionalCategory;

  @OneToOne(
    () => OrderProductAdditional,
    (productOrder) => productOrder.productAdditional
  )
  orderProductAdditional: OrderProductAdditional;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { ProductAdditional };
