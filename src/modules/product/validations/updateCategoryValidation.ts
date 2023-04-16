import * as yup from "yup";

export const updateCategoryValidation = yup.object({
  name: yup.string().notRequired(),
  description: yup.string().notRequired(),
  imageKey: yup.string().notRequired(),
  isDisabled: yup.boolean().notRequired(),
});
