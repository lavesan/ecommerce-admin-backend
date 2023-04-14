import * as yup from "yup";

export const createCategoryValidations = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  imageUrl: yup.string().required(),
});
