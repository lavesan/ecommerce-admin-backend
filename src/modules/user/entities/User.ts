import { RefreshAuthToken } from "@modules/auth/entities/RefreshAuthToken";
import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
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

  @OneToMany(
    () => RefreshAuthToken,
    (refreshAuthToken) => refreshAuthToken.user
  )
  refreshAuths?: RefreshAuthToken[];
}

export { User };
