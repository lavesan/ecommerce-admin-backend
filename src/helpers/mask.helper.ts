import { PaymentType } from "@modules/order/enums/PaymentType";

export const maskMoney = (money?: number): string => {
  if (typeof money !== "number") return "";

  return (money / 100).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export const translatePaymentType = {
  [PaymentType.CREDIT_CARD_MACHINE]: "Maquininha de cartão de crédito",
  [PaymentType.DEBIT_CARD_MACHINE]: "Maquininha de cartão de débito",
  [PaymentType.MONEY]: "Dinheiro",
};
