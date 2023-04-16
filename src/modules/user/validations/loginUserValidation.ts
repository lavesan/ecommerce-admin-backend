import * as yup from "yup";

export const loginUserValidation = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
