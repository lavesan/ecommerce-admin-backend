import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";
import { getStates } from "@brazilian-utils/brazilian-utils";

export class CreateClientAndAddClientRelations1681473564015
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "client",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "points",
            type: "integer",
            isNullable: false,
            default: 0,
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
        name: "address",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
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
            name: "shortName",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "client_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.addColumn(
      "order",
      new TableColumn({
        name: "address_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      "order",
      new TableColumn({
        name: "client_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "address",
      new TableForeignKey({
        name: "AddressClientFK",
        columnNames: ["client_id"],
        referencedTableName: "client",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        name: "OrderAddressFK",
        columnNames: ["address_id"],
        referencedTableName: "address",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        name: "OrderClientFK",
        columnNames: ["client_id"],
        referencedTableName: "client",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const addressTable = await queryRunner.getTable("address");
    const addressClientForeignKey = addressTable.foreignKeys.find(
      (fk) => fk.name === "AddressClientFK"
    );
    await queryRunner.dropForeignKey("address", addressClientForeignKey);

    const orderTable = await queryRunner.getTable("order");
    const orderAddressForeignKey = orderTable.foreignKeys.find(
      (fk) => fk.name === "OrderAddressFK"
    );
    await queryRunner.dropForeignKey("order", orderAddressForeignKey);

    const orderClientForeignKey = orderTable.foreignKeys.find(
      (fk) => fk.name === "OrderClientFK"
    );
    await queryRunner.dropForeignKey("order", orderClientForeignKey);

    await Promise.all([
      queryRunner.dropTable("address"),
      queryRunner.dropTable("client"),
    ]);
  }
}
