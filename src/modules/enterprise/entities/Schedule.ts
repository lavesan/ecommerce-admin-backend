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
import { ScheduleRelation } from "../enums/ScheduleRelation";
import { WeekDay } from "@modules/promotion/enums/WeekDay";
import { Enterprise } from "./Enterprise";

@Entity("schedule")
class Schedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  time: Date;

  @Column({
    type: "enum",
    enum: ScheduleRelation,
  })
  relation: ScheduleRelation;

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
