import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
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

  @OneToMany(() => Enterprise, (enterprise) => enterprise.user)
  enterprises: Enterprise[];
}

export { User };
