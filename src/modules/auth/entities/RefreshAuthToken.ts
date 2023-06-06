import { Client } from "@modules/client/entities/Client";
import { User } from "@modules/user/entities/User";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

@Entity("refresh_auth_token")
class RefreshAuthToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  refreshToken: string;

  @Column({ default: false })
  hasLoggedout: boolean;

  @Column()
  expires_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.refreshAuths)
  @JoinColumn({ name: "userId" })
  user?: User;

  @ManyToOne(() => Client, (client) => client.refreshAuths)
  @JoinColumn({ name: "clientId" })
  client?: Client;
}

export { RefreshAuthToken };
