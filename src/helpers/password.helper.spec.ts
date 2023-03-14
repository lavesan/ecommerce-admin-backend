import { comparePwd, encryptPwd } from "./password.helper";

describe("helpers -> password", () => {
  it("should encrypt password", async () => {
    const password = "12345";

    const encryptedPwd = await encryptPwd(password);

    expect(encryptedPwd).not.toBe(password);
    expect(encryptedPwd.length).toBeGreaterThan(10);
  });

  it("should correctly compare encrypted password and password", async () => {
    const password = "12345";

    const encryptedPwd = await encryptPwd(password);

    const passwordIsValid = await comparePwd(password, encryptedPwd);

    expect(passwordIsValid).toBeTruthy();
  });

  it("should return false when the comparation is invalid", async () => {
    const password = "12345";

    const encryptedPwd = await encryptPwd(password);

    const passwordIsValid = await comparePwd("54321", encryptedPwd);

    expect(passwordIsValid).toBeFalsy();
  });
});
