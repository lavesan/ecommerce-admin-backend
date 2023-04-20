import { OrderProduct } from "@modules/order/entities/OrderProduct";
import { PromotionProduct } from "@modules/promotion/entities/PromotionProduct";
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

import { Category } from "./Category";
import { ProductAdditionalCategory } from "./ProductAdditionalCategory";

@Entity("product")
class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  boldDescription: string;

  @Column()
  imageKey: string;

  @Column()
  value: number;

  @Column()
  givenPoints: number;

  @Column()
  sellPoints: number;

  @Column({ default: false })
  isDisabled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => ProductAdditionalCategory, (category) => category.product, {
    cascade: true,
  })
  productAdditionalCategory: ProductAdditionalCategory[];

  @OneToMany(() => OrderProduct, (productOrder) => productOrder.product)
  orderProducts: OrderProduct[];

  @OneToMany(
    () => PromotionProduct,
    (promotionProduct) => promotionProduct.product
  )
  promotionProducts: PromotionProduct[];
}

export { Product };
