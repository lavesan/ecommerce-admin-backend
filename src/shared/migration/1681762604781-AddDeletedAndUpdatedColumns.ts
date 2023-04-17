import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAndUpdatedColumns1681762604781
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.addColumn(
        "order",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "order",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product_order",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product_order",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product_order_additional",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product_order_additional",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "client",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "client",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "address",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "address",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "enterprise",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "enterprise",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "freight",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "freight",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "category",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "category",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product_additionals",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product_additionals",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product_additionals_category",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "product_additionals_category",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "promotion",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "promotion",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "promotion_product",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "promotion_product",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "user",
        new TableColumn({
          name: "deleted_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
      queryRunner.addColumn(
        "user",
        new TableColumn({
          name: "updated_at",
          type: "timestamp",
          isNullable: true,
        })
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropColumn("order", "deleted_at"),
      queryRunner.dropColumn("order", "updated_at"),
      queryRunner.dropColumn("product_order", "deleted_at"),
      queryRunner.dropColumn("product_order", "updated_at"),
      queryRunner.dropColumn("product_order_additional", "deleted_at"),
      queryRunner.dropColumn("product_order_additional", "updated_at"),
      queryRunner.dropColumn("client", "deleted_at"),
      queryRunner.dropColumn("client", "updated_at"),
      queryRunner.dropColumn("address", "deleted_at"),
      queryRunner.dropColumn("address", "updated_at"),
      queryRunner.dropColumn("enterprise", "deleted_at"),
      queryRunner.dropColumn("enterprise", "updated_at"),
      queryRunner.dropColumn("freight", "deleted_at"),
      queryRunner.dropColumn("freight", "updated_at"),
      queryRunner.dropColumn("category", "deleted_at"),
      queryRunner.dropColumn("category", "updated_at"),
      queryRunner.dropColumn("product", "deleted_at"),
      queryRunner.dropColumn("product", "updated_at"),
      queryRunner.dropColumn("product_additionals", "deleted_at"),
      queryRunner.dropColumn("product_additionals", "updated_at"),
      queryRunner.dropColumn("product_additionals_category", "deleted_at"),
      queryRunner.dropColumn("product_additionals_category", "updated_at"),
      queryRunner.dropColumn("promotion", "deleted_at"),
      queryRunner.dropColumn("promotion", "updated_at"),
      queryRunner.dropColumn("promotion_product", "deleted_at"),
      queryRunner.dropColumn("promotion_product", "updated_at"),
      queryRunner.dropColumn("user", "deleted_at"),
      queryRunner.dropColumn("user", "updated_at"),
    ]);
  }
}
