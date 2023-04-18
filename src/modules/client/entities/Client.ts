import { Order } from "@modules/order/entities/Order";
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
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

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 0 })
  points: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToMany(() => Address, (address) => address.client, {
    cascade: true,
  })
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}

export { Client };
