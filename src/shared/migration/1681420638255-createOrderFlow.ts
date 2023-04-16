import { OrderStatus } from "@modules/order/enums/OrderStatus";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateOrderFlow1681420638255 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "freightValue",
            type: "integer",
          },
          {
            name: "productsValue",
            type: "integer",
          },
          {
            name: "status",
            type: "enum",
            enum: [
              OrderStatus.TO_APPROVE,
              OrderStatus.SENDING,
              OrderStatus.DOING,
              OrderStatus.DONE,
              OrderStatus.CANCELED,
              OrderStatus.DELETED,
            ],
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "product_order",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "quantity",
            type: "integer",
          },
          {
            name: "value",
            type: "integer",
          },
          {
            name: "points",
            type: "integer",
          },
          {
            name: "product_id",
            type: "uuid",
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
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "product_order_additional",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "quantity",
            type: "integer",
          },
          {
            name: "value",
            type: "integer",
          },
          {
            name: "product_additional_id",
            type: "uuid",
          },
          {
            name: "product_order_id",
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
      "product_order",
      new TableForeignKey({
        name: "ProductOrderProductFK",
        columnNames: ["product_id"],
        referencedTableName: "product",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "product_order",
      new TableForeignKey({
        name: "ProductOrderOrderFK",
        columnNames: ["order_id"],
        referencedTableName: "order",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "product_order_additional",
      new TableForeignKey({
        name: "ProductOrderAdditionalProductAdditionalFK",
        columnNames: ["product_additional_id"],
        referencedTableName: "product_additionals",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "product_order_additional",
      new TableForeignKey({
        name: "ProductOrderAdditionalProductOrderFK",
        columnNames: ["product_order_id"],
        referencedTableName: "product_order",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const product_order_additionalTable = await queryRunner.getTable(
      "product_order_additional"
    );
    const product_order_additionalAdditionalForeignKey =
      product_order_additionalTable.foreignKeys.find(
        (fk) => fk.name === "ProductOrderAdditionalProductAdditionalFK"
      );

    const product_order_additionalOrderForeignKey =
      product_order_additionalTable.foreignKeys.find(
        (fk) => fk.name === "ProductOrderAdditionalProductOrderFK"
      );

    await queryRunner.dropForeignKey(
      "product_order_additional",
      product_order_additionalAdditionalForeignKey
    );
    await queryRunner.dropForeignKey(
      "product_order_additional",
      product_order_additionalOrderForeignKey
    );

    const product_orderTable = await queryRunner.getTable("product_order");
    const product_orderProductForeignKey = product_orderTable.foreignKeys.find(
      (fk) => fk.name === "ProductOrderProductFK"
    );
    await queryRunner.dropForeignKey(
      "product_order",
      product_orderProductForeignKey
    );

    const product_orderOrderForeignKey = product_orderTable.foreignKeys.find(
      (fk) => (fk.name = "ProductOrderOrderFK")
    );
    await queryRunner.dropForeignKey(
      "product_order",
      product_orderOrderForeignKey
    );

    await Promise.all([
      queryRunner.dropTable("product_order_additional"),
      queryRunner.dropTable("product_order"),
      queryRunner.dropTable("order"),
    ]);
  }
}
