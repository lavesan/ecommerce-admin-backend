import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import { Order } from "@modules/order/entities/Order";
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";

@Entity("freight")
class Freight {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  addressKey: string;

  @Column()
  addressValue: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.freights)
  enterprise: Enterprise;

  @OneToMany(() => Order, (order) => order.freight)
  orders: Order[];
}

export { Freight };
