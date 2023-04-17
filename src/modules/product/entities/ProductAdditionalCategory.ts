import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { ProductAdditionalType } from "../enums/ProductAdditionalType";

import { Product } from "./Product";
import { ProductAdditional } from "./ProductAdditional";

@Entity("product_additionals_category")
class ProductAdditionalCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  limit: number;

  @Column({
    type: "enum",
    enum: ProductAdditionalType,
    default: ProductAdditionalType.ONE_SELECT,
  })
  type: ProductAdditionalType;

  @Column()
  imageKey: string;

  @Column({ default: false })
  isDisabled: boolean;

  @Column()
  isOptional: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToMany(
    () => ProductAdditional,
    (productAdditional) => productAdditional.productAdditionalCategory,
    { cascade: ["insert", "update"] }
  )
  productAdditionals: ProductAdditional[];

  @ManyToOne(() => Product, (product) => product.productAdditionalCategory)
  product: Product;
}

export { ProductAdditionalCategory };
