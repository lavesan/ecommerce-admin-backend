import * as yup from "yup";

export const createFreightValidation = yup.object({
  addressKey: yup.string().required(),
  addressValue: yup.string().required(),
  value: yup.number().required(),
  enterpriseId: yup.string().uuid().required(),
});
