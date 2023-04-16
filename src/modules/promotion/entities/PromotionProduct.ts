import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import { Product } from "@modules/product/entities/Product";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from "typeorm";
import { Promotion } from "./Promotion";

@Entity("promotion_product")
class PromotionProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Product, (product) => product.promotionProduct)
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionProducts)
  promotion: Promotion;
}

export { PromotionProduct };
