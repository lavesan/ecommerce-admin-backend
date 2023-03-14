import { hash, compare } from "bcryptjs";

export const encryptPwd = (pwd: string) => {
  return hash(pwd, 8);
};

export const comparePwd = (pwd: string, dbPwd: string) => {
  return compare(pwd, dbPwd);
};
