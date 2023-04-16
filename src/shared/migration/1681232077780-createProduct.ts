import { ProductAdditionalType } from "@modules/product/enums/ProductAdditionalType";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateProduct1681232077780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "category",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "icon",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "imageUrl",
            type: "varchar",
          },
          {
            name: "isDisabled",
            type: "boolean",
            default: false,
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
        name: "product_additionals_category",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "limit",
            type: "integer",
          },
          {
            name: "type",
            type: "enum",
            enum: [
              ProductAdditionalType.MORE_THAN_ONE_SELECT,
              ProductAdditionalType.ONE_SELECT,
            ],
          },
          {
            name: "isOptional",
            type: "boolean",
          },
          {
            name: "isDisabled",
            type: "boolean",
            default: false,
          },
          {
            name: "product_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "product_additionals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "imageUrl",
            type: "varchar",
          },
          {
            name: "value",
            type: "integer",
          },
          {
            name: "product_additionals_category_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "boldDescription",
            type: "varchar",
          },
          {
            name: "imageUrl",
            type: "varchar",
          },
          {
            name: "value",
            type: "integer",
          },
          {
            name: "givenPoints",
            type: "integer",
            comment: "points the product give when its bought",
          },
          {
            name: "sellPoints",
            type: "integer",
            comment: "points the product can be selled",
          },
          {
            name: "isDisabled",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "product_category_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "product_additionals_category",
      new TableForeignKey({
        name: "ProductAdditionalsCategoryProductFK",
        columnNames: ["product_id"],
        referencedTableName: "product",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "product_additionals",
      new TableForeignKey({
        name: "ProductAdditionalsProductAdditionalsCategoryFK",
        columnNames: ["product_additionals_category_id"],
        referencedTableName: "product_additionals_category",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "product",
      new TableForeignKey({
        name: "ProductCategoryFK",
        columnNames: ["product_category_id"],
        referencedTableName: "category",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const product_additionals_categoryTable = await queryRunner.getTable(
      "product_additionals_category"
    );
    const product_additionals_categoryForeignKey =
      product_additionals_categoryTable.foreignKeys.find(
        (fk) => fk.name === "ProductAdditionalsCategoryProductFK"
      );
    await queryRunner.dropForeignKey(
      "product_additionals_category",
      product_additionals_categoryForeignKey
    );

    const product_additionalsTable = await queryRunner.getTable(
      "product_additionals"
    );
    const product_additionalsForeignKey =
      product_additionalsTable.foreignKeys.find(
        (fk) => fk.name === "ProductAdditionalsProductAdditionalsCategoryFK"
      );
    await queryRunner.dropForeignKey(
      "product_additionals",
      product_additionalsForeignKey
    );

    const productTable = await queryRunner.getTable("product");
    const productCategoryForeignKey = productTable.foreignKeys.find(
      (fk) => fk.name === "ProductCategoryFK"
    );
    await queryRunner.dropForeignKey("product", productCategoryForeignKey);

    await queryRunner.dropTable("category");
    await queryRunner.dropTable("product");
    await queryRunner.dropTable("product_additionals_category");
    await queryRunner.dropTable("product_additionals");
  }
}
