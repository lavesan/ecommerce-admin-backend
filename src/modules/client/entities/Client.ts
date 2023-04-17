import { Order } from "@modules/order/entities/Order";
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { Address } from "./Address";

@Entity("client")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index("ClientEmailIdx")
  email: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column({ default: 0 })
  points: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Address, (address) => address.client, {
    cascade: ["insert", "update", "remove"],
  })
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}

export { Client };
