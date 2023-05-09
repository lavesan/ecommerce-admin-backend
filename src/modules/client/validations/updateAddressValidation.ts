import * as yup from "yup";

export const updateAddressValidation = yup.object({
  cep: yup.string().notRequired(),
  street: yup.string().notRequired(),
  complement: yup.string().notRequired(),
  number: yup.string().notRequired(),
  district: yup.string().notRequired(),
  state: yup.string().notRequired(),
  city: yup.string().notRequired(),
  shortName: yup.string().notRequired(),
  isDefault: yup.boolean().notRequired(),
  clientId: yup.string().uuid().notRequired(),
});
