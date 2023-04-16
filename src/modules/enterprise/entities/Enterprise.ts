import { Freight } from "@modules/freight/entities/Freight";
import { Order } from "@modules/order/entities/Order";
import { Category } from "@modules/product/entities/Category";
import { Promotion } from "@modules/promotion/entities/Promotion";
import { User } from "@modules/user/entities/User";
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";

@Entity("enterprise")
class Enterprise {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cnpj: string;

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
  imageUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Category, (category) => category.enterprise, {
    cascade: ["insert", "update", "remove"],
  })
  categories: Category[];

  @OneToMany(() => Order, (order) => order.enterprise, {
    cascade: ["insert", "update", "remove"],
  })
  orders: Order[];

  @OneToMany(() => Freight, (freight) => freight.enterprise)
  freights: Freight[];

  @OneToMany(() => Promotion, (promotion) => promotion.enterprise)
  promotions: Promotion[];

  @ManyToOne(() => User, (user) => user.enterprises)
  user: User;
}

export { Enterprise };
