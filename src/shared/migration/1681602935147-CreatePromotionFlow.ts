import { WeekDay } from "@modules/promotion/enums/WeekDay";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatePromotionFlow1681602935147 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "promotion",
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
            name: "imageUrl",
            type: "varchar",
          },
          {
            name: "weekDay",
            type: "enum",
            isNullable: false,
            enum: [
              WeekDay.DOM,
              WeekDay.SEG,
              WeekDay.TER,
              WeekDay.QUA,
              WeekDay.QUI,
              WeekDay.SEX,
              WeekDay.SAB,
            ],
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
      "promotion",
      new TableForeignKey({
        name: "PromotionEnterpriseFK",
        columnNames: ["enterprise_id"],
        referencedTableName: "enterprise",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "promotion_product",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "product_id",
            type: "uuid",
          },
          {
            name: "promotion_id",
            type: "uuid",
          },
          {
            name: "value",
            type: "integer",
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
      "promotion_product",
      new TableForeignKey({
        name: "PromotionProductPromotionFK",
        columnNames: ["promotion_id"],
        referencedTableName: "promotion",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "promotion_product",
      new TableForeignKey({
        name: "PromotionProductProductFK",
        columnNames: ["product_id"],
        referencedTableName: "product",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const promotionProductTable = await queryRunner.getTable(
      "promotion_product"
    );
    const promotionProductPromotionForeignKey =
      promotionProductTable.foreignKeys.find(
        (fk) => fk.name === "PromotionProductPromotionFK"
      );
    const promotionProductProductForeignKey =
      promotionProductTable.foreignKeys.find(
        (fk) => fk.name === "PromotionProductProductFK"
      );

    await queryRunner.dropForeignKey(
      "promotion_product",
      promotionProductPromotionForeignKey
    );
    await queryRunner.dropForeignKey(
      "promotion_product",
      promotionProductProductForeignKey
    );

    const promotionTable = await queryRunner.getTable("promotion");
    const promotionEnterpriseForeignKey = promotionTable.foreignKeys.find(
      (fk) => fk.name === "PromotionEnterpriseFK"
    );

    await queryRunner.dropForeignKey(
      "promotion",
      promotionEnterpriseForeignKey
    );
    await queryRunner.dropTable("promotion");
  }
}
