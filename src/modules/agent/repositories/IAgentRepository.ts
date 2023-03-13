import { Agent } from "../entities/Agent";
import { ICreateAgentDTO } from "../useCases/createAgent/ICreateAgentDTO";
import { IUpdateAgentDTO } from "../useCases/updateAgent/IUpdateAgentDTO";

export interface IAgentRepository {
  create: (data: ICreateAgentDTO) => Promise<Agent>;
  update: (agent_id: string, data: IUpdateAgentDTO) => Promise<Agent>;
  findById: (agent_id: string) => Promise<Agent | undefined>;
  findByLogin: (login: string) => Promise<Agent | undefined>;
  findAll: () => Promise<Agent[]>;
  delete: (agent_id: string) => Promise<string>;
  deleteByLogin: (login: string) => Promise<string>;
}
