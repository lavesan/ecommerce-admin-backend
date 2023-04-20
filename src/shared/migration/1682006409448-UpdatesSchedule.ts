import { ScheduleRelation } from "@modules/enterprise/enums/ScheduleRelation";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdatesSchedule1682006409448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropColumn("schedule", "relation"),
      queryRunner.addColumn(
        "schedule",
        new TableColumn({
          name: "to",
          type: "time without time zone",
          isNullable: true,
        })
      ),
      queryRunner.renameColumn("schedule", "time", "from"),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.addColumn(
        "schedule",
        new TableColumn({
          name: "relation",
          type: "enum",
          enum: [ScheduleRelation.FROM, ScheduleRelation.TO],
          isNullable: true,
        })
      ),
      queryRunner.dropColumn("schedule", "to"),
      queryRunner.renameColumn("schedule", "from", "time"),
    ]);
  }
}
