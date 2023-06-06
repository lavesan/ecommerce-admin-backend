export default {
  clientSecretToken: process.env.CLIENT_JWT_SECRET,
  clientRefreshTokenKey: process.env.CLIENT_JWT_REFRESH_TOKEN_KEY,
  userAdminSecretToken: process.env.JWT_SECRET,
  userAdminRefreshTokenKey: process.env.JWT_REFRESH_TOKEN_KEY,
  expiresInAccessToken: "7d",
  expiresInRefreshToken: "30d",
};
