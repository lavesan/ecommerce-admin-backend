import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDisabledColumnPromotion1682009995956
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "promotion",
      new TableColumn({
        name: "isDisabled",
        type: "boolean",
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("promotion", "isDisabled");
  }
}
