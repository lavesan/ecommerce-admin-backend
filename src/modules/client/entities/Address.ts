import { Order } from "@modules/order/entities/Order";
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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

  @Column({ default: false })
  isDefault: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Client, (client) => client.addresses)
  client?: Client;

  @OneToOne(() => Order, (order) => order.address)
  order?: Order;
}

export { Address };
