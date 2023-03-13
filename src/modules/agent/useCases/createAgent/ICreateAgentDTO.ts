import { HandleMode } from "@modules/agent/entities/Agent";

export interface ICreateAgentDTO {
  name: string;
  login: string;
  domain: string;
  password: string;
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
}
