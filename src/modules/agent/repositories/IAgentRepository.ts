import { Agent } from "../entities/Agent";
import { IAgent } from "../entities/IAgent";
import { ICreateAgentDTO } from "../useCases/createAgent/ICreateAgentDTO";
import { IUpdateAgentDTO } from "../useCases/updateAgent/IUpdateAgentDTO";

export interface IAgentRepository {
  create: (data: ICreateAgentDTO) => Promise<IAgent>;
  update: (agent_id: string, data: IUpdateAgentDTO) => Promise<IAgent>;
  findById: (agent_id: string) => Promise<IAgent | undefined>;
  findByLogin: (login: string) => Promise<IAgent | undefined>;
  findAll: () => Promise<IAgent[]>;
  delete: (agent_id: string) => Promise<string>;
  deleteByLogin: (login: string) => Promise<string>;
}
