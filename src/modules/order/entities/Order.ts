import { Address } from "@modules/client/entities/Address";
import { Client } from "@modules/client/entities/Client";
import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import { Freight } from "@modules/freight/entities/Freight";
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { OrderStatus } from "../enums/OrderStatus";
import { PaymentType } from "../enums/PaymentType";
import { OrderProduct } from "./OrderProduct";
import { OrderMoneyExchange } from "./OrderMoneyExchange";

@Entity("order")
class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  freightValue: number;

  @Column()
  productsValue: number;

  @Column({
    type: "enum",
    enum: PaymentType,
  })
  paymentType: PaymentType;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.TO_APPROVE,
  })
  status: OrderStatus;

  @Column({ nullable: true })
  hasCents: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToMany(() => OrderProduct, (productOrder) => productOrder.order, {
    cascade: true,
  })
  orderProducts: OrderProduct[];

  @OneToOne(() => Address, (address) => address.order, {
    cascade: true,
  })
  @JoinColumn({ name: "address_id" })
  address: Address;

  @ManyToOne(() => Client, (client) => client.orders)
  client: Client;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.orders)
  enterprise: Enterprise;

  @ManyToOne(() => Freight, (freight) => freight.orders)
  freight: Freight;

  @OneToMany(() => OrderMoneyExchange, (moneyExchange) => moneyExchange.order, {
    cascade: true,
  })
  moneyExchanges: OrderMoneyExchange[];
}

export { Order };
