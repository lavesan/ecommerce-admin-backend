import { HandleMode } from "@modules/agent/entities/IAgent";
import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  login: yup.string().required().email(),
  password: yup.string().required(),
  medias: yup.object({
    voice: yup.object({
      min: yup.number().required(),
      max: yup.number().required(),
      selected: yup.number().required(),
      handleMode: yup.mixed().oneOf([HandleMode.AUTO, HandleMode.MANUAL]),
      device: yup.string().required(),
      devicePassword: yup.string().required(),
    }),
    email: yup.object({
      min: yup.number().required(),
      max: yup.number().required(),
      selected: yup.number().required(),
    }),
    chat: yup.object({
      min: yup.number().required(),
      max: yup.number().required(),
      selected: yup.number().required(),
      handleMode: yup.mixed().oneOf([HandleMode.AUTO, HandleMode.MANUAL]),
    }),
  }),
});
