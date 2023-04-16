import { getStates } from "@brazilian-utils/brazilian-utils";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateEnterpriseFlow1681598352872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "enterprise",
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
            name: "email",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cnpj",
            type: "varchar",
          },
          {
            name: "cep",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "street",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "number",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "district",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "state",
            type: "enum",
            isNullable: false,
            enum: getStates().map(({ code }) => code),
          },
          {
            name: "city",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "imageUrl",
            type: "varchar",
          },
          {
            name: "user_id",
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
      "enterprise",
      new TableForeignKey({
        name: "EnterpriseUserFK",
        columnNames: ["user_id"],
        referencedTableName: "user",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.addColumn(
      "category",
      new TableColumn({
        name: "enterprise_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "category",
      new TableForeignKey({
        name: "CategoryEnterpriseFK",
        columnNames: ["enterprise_id"],
        referencedTableName: "enterprise",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.addColumn(
      "order",
      new TableColumn({
        name: "enterprise_id",
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        name: "OrderEnterpriseFK",
        columnNames: ["enterprise_id"],
        referencedTableName: "enterprise",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const enterpriseTable = await queryRunner.getTable("enterprise");
    const enterpriseUserForeignKey = enterpriseTable.foreignKeys.find(
      (fk) => fk.name === "EnterpriseUserFK"
    );

    await queryRunner.dropForeignKey("enterprise", enterpriseUserForeignKey);

    const categoryTable = await queryRunner.getTable("category");
    const categoryEnterpriseForeignKey = categoryTable.foreignKeys.find(
      (fk) => fk.name === "CategoryEnterpriseFK"
    );

    await queryRunner.dropForeignKey("category", categoryEnterpriseForeignKey);

    const orderTable = await queryRunner.getTable("order");
    const orderEnterpriseForeignKey = orderTable.foreignKeys.find(
      (fk) => fk.name === "OrderEnterpriseFK"
    );

    await queryRunner.dropForeignKey("order", orderEnterpriseForeignKey);

    await queryRunner.dropColumn("category", "enterprise_id");
    await queryRunner.dropTable("enterprise");
  }
}
