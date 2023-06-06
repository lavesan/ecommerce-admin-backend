import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRefreshFlow1685805643907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_auth_token",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "refreshToken",
            type: "varchar",
          },
          {
            name: "hasLoggedout",
            type: "boolean",
          },
          {
            name: "userId",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "clientId",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "expires_at",
            type: "timestamp",
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
        ],
        foreignKeys: [
          {
            name: "FKClientToken",
            referencedTableName: "client",
            referencedColumnNames: ["id"],
            columnNames: ["clientId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKUserToken",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["userId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("refresh_auth_token");
  }
}
