import { ScheduleRelation } from "@modules/enterprise/enums/ScheduleRelation";
import { WeekDay } from "@modules/promotion/enums/WeekDay";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateEnterpriseSchedule1681837326537
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "schedule",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "time",
            type: "time without time zone",
          },
          {
            name: "relation",
            type: "enum",
            enum: [ScheduleRelation.FROM, ScheduleRelation.TO],
          },
          {
            name: "weekDay",
            type: "enum",
            enum: [
              WeekDay.DOM,
              WeekDay.SEG,
              WeekDay.TER,
              WeekDay.QUA,
              WeekDay.QUI,
              WeekDay.SEX,
              WeekDay.SAB,
            ],
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "enterprise_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "schedule",
      new TableForeignKey({
        name: "ScheduleEnterpriseFK",
        columnNames: ["enterprise_id"],
        referencedTableName: "enterprise",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // const scheduleTable = await queryRunner.getTable("schedule");
    // const scheduleForeignKey = scheduleTable.foreignKeys.find(
    //   (fk) => fk.name === "ScheduleEnterpriseFK"
    // );
    // await queryRunner.dropForeignKey("schedule", scheduleForeignKey);

    await queryRunner.dropTable("schedule");
  }
}
