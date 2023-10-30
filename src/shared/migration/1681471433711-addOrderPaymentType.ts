import { PaymentType } from "@modules/order/enums/PaymentType";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddOrderPaymentType1681471433711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
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
            PaymentType.CREDIT_CARD,
            PaymentType.DEBIT_CARD,
          ],
        })
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.dropColumn("order", "paymentType"),
    ]);
  }
}
