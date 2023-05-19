import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Order } from "./Order";

@Entity("order_money_exchange")
class OrderMoneyExchange {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Order, (order) => order.moneyExchanges)
  order: Order;
}

export { OrderMoneyExchange };
