import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity("category")
class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isDisabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  products: Product[];

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.categories)
  enterprise: Enterprise;
}

export { Category };
