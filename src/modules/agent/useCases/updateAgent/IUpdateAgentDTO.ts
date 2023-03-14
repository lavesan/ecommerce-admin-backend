import { HandleMode } from "@modules/agent/entities/IAgent";

export interface IUpdateAgentDTO {
  name: string;
  login: string;
  medias: {
    voice: {
      min: number;
      max: number;
      selected: number;
      handleMode: HandleMode;
      device: string;
      devicePassword: string;
    };
    email: {
      min: number;
      max: number;
      selected: number;
    };
    chat: {
      min: number;
      max: number;
      selected: number;
      handleMode: HandleMode;
    };
  };
  password: string;
}
