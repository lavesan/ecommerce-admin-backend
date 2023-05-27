import * as yup from "yup";

export const createUserValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdmin: yup.boolean().required(),
  enterpriseId: yup.string().uuid().notRequired(),
});
