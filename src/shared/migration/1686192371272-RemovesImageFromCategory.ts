import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class RemovesImageFromCategory1686192371272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('category', 'imageKey');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('category', new TableColumn({
        name: "imageKey",
        type: "timestamp",
      }));
    }

}
