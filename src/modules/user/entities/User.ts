import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity("user")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index("UserEmailIdx")
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Enterprise, (enterprise) => enterprise.user)
  enterprises: Enterprise[];
}

export { User };
