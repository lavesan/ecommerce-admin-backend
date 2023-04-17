import { ProductAdditional } from "@modules/product/entities/ProductAdditional";
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { OrderProduct } from "./OrderProduct";

@Entity("product_order_additional")
class OrderProductAdditional {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(
    () => ProductAdditional,
    (productAdditional) => productAdditional.orderProductAdditional
  )
  productAdditional: ProductAdditional;

  @ManyToOne(() => OrderProduct, (productOrder) => productOrder.additionals)
  orderProduct: OrderProduct;
}

export { OrderProductAdditional };
