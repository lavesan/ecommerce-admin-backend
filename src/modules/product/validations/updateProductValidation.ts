import * as yup from "yup";
import { ProductAdditionalType } from "../enums/ProductAdditionalType";

export const updateProductValidation = yup.object({
  categoryId: yup.string().uuid().notRequired(),
  name: yup.string().notRequired(),
  description: yup.string().notRequired(),
  boldDescription: yup.string().notRequired(),
  imageKey: yup.string().notRequired(),
  isDisabled: yup.boolean().notRequired(),
  value: yup.number().notRequired(),
  givenPoints: yup.number().notRequired(),
  sellPoints: yup.number().notRequired(),
  productAdditionalCategory: yup.array().of(
    yup
      .object({
        id: yup.string().uuid().notRequired(),
        name: yup.string().notRequired(),
        description: yup.string().notRequired(),
        limit: yup.number().notRequired(),
        type: yup
          .mixed()
          .oneOf([
            ProductAdditionalType.MORE_THAN_ONE_SELECT,
            ProductAdditionalType.ONE_SELECT,
          ])
          .notRequired(),
        isOptional: yup.boolean().notRequired(),
        isDisabled: yup.boolean().notRequired(),
        productAdditionals: yup.array().of(
          yup
            .object({
              id: yup.string().uuid().notRequired(),
              name: yup.string().notRequired(),
              imageKey: yup.string().notRequired(),
              value: yup.number().notRequired(),
              isDisabled: yup.boolean().notRequired(),
            })
            .notRequired()
        ),
      })
      .notRequired()
  ),
});
