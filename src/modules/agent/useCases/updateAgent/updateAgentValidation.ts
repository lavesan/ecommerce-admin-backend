import { HandleMode } from "@modules/agent/entities/IAgent";
import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().notRequired(),
  login: yup.string().notRequired(),
  password: yup.string().notRequired(),
  medias: yup.object({
    voice: yup.object({
      min: yup.number().notRequired(),
      max: yup.number().notRequired(),
      selected: yup.number().notRequired(),
      handleMode: yup
        .mixed()
        .notRequired()
        .oneOf([HandleMode.AUTO, HandleMode.MANUAL]),
      device: yup.string().notRequired(),
      devicePassword: yup.string().notRequired(),
    }),
    email: yup.object({
      min: yup.number().notRequired(),
      max: yup.number().notRequired(),
      selected: yup.number().notRequired(),
    }),
    chat: yup.object({
      min: yup.number().notRequired(),
      max: yup.number().notRequired(),
      selected: yup.number().notRequired(),
      handleMode: yup
        .mixed()
        .notRequired()
        .oneOf([HandleMode.AUTO, HandleMode.MANUAL]),
    }),
  }),
});
