import { OrderProductAdditional } from "@modules/order/entities/OrderProductAdditional";
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { ProductAdditionalCategory } from "./ProductAdditionalCategory";

@Entity("product_additionals")
class ProductAdditional {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  imageKey: string;

  @Column()
  value: number;

  @Column({ default: false })
  isDisabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(
    () => ProductAdditionalCategory,
    (category) => category.productAdditionals
  )
  productAdditionalCategory: ProductAdditionalCategory;

  @OneToMany(
    () => OrderProductAdditional,
    (productOrder) => productOrder.productAdditional
  )
  orderProductAdditional: OrderProductAdditional[];
}

export { ProductAdditional };
