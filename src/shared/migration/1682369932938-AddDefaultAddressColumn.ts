import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDefaultAddressColumn1682369932938
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "address",
      new TableColumn({
        name: "isDefault",
        type: "boolean",
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("address", "isDefault");
  }
}
