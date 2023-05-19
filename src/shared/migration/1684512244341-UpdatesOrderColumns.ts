import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class UpdatesOrderColumns1684512244341 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.createTable(
        new Table({
          name: "order_money_exchange",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
            },
            {
              name: "value",
              type: "integer",
            },
            {
              name: "quantity",
              type: "integer",
            },
            {
              name: "order_id",
              type: "uuid",
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
          ],
        })
      ),
      queryRunner.dropColumn("order", "moneyExchange"),
      queryRunner.addColumn(
        "order",
        new TableColumn({
          name: "hasCents",
          type: "boolean",
          isNullable: true,
        })
      ),
    ]);

    await queryRunner.createForeignKey(
      "order_money_exchange",
      new TableForeignKey({
        name: "MoneyExchangeOrderFK",
        columnNames: ["order_id"],
        referencedTableName: "order",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const order_money_exchangeTable = await queryRunner.getTable(
      "order_money_exchange"
    );
    const order_money_exchangeForeignKey =
      order_money_exchangeTable.foreignKeys.find(
        (fk) => fk.name === "MoneyExchangeOrderFK"
      );
    await queryRunner.dropForeignKey(
      "order_money_exchange",
      order_money_exchangeForeignKey
    );

    await Promise.all([
      queryRunner.dropTable("order_money_exchange"),
      queryRunner.addColumn(
        "order",
        new TableColumn({
          name: "moneyExchange",
          type: "integer",
          isNullable: true,
        })
      ),
      queryRunner.dropColumn("order", "hasCents"),
    ]);
  }
}
