import { HandleMode } from "@modules/agent/entities/IAgent";

interface IUpdateAgentData {
  name?: string;
  login?: string;
  medias?: {
    voice?: {
      min?: number;
      max?: number;
      selected?: number;
      handleMode?: HandleMode;
      device?: string;
      devicePassword?: string;
    };
    email?: {
      min?: number;
      max?: number;
      selected?: number;
    };
    chat?: {
      min?: number;
      max?: number;
      selected?: number;
      handleMode?: HandleMode;
    };
  };
  password?: string;
}

export interface IUpdateAgentDTO extends IUpdateAgentData {}
