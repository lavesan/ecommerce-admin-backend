import { Enterprise } from "@modules/enterprise/entities/Enterprise";
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("user_enterprise")
export class UserEnterprise {
  @PrimaryColumn({ name: "user_id" })
  userId: number;

  @PrimaryColumn({ name: "enterprise_id" })
  enterpriseId: number;

  @ManyToOne(() => User, (user) => user.enterprises, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  users: User[];

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprises: Enterprise[];
}
