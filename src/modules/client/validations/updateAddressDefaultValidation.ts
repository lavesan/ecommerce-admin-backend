import * as yup from "yup";

export const updateAddressDefautValition = yup.object({
  clientId: yup.string().uuid().required(),
});
