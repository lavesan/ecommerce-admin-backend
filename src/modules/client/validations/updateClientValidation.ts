import { phoneReg } from "@helpers/validation.helper";
import * as yup from "yup";

export const updateClientValidation = yup.object({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  cpf: yup.string().notRequired(),
  phone: yup.string().matches(phoneReg).notRequired(),
});
