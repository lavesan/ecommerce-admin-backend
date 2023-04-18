import { phoneReg } from "@helpers/validation.helper";
import * as yup from "yup";

export const createClientValidation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cpf: yup.string().required(),
  phone: yup.string().matches(phoneReg).required(),
});
