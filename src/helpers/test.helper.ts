import { HandleMode } from "@modules/agent/entities/IAgent";

export const mockUser = {
  name: "nome mock",
  login: "login@algo.com",
  domain: "mock_domain",
  medias: {
    voice: {
      min: 0,
      max: 0,
      selected: 0,
      handleMode: HandleMode.AUTO,
      device: "string",
      devicePassword: "string",
    },
    email: {
      min: 0,
      max: 0,
      selected: 0,
    },
    chat: {
      min: 0,
      max: 0,
      selected: 0,
      handleMode: HandleMode.AUTO,
    },
  },
  password: "string",
};
