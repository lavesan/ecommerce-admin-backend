import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { WeekDay } from "../enums/WeekDay";
import { PromotionProduct } from "./PromotionProduct";

@Entity("promotion")
class Promotion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isDisabled: boolean;

  @Column()
  imageKey: string;

  @Column({
    type: "enum",
    enum: WeekDay,
  })
  weekDay: WeekDay;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.promotions)
  enterprise: Enterprise;

  @OneToMany(
    () => PromotionProduct,
    (promotionProduct) => promotionProduct.promotion,
    { cascade: true }
  )
  promotionProducts: PromotionProduct[];
}

export { Promotion };
