import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateFreightFlow1681600793908 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "freight",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "addressKey",
            type: "varchar",
            comment: "Key of the address column",
          },
          {
            name: "addressValue",
            type: "varchar",
            comment: "Value of the address column",
          },
          {
            name: "value",
            type: "integer",
            comment: "Value of freight",
          },
          {
            name: "enterprise_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "freight",
      new TableForeignKey({
        name: "FreightEnterpriseFK",
        columnNames: ["enterprise_id"],
        referencedTableName: "enterprise",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.addColumn(
      "order",
      new TableColumn({
        name: "freight_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        name: "OrderFreightFK",
        columnNames: ["freight_id"],
        referencedTableName: "freight",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const freightTable = await queryRunner.getTable("freight");
    const freightEnterpriseForeignKey = freightTable.foreignKeys.find(
      (fk) => fk.name === "FreightEnterpriseFK"
    );

    await queryRunner.dropForeignKey("freight", freightEnterpriseForeignKey);

    const orderTable = await queryRunner.getTable("order");
    const orderFreightForeignKey = orderTable.foreignKeys.find(
      (fk) => fk.name === "OrderFreightFK"
    );

    await queryRunner.dropForeignKey("order", orderFreightForeignKey);
    await queryRunner.dropColumn("order", "freight_id");
    await queryRunner.dropTable("freight");
  }
}
