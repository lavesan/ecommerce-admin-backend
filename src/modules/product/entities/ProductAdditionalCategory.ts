import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { ProductAdditionalType } from "../enums/ProductAdditionalType";

import { Product } from "./Product";
import { ProductAdditional } from "./ProductAdditional";

@Entity("product_additionals_category")
class ProductAdditionalCategory {
  @PrimaryColumn()
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
  imageUrl: string;

  @Column({ default: false })
  isDisabled: boolean;

  @Column()
  isOptional: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(
    () => ProductAdditional,
    (productAdditional) => productAdditional.productAdditionalCategory,
    { cascade: ["insert", "update"] }
  )
  productAdditionals: ProductAdditional[];

  @ManyToOne(() => Product, (product) => product.productAdditionalCategory)
  product: Product;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { ProductAdditionalCategory };
