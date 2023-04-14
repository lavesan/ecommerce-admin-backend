import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Product } from "./Product";

@Entity("category")
class Category {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column({ default: false })
  isDisabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Category };
