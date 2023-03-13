import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
} from "typeorm";

export enum HandleMode {
  AUTO = "AUTO",
  MANUAL = "MANUAL",
}

class Voice {
  @Column()
  min: number;

  @Column()
  max: number;

  @Column()
  selected: number;

  @Column({
    type: "enum",
    enum: HandleMode,
    default: HandleMode.AUTO,
  })
  handleMode: HandleMode;

  @Column()
  device: string;

  @Column()
  devicePassword: string;
}

class Email {
  @Column()
  min: number;

  @Column()
  max: number;

  @Column()
  selected: number;
}

class Chat {
  @Column()
  min: number;

  @Column()
  max: number;

  @Column()
  selected: number;

  @Column({
    type: "enum",
    enum: HandleMode,
    default: HandleMode.AUTO,
  })
  handleMode: HandleMode;
}

class Media {
  @Column((type) => Voice)
  voice: Voice;

  @Column((type) => Email)
  email: Email;

  @Column((type) => Chat)
  chat: Chat;
}

@Entity()
class Agent {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  domain: string;

  @Column((type) => Media)
  medias: Media;

  @CreateDateColumn()
  created_at: Date;
}

export { Agent };
export default Agent;
