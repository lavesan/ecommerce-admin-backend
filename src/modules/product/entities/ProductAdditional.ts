import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";
import { ProductAdditionalCategory } from "./ProductAdditionalCategory";

@Entity("product_additionals")
class ProductAdditional {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  value: number;

  @Column()
  isDisabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(
    () => ProductAdditionalCategory,
    (category) => category.productAdditional
  )
  productAdditionalCategory: ProductAdditionalCategory;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { ProductAdditional };
