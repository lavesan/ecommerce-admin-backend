import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPromotionDiscountValue1686407459052
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "order",
      new TableColumn({
        name: "promotionsDiscount",
        type: "integer",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("order", "promotionsDiscount");
  }
}
