import * as yup from "yup";
import { ProductAdditionalType } from "../enums/ProductAdditionalType";

export const createProductValidation = yup.object({
  categoryId: yup.string().uuid().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  boldDescription: yup.string().required(),
  imageKey: yup.string().required(),
  value: yup.number().required(),
  isDisabled: yup.boolean().required(),
  givenPoints: yup.number().required(),
  sellPoints: yup.number().required(),
  productAdditionalCategory: yup.array().of(
    yup
      .object({
        name: yup.string().required(),
        description: yup.string().required(),
        limit: yup.number().required(),
        type: yup
          .mixed()
          .oneOf([
            ProductAdditionalType.MORE_THAN_ONE_SELECT,
            ProductAdditionalType.ONE_SELECT,
          ])
          .required(),
        imageKey: yup.string().required(),
        isOptional: yup.boolean().required(),
        isDisabled: yup.boolean().required(),
        productAdditionals: yup.array().of(
          yup
            .object({
              name: yup.string().required(),
              imageKey: yup.string().required(),
              value: yup.number().required(),
              isDisabled: yup.boolean().required(),
            })
            .notRequired()
        ),
      })
      .notRequired()
  ),
});
