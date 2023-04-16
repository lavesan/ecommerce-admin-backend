import { PaymentType } from "@modules/order/enums/PaymentType";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddOrderPaymentType1681471433711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.addColumn(
        "order",
        new TableColumn({
          name: "moneyExchange",
          type: "integer",
          isNullable: true,
          comment: "When the client selects a MONEY payment type",
        })
      ),
      queryRunner.addColumn(
        "order",
        new TableColumn({
          name: "paymentType",
          type: "enum",
          isNullable: false,
          enum: [
            PaymentType.MONEY,
            PaymentType.CREDIT_CARD_MACHINE,
            PaymentType.DEBIT_CARD_MACHINE,
          ],
        })
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropColumn("order", "moneyExchange"),
      queryRunner.dropColumn("order", "paymentType"),
    ]);
  }
}
