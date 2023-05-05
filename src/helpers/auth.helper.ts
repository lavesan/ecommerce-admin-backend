import jwt from "jsonwebtoken";

export const createToken = (user: any, secret: string) => {
  const accessToken = jwt.sign(user, secret);

  return accessToken;
};
