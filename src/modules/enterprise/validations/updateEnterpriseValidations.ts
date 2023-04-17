import * as yup from "yup";

export const updateEnterpriseValidation = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  description: yup.string().notRequired(),
  cnpj: yup.string().notRequired(),
  cep: yup.string().notRequired(),
  street: yup.string().notRequired(),
  complement: yup.string().notRequired(),
  number: yup.string().notRequired(),
  district: yup.string().notRequired(),
  state: yup.string().notRequired(),
  city: yup.string().notRequired(),
  imageKey: yup.string().notRequired(),
  userId: yup.string().uuid().notRequired(),
  freights: yup
    .array()
    .of(
      yup
        .object({
          id: yup.string().uuid().notRequired(),
          addressKey: yup.string().required(),
          addressValue: yup.string().required(),
          value: yup.number().required(),
        })
        .notRequired()
    )
    .notRequired(),
});
