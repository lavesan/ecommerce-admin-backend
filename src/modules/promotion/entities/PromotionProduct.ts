import { Product } from "@modules/product/entities/Product";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @OneToOne(() => Product, (product) => product.promotionProduct)
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionProducts)
  promotion: Promotion;
}

export { PromotionProduct };
