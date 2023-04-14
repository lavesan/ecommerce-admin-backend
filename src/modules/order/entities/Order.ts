import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { OrderStatus } from "../enums/OrderStatus";
import { OrderProduct } from "./OrderProduct";

@Entity("order")
class Order {
  @PrimaryColumn()
  id: string;

  @Column()
  freightValue: number;

  @Column()
  productsValue: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.TO_APPROVE,
  })
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderProduct, (productOrder) => productOrder.order)
  productsOrder: OrderProduct[];

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Order };
