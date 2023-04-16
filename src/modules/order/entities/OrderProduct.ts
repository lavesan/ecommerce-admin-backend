import { Product } from "@modules/product/entities/Product";
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { OrderProductAdditional } from "./OrderProductAdditional";

@Entity("product_order")
class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @Column()
  points: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;

  @OneToMany(
    () => OrderProductAdditional,
    (productOrderAdditional) => productOrderAdditional.orderProduct,
    { cascade: true }
  )
  additionals: OrderProductAdditional[];
}

export { OrderProduct };
