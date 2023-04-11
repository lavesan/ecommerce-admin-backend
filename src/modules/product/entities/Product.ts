import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Category } from "./Category";
import { ProductAdditionalCategory } from "./ProductAdditionalCategory";

@Entity("product")
class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  boldDescription: string;

  @Column()
  imageUrl: string;

  @Column()
  value: number;

  @Column()
  givenPoints: number;

  @Column()
  sellPoints: number;

  @Column()
  isDisabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => ProductAdditionalCategory, (category) => category.product)
  productAdditionalCategory: ProductAdditionalCategory[];

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Product };
