import * as yup from "yup";

export const updateUserValidation = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  isAdmin: yup.boolean().notRequired(),
});
