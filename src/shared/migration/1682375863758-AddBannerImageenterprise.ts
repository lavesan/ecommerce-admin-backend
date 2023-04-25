import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddBannerImageenterprise1682375863758
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "enterprise",
      new TableColumn({
        name: "bannerKey",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("enterprise", "bannerKey");
  }
}
