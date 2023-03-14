export enum HandleMode {
  AUTO = "AUTO",
  MANUAL = "MANUAL",
}

interface IAgentData {
  id: string;
  name: string;
  login: string;
  domain: string;
  password: string;
  created_at: Date;
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

export interface IAgent extends IAgentData {
  toObject: () => IAgentData;
}
