import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddClientAndEnterprisePhone1681816808252
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.addColumn(
        "client",
        new TableColumn({
          name: "phone",
          type: "varchar",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "enterprise",
        new TableColumn({
          name: "phone",
          type: "varchar",
          isNullable: true,
        })
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropColumn("client", "phone"),
      queryRunner.dropColumn("enterprise", "phone"),
    ]);
  }
}
