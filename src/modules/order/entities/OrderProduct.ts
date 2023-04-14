import { Product } from "@modules/product/entities/Product";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Order } from "./Order";
import { OrderProductAdditional } from "./OrderProductAdditional";

@Entity("product_order")
class OrderProduct {
  @PrimaryColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @Column()
  points: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Order, (order) => order.productsOrder)
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderProducts)
  products: Product[];

  @OneToMany(
    () => OrderProductAdditional,
    (productOrderAdditional) => productOrderAdditional.productOrder
  )
  OrderProductAdditionals: OrderProductAdditional[];

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { OrderProduct };
