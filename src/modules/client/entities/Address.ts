import { Order } from "@modules/order/entities/Order";
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";

@Entity("address")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  shortName: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Client, (client) => client.addresses)
  client?: Client;

  @OneToOne(() => Order, (order) => order.address, { cascade: ["insert"] })
  order?: Order;
}

export { Address };
