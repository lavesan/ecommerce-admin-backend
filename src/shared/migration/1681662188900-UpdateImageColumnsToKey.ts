import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateImageColumnsToKey1681662188900
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.renameColumn("enterprise", "imageUrl", "imageKey"),
      queryRunner.renameColumn("category", "imageUrl", "imageKey"),
      queryRunner.renameColumn("product", "imageUrl", "imageKey"),
      queryRunner.renameColumn("product_additionals", "imageUrl", "imageKey"),
      queryRunner.renameColumn("promotion", "imageUrl", "imageKey"),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.renameColumn("enterprise", "imageKey", "imageUrl"),
      queryRunner.renameColumn("category", "imageKey", "imageUrl"),
      queryRunner.renameColumn("product", "imageKey", "imageUrl"),
      queryRunner.renameColumn("product_additionals", "imageKey", "imageUrl"),
      queryRunner.renameColumn("promotion", "imageKey", "imageUrl"),
    ]);
  }
}
