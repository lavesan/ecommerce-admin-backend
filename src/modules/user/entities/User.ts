import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
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

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  // @OneToMany(() => Enterprise, (enterprise) => enterprise.user)
  // enterprises: Enterprise[];

  @ManyToMany(() => Enterprise, (enteprise) => enteprise.users)
  @JoinTable({
    name: "user_enterprise",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "enterprise_id",
      referencedColumnName: "id",
    },
  })
  enterprises: Enterprise[];
}

export { User };
