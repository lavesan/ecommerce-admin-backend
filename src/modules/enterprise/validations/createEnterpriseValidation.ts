import * as yup from "yup";

export const createEnterpriseValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  description: yup.string().required(),
  cnpj: yup.string().required(),
  cep: yup.string().required(),
  street: yup.string().required(),
  complement: yup.string().notRequired(),
  number: yup.string().required(),
  district: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  imageUrl: yup.string().required(),
  userId: yup.string().required(),
});
