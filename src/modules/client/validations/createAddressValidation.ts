import * as yup from "yup";

export const createAddressValidation = yup.object({
  cep: yup.string().required(),
  street: yup.string().required(),
  complement: yup.string().required(),
  number: yup.string().required(),
  district: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  shortName: yup.string().required(),
  isDefault: yup.boolean().required(),
  clientId: yup.string().uuid().required(),
});
