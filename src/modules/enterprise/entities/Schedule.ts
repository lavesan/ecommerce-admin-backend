import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from "typeorm";
import { WeekDay } from "@modules/promotion/enums/WeekDay";
import { Enterprise } from "./Enterprise";

@Entity("schedule")
class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  from: Date;

  @Column({ nullable: true })
  to: Date;

  @Column({
    type: "enum",
    enum: WeekDay,
  })
  @Index("ScheduleWeekDayIdx")
  weekDay: WeekDay;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.schedules)
  enterprise?: Enterprise;
}

export { Schedule };
