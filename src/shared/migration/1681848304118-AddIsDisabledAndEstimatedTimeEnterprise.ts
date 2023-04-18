import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddIsDisabledAndEstimatedTimeEnterprise1681848304118
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.addColumn(
        "enterprise",
        new TableColumn({
          name: "estimatedTime",
          type: "varchar",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "enterprise",
        new TableColumn({
          name: "isDisabled",
          type: "boolean",
          isNullable: true,
          default: false,
        })
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropColumn("enterprise", "estimatedTime"),
      queryRunner.dropColumn("enterprise", "isDisabled"),
    ]);
  }
}
